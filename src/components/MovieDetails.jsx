// MovieDetails is in charge of fetching the information on OMDB about the current
// selected movie, and display it in a Card

import { Component } from 'react'
import { Card } from 'react-bootstrap'

// 1) this.state.movie gets initialized with null
// 2) first render() invokation: it will output just the <h2> because thisstate.movie is null
// 3) componentDidMount() happens: fetches the details and sets the state with them
// 4) because of our setState in componentDidMount, render() fires again! (render fires again every time there's a change in the state or in the props)
// 5) this time the check on this.state.movie will return true, and so the entire Card gets rendered
// 6) unfortunately, because our fetch operation is happening just in componentDidMount, and componentDidMount executes JUST ONCE,
// selecting a new movie from the dropdown will NOT invoke the fetch again!
// 7) but this component is ALWAYS receiving the value from the dropdown, that's located in this.props.movieTitle
// 8) we should find a way for listening for UPDATES in this component, something like a prop change
// 9) for achieving this we can use another lifecycle method: componentDidUpdate
// 10) I can invoke getMovieDetails() also from componentDidUpdate, but because this lifecycle method
// gets triggered on every props or state change, I'll enter an infinite loop because getMovieDetails() sets the state after the fetch :(
// 11) so let's use the 2 arguments componentDidUpdate provides to the developer, prevProps and prevState
// to track down the condition you want your component to listen to in order to repeat the fetch operation
// in our case: a change in the movieTitle prop!

class MovieDetails extends Component {
  //   constructor(props) {
  //     super(props) // <-- super() invokes the Component constructor method
  //     // constructor is the FIRST EVER lifecycle method invoked!
  //     // constructor is a lifecycle method used in the early react days
  //     // it mainly had 2 purposes:
  //     // 1) initializing the state
  //     this.state = {
  //       // put your properties and your initial values here
  //     }
  //     // 2) binding the 'this' keyword to event listeners
  //     this.handleClick = this.handleClick.bind(this)
  //     // this was necessary when you defined an event listener function
  //     // without the 'arrow' syntax
  //   }

  state = {
    movie: null,
  }

  componentDidMount = () => {
    // componentDidMount is a LIFECYCLE METHOD
    // you can write it just in Class Components
    // it is guaranteed to be executed JUST ONCE, immediately after
    // the initial invocation of render()
    // this is the perfect place for a fetch() or any initial expensive operation
    console.log('you should see this after the render console log')
    // the next step will be to fetch the details of Iron Man (the first value of this.props.movieTitle)
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle
      )
      console.log(response)
      // now I need to extract the body out of my response object
      const data = await response.json()
      console.log('THIS IS THE RESPONSE BODY', data)
      let movieDetails = data.Search[0]
      console.log(movieDetails) // <-- the actual movie details object
      // we're going to set the state with our fetched movie details
      this.setState({
        movie: movieDetails,
      })
    } catch (error) {
      console.log(error)
    }
  }

  //   handleClick = function () {
  //     console.log(this) // <-- this is undefined
  //     // because handleClick is NOT an arrow function!
  //   }

  componentDidUpdate = (prevProps, prevState) => {
    // this is another lifecycle method
    // it will be automatically invoked by the component.
    // when? whenever a new prop comes in or whenever the STATE changes
    // this.getMovieDetails() // <-- still infinite loop
    // remember: our goal is to re-trigger the fetch when the movieTitle props changes!
    // and NOT re-trigger the fetch when we set the state
    // the two arguments allow us to PINPOINT the condition for re-executing the fetch!
    // tldr: every componentDidUpdate usage MUST come with a condition
    if (prevProps.movieTitle !== this.props.movieTitle) {
      this.getMovieDetails()
    }
    // without a condition --> 99% infinite loop :(
  }

  render() {
    console.log('render console log')
    // render() fires again every time there's a change in the PROPS or in the STATE

    // this.getMovieDetails() <-- this look like a great idea, but setting the state will invoke render() again!
    // and so we hopelessly enter an infinite loop :(

    return (
      <div>
        <h2>MOVIE DETAILS WILL GO HERE!</h2>
        {this.state.movie && (
          <Card className="text-dark">
            <Card.Img variant="top" src={this.state.movie.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movie.Title}</Card.Title>
              <Card.Text>
                {this.state.movie.Type} - {this.state.movie.Year}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    )
  }
}

export default MovieDetails
