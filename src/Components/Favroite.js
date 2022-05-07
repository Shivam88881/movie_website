import React, { Component } from 'react'

export default class Favroite extends Component {
constructor(){
  super();
  this.state={
    generes:[],
    currgen:'All Generes',
    movies:[],
    currtxt:'',
    limit:5,
    currPage:1
  }
}

componentDidMount(){
  let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
  let old_data=JSON.parse(localStorage.getItem("movies") || "[]")
  let temparr=[]
  old_data.forEach((movieObj)=>{
    if(!temparr.includes(genreids[movieObj.genre_ids[0]])){
        temparr.push(genreids[movieObj.genre_ids[0]]);
    }
 })
  temparr.unshift("All Generes")
  this.setState({
    movies:[...old_data],
    generes:[...temparr]
  })
}


handleGenere=((genere)=>{
  this.setState({
    currgen:genere
  })
})


handlePageChange=((page)=>{
  this.setState({
    currPage:page
  })
})
handleDelete=((id)=>{
  let newarr=[];
  newarr=this.state.movies.filter((obj)=>obj.id!=id)
  this.setState({
    movies:[...newarr]
  })
  localStorage.setItem("movies",JSON.stringify(this.state.movies))
})

RatingSortDesc=()=>{
  let temp=this.state.movies
  temp.sort((objA,objB)=>{
    return objB.vote_average-objA.vote_average
})
this.setState({
  movies:[...temp]
})
}
RatingSortAsc=()=>{
  let temp=this.state.movies
  temp.sort((objA,objB)=>{
    return objA.vote_average-objB.vote_average
})
this.setState({
  movies:[...temp]
})
}

PopularitySortDesc=()=>{
  let temp=this.state.movies
  temp.sort((objA,objB)=>{
    return objB.popularity-objA.popularity
})
this.setState({
  movies:[...temp]
})
}

PopularitySortAsc=()=>{
  let temp=this.state.movies
  temp.sort((objA,objB)=>{
    return objA.popularity-objB.popularity
})
this.setState({
  movies:[...temp]
})
}

  
    render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let filterarr=[];
    if(this.state.currtxt===''){
      filterarr=this.state.movies
  }else{
      filterarr=this.state.movies.filter((movieObj)=>{
          let title = movieObj.original_title.toLowerCase();
          return title.includes(this.state.currtxt.toLowerCase())
      })
  }
    if(this.state.currgen!="All Generes"){
      filterarr = this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen) 
    }

    let pageno=0
    
    if(this.state.limit>0){
      pageno=Math.ceil(this.state.movies.length/this.state.limit)
    }else{
      pageno=Math.ceil(this.state.movies.length/5)
    }
    let pages=[]
    for(let i=1;i<=pageno;i++){
      pages.push(i)
    }
    let Start_Idx = (this.state.currPage-1)*this.state.limit;
    let End_Idx = Start_Idx+this.state.limit;
    filterarr = filterarr.slice(Start_Idx,End_Idx);
    
    return (
      <div>
        <>
          <div className='main'>
            <div className='row' style={{marginTop:'1rem'}}>
              <div className='col-3 favroite-genre-list'>
              <ul className="list-group">
                {
                  this.state.generes.map((genere)=>(
                    this.state.currgen==genere ? <li className="list-group-item" style={{background:'blue',color:'white',fontWeight:'bold'}}>{genere}</li> :<li className="list-group-item" style={{color:'blue'}} onClick={()=>this.handleGenere(genere)}>{genere}</li>
                  ))
                }
            </ul>
              </div>
{/* Genere list ends here. or First column ends here */}

              <div className='col-9 favroite-table'>
                <div className='row'>
                <input type="text" className='form-control col' style={{margin:'0.5rem'}} placeholder="search" value={this.state.currtxt} onChange={(e)=>this.setState({currtxt:e.target.value})}></input>
                <input type="number" className='form-control col' style={{margin:'0.5rem'}} placeholder="row count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                </div>
{/* input row ends here. */}
{/* favriote table start here. */}
                <div className='favroite-table'>
                  <table className="table table-primary">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.PopularitySortDesc}/>popularity<i class="fa-solid fa-sort-down"onClick={this.PopularitySortAsc}/></th>
                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.RatingSortDesc}/>Rating<i class="fa-solid fa-sort-down" onClick={this.RatingSortAsc}/></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filterarr.map((movieobj)=>(
                          <tr>
                            <td> <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.original_title} style={{width:'5rem'}} /> {movieobj.original_title}</td> 
                            <td>{genreids[movieobj.genre_ids[0]]}</td>
                            <td>{movieobj.popularity}</td> 
                            <td>{movieobj.vote_average}</td> 
                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieobj.id)}>Delete</button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
{/* Fabroite Table ends here. */}

                </div>

              </div>
{/* Second column ends here. */}

            </div>
{/* Pagination starts here. */}
            <div style={{display:'flex',justifyContent:'center',background:'#422c47'}}>
              <nav aria-label="Page navigation example">
                <ul className="pagination" >
                  {
                    pages.map((page)=>(
                      <li className="page-item"><a class="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                    ))
                  }
                </ul>
              </nav>
            </div>
{/* Pagination ends here. */}

          </div>
        </>
      </div>
     
    )
  }
  

}

