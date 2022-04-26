// MovieDetails is in charge of fetching the information on OMDB about the current
// selected movie, and display it in a Card

import { Component } from 'react'

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

  componentDidMount = () => {
    // componentDidMount is a LIFECYCLE METHOD
    // you can write it just in Class Components
    // it is guaranteed to be executed JUST ONCE, immediately after
    // the initial invocation of render()
    // this is the perfect place for a fetch() or any initial expensive operation
    console.log('you should see this after the render console log')
    // the next step will be to fetch the details of Iron Man (the first value of this.props.movieTitle)
  }

  //   handleClick = function () {
  //     console.log(this) // <-- this is undefined
  //     // because handleClick is NOT an arrow function!
  //   }

  render() {
    console.log('render console log')
    return (
      <div>
        <h2>MOVIE DETAILS WILL GO HERE!</h2>
      </div>
    )
  }
}

export default MovieDetails
