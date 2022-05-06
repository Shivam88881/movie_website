import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favroite extends Component {
constructor(){
  super();
  this.state={
    generes:[],
    currgen:'All Generes'
  }
}

  render() {
    let movie=movies.results
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

    let temparr=[];
    movie.forEach((movieobj)=>{
    if(!temparr.includes(genreids[movieobj.genre_ids[0]]))
      temparr.push(genreids[movieobj.genre_ids[0]])
    })
    temparr.unshift('All Generes')
    return (
      <div>
        <>
          <div style={{display:'flex',justifyContent:'center'}}>
            <h2>Your Favriotes</h2>
          </div>
          <div className='main'>
            <div className='row'>
              <div className='col-3 favroite-genre-list'>
              <ul className="list-group">
                {
                  temparr.map((genere)=>(
                    this.state.currgen==genere ? <li className="list-group-item" style={{background:'blue',color:'white',fontWeight:'bold'}}>{genere}</li> :<li className="list-group-item" style={{color:'blue'}}>{genere}</li>
                  ))
                }
            </ul>
              </div>
{/* Genere list ends here. or First column ends here */}

              <div className='col-9 favroite-table'>
                <div className='row'>
                <input type="text" className='form-control col' style={{margin:'0.5rem'}} placeholder="search"></input>
                <input type="number" className='form-control col' style={{margin:'0.5rem'}} placeholder="row count"></input>
                </div>
{/* input row ends here. */}
{/* favriote table start here. */}
                <div className='favroite-table'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Rating</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        movie.map((movieobj)=>(
                          <tr>
                            <td> <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.original_title} style={{width:'5rem'}} /> {movieobj.original_title}</td> 
                            <td>{genreids[movieobj.genre_ids[0]]}</td>
                            <td>{movieobj.popularity}</td> 
                            <td>{movieobj.vote_average}</td> 
                            <td><button type="button" class="btn btn-danger">Delete</button></td>
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
            <div style={{display:'flex',justifyContent:'center'}}>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a class="page-link" href="#">Previous</a></li>
                  <li className="page-item"><a class="page-link" href="#">1</a></li>
                  <li className="page-item"><a class="page-link" href="#">2</a></li>
                  <li className="page-item"><a class="page-link" href="#">3</a></li>
                  <li clasNames="page-item"><a class="page-link" href="#">Next</a></li>
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
