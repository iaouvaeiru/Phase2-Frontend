import React, { Component } from 'react'
import {Switch, Link, Route} from 'react-router-dom'
import YouTube from 'react-youtube'
import ReviewForm from './ReviewForm'
import { Button, Image, Grid, Segment } from 'semantic-ui-react'


export default class GameDetail extends Component {
    state={
        likes: this.props.game.likes,
        dislikes: this.props.game.dislikes,
        showForm: false,
        reviews: this.props.game.reviews,
        showReviewButton: true
    }
    handleLikes = ()=>{
        let likes = this.state.likes
        let newLikes = likes += 1         
        this.setState({
            likes: newLikes
        })
        fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                likes: newLikes
            }),
            })
            .then((r) => r.json())
    }

    handleDislikes = ()=>{
        console.log('dislike button pressed')
        let dislikes = this.state.dislikes
        let newDislikes = dislikes += 1         

        // this.setState({
        //     dislikes: newDislikes
        // })
        fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dislikes: newDislikes
            }),
            })
            .then((r) => r.json())
            .then(newObj =>{
                this.setState(newObj)
            })
    }
    showForm = ()=>{
        this.setState({
            showForm : !this.state.showForm,
            showReviewButton: !this.state.showReviewButton
        })
    }


    addReview = (newReview)=>{
        const newArr = [...this.state.reviews, newReview]
        this.setState({
            reviews: newArr
        })
    }

    showReviews = ()=>{
        return this.state.reviews.map(review =>{
            return <div>
                <p>
                    {review.review}
                    <br></br>
                    - {review.name}

                </p>
                <br></br>
                
            </div>
        })
    }



    showAll = () =>{
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
      


        return <>
        {/* <h1>{this.props.game.name}</h1> */}
        <Grid>
            <Grid.Column width={2}> 
            {/* just to have a margin */}
                <Switch>
                    <Route path={`/games/${this.props.game.id}`} >
                        <Link to='/games' className='links'>Back</Link>
                    </Route>
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <br></br>
            <h1>{this.props.game.name}</h1>
            <Image src={this.props.game.image} size='large'/>
            </Grid.Column>
            <Grid.Column width={4}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <br></br>
                <br></br>
                <p>{this.props.game.about}</p>
            </Grid.Column>
            <Grid.Column width={1}> 
            {/* just to have a margin */}
            </Grid.Column>
            <Grid.Column width={5}>
                <br></br>
                <br></br>
                <br></br>
                <h2>price: {this.props.game.price !== 0 ? `$${this.props.game.price}`: 'Free'}</h2>
                <h3>Year: {this.props.game.year} </h3>
                <p>Genres: {this.props.game.genres.join(" | ")}</p>
                <Button.Group>
                    <Button color="green" onClick={this.handleLikes}>
                        Like {this.state.likes}
                    </Button>

                    <Button color="red" onClick={this.handleDislikes}>
                        Dislike {this.state.dislikes}
                    </Button>
                </Button.Group>
            </Grid.Column>
        </Grid>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>



        <Grid>
            <Grid.Column width={5}>
            </Grid.Column>
            <Grid.Column width={8}>
                <YouTube videoId={this.props.game.trailer} opts={opts} onReady={this._onReady} />
                <h3>Reviews: </h3>
                <p>{this.showReviews()}</p>
                {this.state.showReviewButton? <Button onClick={this.showForm}>Add a Review </Button>: null}
                {this.state.showForm ? <ReviewForm game={this.props.game} addReview={this.addReview} showForm={this.showForm} /> : null}
            </Grid.Column>
            <Grid.Column width={3}>
            </Grid.Column>
        </Grid>





        </>
    }
    render() {
        return (
            <div>
                {this.showAll()}
            </div>
        )
    }
}