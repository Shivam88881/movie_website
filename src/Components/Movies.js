import React, { Component } from 'react'
import axios from 'axios'

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
        hover:'',
        pages:[1],
        currPage:1,
        movies:[],
        favourites:[]
    }
}
  async componentDidMount(){
    //Side effects 
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data = res.data
    this.setState({
        movies:[...data.results]
    })
    this.handleFavouritesState();
}
changeMovies=async()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
    let data = res.data
    this.setState({
        movies:[...data.results]
    })
}
handleNext=()=>{
    let temparr =[]
    for(let i=1;i<=this.state.currPage+1;i++){
        temparr.push(i);
    }
    this.setState({
        pages:[...temparr],
        currPage:this.state.currPage+1
    },this.changeMovies)
}
handlePrev=()=>{
    if(this.state.currPage!=1){
        this.setState({
            currPage:this.state.currPage-1
        },this.changeMovies)
    }
}
handlePageClick=(value)=>{
    if(value!=this.state.currPage){
        this.setState({
            currPage:value
        },this.changeMovies)
    }
}
handleFavourites=(movieobj)=>{
  let old_data=JSON.parse(localStorage.getItem("movies") || "[]")
  if(this.state.favourites.includes(movieobj.id)){
    old_data=old_data.filter((obj)=>obj.id!=movieobj.id)
  }
  else{
    old_data.push(movieobj)
  }
  // console.log(old_data)
  localStorage.setItem("movies",JSON.stringify(old_data))
  this.handleFavouritesState();
}

handleFavouritesState=()=>{
  let old_data=JSON.parse(localStorage.getItem("movies") || "[]")
  let temparr=old_data.map((movieobj)=>(
    movieobj.id
  ))
  this.setState({
    favourites:[...temparr]
  })
}

 handleMouseHover=(movieobj)=>{
   this.setState({
     hover:movieobj.id
   })
 }
 handleMouseLeave=()=>{
  this.setState({
    hover:''
  })
 }
  render() {
    return (
      < >
      <div>
      {
        this.state.movies.length==0 ? <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div> :
      <div>
        <div style={{background:'#deb368',height:'2.8rem',color:'#610b25'}}><h2 className='text-center'> Trendings</h2></div>
        <div className='movies-list' >
          {
            this.state.movies.map((movieobj)=>(
              <div className="card movie-card"  onMouseEnter={()=>this.handleMouseHover(movieobj)} onMouseLeave={this.handleMouseLeave}>
               <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`}   alt={movieobj.title} className="card-img-top movie-img"/>
               <h5 className="card-title movie-title">{movieobj.original_title}</h5>
               <div className='button-wrapper' style={{display:'flex',width:'100%',justifyContent:'center'}}>
                 {
                   this.state.hover==movieobj.id && <>
                   {this.state.favourites.includes(movieobj.id)?<button type="button" class="btn btn-danger movie-button" onClick={()=>this.handleFavourites(movieobj)}>Remove From favourite</button>:<a class="btn btn-primary movie-button" onClick={()=>this.handleFavourites(movieobj)}>Add to Favourite</a> }
                   </>
                 }
               
                 </div>
              </div>
            ))
          }
        </div>
        <div style={{display:'flex',justifyContent:'center'}}> 
           <nav aria-label="Page navigation example">
              <ul class="pagination" style={{cursor:'pointer'}}>
              <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
              {
                this.state.pages.map((value)=>(
                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageClick(value)}>{value}</a></li>
                ))
              }
              <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
              </ul>
            </nav> 
                        </div>
        </div>
      }
      </div>
      </>
    )
  }
}
