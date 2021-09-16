import React, { Component } from 'react'
import {Switch, Link, Route} from 'react-router-dom'
import YouTube from 'react-youtube'
import ReviewForm from './ReviewForm'
import { Button, Image, Grid, Icon, Progress } from 'semantic-ui-react'
import logo from '../watervaporlogo.png'


export default class GameDetail extends Component {

    API_KEY=''

    state={
        likes: this.props.game.likes,
        dislikes: this.props.game.dislikes,
        showForm: false,
        reviews: this.props.game.reviews,
        showReviewButton: true
    }


    // componentDidMount(){
    //     this.setState({
    //         likes: this.props.likes,
    //         dislikes: this.props.dislikes
    //     })
    // }
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

    deleteReview = (reviewToDelete)=>{
        let newArr = this.state.reviews.filter(review=>{
            return (!(review.review === reviewToDelete.review) && !(review.name === reviewToDelete.name))
        })
    fetch(`http://localhost:4000/games/${this.props.game.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reviews: newArr
            }),
            })
            .then((r) => r.json())
            .then(newObj =>{
                this.setState(newObj)
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
                <Button onClick={()=>this.deleteReview(review)} animated='vertical' basic>
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                        <Icon name="trash"/>
                    </Button.Content>
                </Button>
                <br></br>
                <br></br>
            </div>
        })
    }

    // componentDidMount(){
    //     fetch(`http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=440&count=3&maxlength=300&format=json?key=${this.API_KEY}`)
    //         .then(res=>res.json())
    //         .then(obj=> console.log(obj))
    // }

    showAll = () =>{
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
          };
      


        return <>
        {/* <h1>{this.props.game.name}</h1> */}
        <Grid>
            <Grid.Column width={2}> 
            {/* just to have a margin */}
                <Switch>
                    <Route path={`/games/${this.props.game.id}`} >
                        <Link to='/games' className='links'>
                            <br></br>
                            
                            <Image src={logo} alt='WV logo' className='smallLogo'/>
                            <p className='backText'>Back</p>
                        </Link>
                    </Route>
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <br></br>
            <h1>{this.props.game.name}</h1>
            <Image src={this.props.game.image} size='large'/>
            </Grid.Column>
            <Grid.Column width={5}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                

                
                <br></br>
                <p>{this.props.game.about}</p>
            </Grid.Column>
            {/* <Grid.Column width={1}> 
            just to have a margin
            </Grid.Column> */}
            <Grid.Column width={5}>
                <br></br>
                <br></br>
                <br></br>
                <h2>price: {this.props.game.price !== 0 ? `$${this.props.game.price}`: 'Free'}</h2>
                <h3>Year: {this.props.game.year} </h3>
                <p>Genres: {this.props.game.genres.join(" | ")}</p> 
                <Progress percent={Math.round((this.state.likes/(this.state.likes + this.state.dislikes)) * 100)} progress color='green' size='small' className='likesBar'/>
                <Button.Group>
                    <Button color="green" onClick={this.handleLikes}>
                        Like: {this.state.likes}
                    </Button>

                    <Button color="red" onClick={this.handleDislikes}>
                        Dislike: {this.state.dislikes} 
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
            <Grid.Column width={4}>

            </Grid.Column>
            <Grid.Column width={7}>
                <YouTube videoId={this.props.game.trailer} opts={opts} onReady={this._onReady} />
                <h3>Reviews: </h3>
                <p>{this.showReviews()}</p>
                {this.state.showReviewButton? <Button onClick={this.showForm}>Add a Review </Button>: null}
                {this.state.showForm ? <ReviewForm game={this.props.game} addReview={this.addReview} showForm={this.showForm} /> : null}
            </Grid.Column>
            <Grid.Column width={4}>
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
