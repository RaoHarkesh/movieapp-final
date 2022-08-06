
import { Component } from "react";
// import { movies } from "./Getmovies";
import axios from 'axios'
import { movies } from "./Getmovies";
class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            movies: [],
            parr: [1],
            currpage: 1,
            favouritesId:[],
            
            
        }
    }
    async componentDidMount() {
        
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f43ec88334e8002b2f15a7eb15756537&language=en-US&page=${this.state.currpage}`);
        // console.log(res);
        this.setState({
            movies: [...res.data.results]

        })
       
        let movies = JSON.parse(localStorage.getItem("moviesapp") || '[]');
        let temp = movies.map((movie)=>{
            return movie.id;
        })
        this.setState({
            favouritesId:[...temp]
        })
      
       
    }
    
    handleNext = () => {
       
        
        this.state.currpage == this.state.parr.length ?
             this.setState({
                currpage: this.state.currpage + 1,
                parr: [...this.state.parr, this.state.currpage + 1]
            }, this.changeMovies):
              
            
            this.setState({
                currpage: this.state.currpage + 1,


            }, this.changeMovies)
            
                

    }
   
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f43ec88334e8002b2f15a7eb15756537&language=en-US&page=${this.state.currpage}`);
        // console.log(res);
        this.setState({
            movies: [...res.data.results]

        })
        
    }
    handlePrevious = () => {
        this.state.currpage != 1 && this.setState({
            currpage: this.state.currpage - 1,


        }, this.changeMovies)
    }
    handlePageClick = (pagenumber) => {
        pagenumber != this.state.currpage &&
            this.setState({
                currpage: pagenumber
            }, this.changeMovies)
    }
    handleFavourites=(movieobj)=>{
       
        let olddata=JSON.parse(localStorage.getItem("moviesapp") || '[]')
       if(this.state.favouritesId.includes(movieobj.id)){
        let newdata=olddata.filter((movie)=>movie.id!=movieobj.id);
        console.log("remove hua");
        
        localStorage.setItem("moviesapp",JSON.stringify(newdata));
    }
       else{
        olddata.push(movieobj);
        console.log("add hua");
        
        localStorage.setItem("moviesapp",JSON.stringify(olddata));

       }
       
       this.handleFavouriteId();
       
    }
  
    handleFavouriteId = ()=>{
        let oldData = JSON.parse(localStorage.getItem('moviesapp')|| '[]')
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favouritesId:[...temp]
        })
        console.log(temp)
        console.log(this.state.favouritesId)
    }

    // handleFavouriteId=()=>{
    //     let olddata=JSON.parse(localStorage.getItem("moviesapp") || '[]');
    
    //     let temp=olddata.map((movie)=>{
    //         return movie.id;
    //     });
        
    //     this.setState({
    //         favouritesId:[...temp]
    //     })
    //     console.log("temp")
    //     console.log(temp)
    //     console.log("fav")
    //     console.log(this.state.favouritesId)
    // }

    render() {
        //console.log(this.state.movies[0])
        // let moviesarr = movies.results;
        // console.log(this.state.favouritesId);
        return (
            <>
                <div className=" trending"><strong>Trending</strong></div>
                <div className="movielist">
                    {this.state.movies.map((movieele) => (

                        <div  onMouseLeave={() => this.setState({ hover: "" })} onMouseEnter={() => this.setState({ hover: movieele.id })} className="card allmoviecards">
                            <img src={`https://image.tmdb.org/t/p/original${movieele.backdrop_path}`} className="card-img-top smallcard" alt="..." />
                            <div className="card-body titlediv">

                                <span className="card-title movie-title">{movieele.title}</span>


                            </div>
                            {this.state.hover == movieele.id && (
                                <button onClick={()=>this.handleFavourites(movieele)} className="btn btn-primary fav-btn">
                                 {this.state.favouritesId.includes(movieele.id)?"Remove":"Add to Fav"}
                                    </button>
                            )}

                        </div>


                    ))}
                </div>
                
                <div className="my-page">
                    <button onClick={this.handlePrevious} className="mybutton">Backward</button>
                    <span className="curr-page">{this.state.currpage}</span>
                    <button onClick={this.handleNext} className="mybutton">Forward</button>
                </div>
            </>
        )
    }
}
export default Movies