import React, { Component } from 'react'
import axios from 'axios';
export default class Banner extends Component {

  constructor(){
    super();
    this.state={
        movie:''
    }
}

  async componentDidMount(){
    //Side effects 
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=1`);
    let data = res.data
    // console.log(data)
    this.setState({
      movie:data.results[0]
    })
    // console.log("movies data")
    // console.log(this.state.movies)
}
    
  render() {
    
      
    //   let movie=''
    // console.log(this.state.movie)
    return (
      <>
      {
        // console.log(this.state.movies.results[0])
        
           this.state.movie==''? <div class="spinner-border text-primary" role="status">
           <span className="visually-hidden">Loading...</span>
           </div>: 
           <div className="card banner-card">
               <img src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`}   alt={this.state.movie.title} className="card-img-top banner-img"/>
               <div className="card-body">
               <h5 className="card-title banner-title">{this.state.movie.original_title}</h5>
               <p className="card-text banner-card-text">{this.state.movie.overview}</p>
           </div>
           </div>
      }
      </>
    )
  }
}
