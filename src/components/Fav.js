import { Component } from "react";
import { movies } from "./Getmovies";
// import { movies } from "./Getmovies";
class Fav extends Component {
    constructor() {
        super();
        this.state = {
            generes: [],
            currgeneres: "Catagories",
            movies: [],
            movies2:[],
            currText:"",
            genreidobj : { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science_Fiction", 10770: "TV_Movie", 53: "Thriller", 10752: "War", 37: "Western" }
        }
    }
    componentDidMount() {
        let genreidobj = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science_Fiction", 10770: "TV_Movie", 53: "Thriller", 10752: "War", 37: "Western" }
        let favdata = JSON.parse(localStorage.getItem("moviesapp") || '[]');
        let temparr = [];
        temparr.push("Catagories");
        favdata.map((favobj) => {
            if (!temparr.includes(genreidobj[favobj.genre_ids[0]])) {
                temparr.push(genreidobj[favobj.genre_ids[0]]);
            }
        })
        this.setState({
            generes: [...temparr],
            movies: [...favdata],
            movies2:[...favdata]
        })
    }
  handleCurrText=(e)=>{
      let currtextval=e.target.value;
      this.setState({
        currText:currtextval
      },this.handleSearch)
  }
  handleSearch=()=>{
    
    console.log("hello search")
    console.log(this.state.currText)
    if(this.currText!==""){
        
        let filterarr=this.state.movies2.filter((movieobj)=>{
            let title=movieobj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase());
        })
        this.setState({
                    movies:[...filterarr]
        })
    }else{
        this.setState({
            movies:[...this.state.movies2]
        })
    }
  }
  handleCategory=(genere)=>{
    if(genere==="Catagories"){
        this.setState({
            movies:[...this.state.movies2],
            currgeneres:genere
        })
        return;
    }
    let genreidobj = { 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science_Fiction", 10770: "TV_Movie", 53: "Thriller", 10752: "War", 37: "Western" }
    let filtergenere=[];
    filtergenere=this.state.movies2.filter((movieobj)=>{
          return genreidobj[movieobj.genre_ids[0]]===genere; 
    })    
    this.setState({
            currgeneres:genere,
            movies:[...filtergenere]
        })
        
  }
  updateGenere = ()=>{
    console.log(this.state.movies)
    let filtergenere=[]
    
      this.state.movies.map((obj)=>{
           if(!filtergenere.includes(this.state.genreidobj[obj.genre_ids[0]])){
                 filtergenere.push(this.state.genreidobj[obj.genre_ids[0]])
           }
         })

         this.setState({
            generes: ["Catagories",...filtergenere]
         })
         console.log(this.state.generes)
         
  }
  handleDelete=(movieobj)=>{
     let filterdelete=[];
     filterdelete=this.state.movies2.filter((obj)=>{
        return obj!=movieobj
     })
     localStorage.setItem("moviesapp",JSON.stringify(filterdelete));
     let temp=this.state.movies.filter((movie)=>{
        return movie!=movieobj;
  })
     this.setState({
        movies2:[...filterdelete],
        movies:[...temp]
     },this.updateGenere)
     
     
    
    //  console.log(this.state.movies2)
  }


    render() {
        //     let moviesarr=movies.results;
        //     let genreidobj={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science_Fiction",10770:"TV_Movie",53:"Thriller",10752:"War",37:"Western"}
        //     let temparr=[];

        //    moviesarr.map((movieobj)=>{
        //       if(!temparr.includes(genreidobj[movieobj.genre_ids[0]])){
        //            temparr.push(genreidobj[movieobj.genre_ids[0]])
        //       }
        //    })

        return (
            <>
                <div className="container" style={{"marginTop":"7vmax"}}>
                    <div class="row">
                        <div className="col">
                            <ul class="list-group">
                                
                                {this.state.generes.map((genere) => (
                                    genere===this.state.currgeneres?(<li className="list-group-item active generelist">{genere}</li>):

                                    (<li onClick={()=>this.handleCategory(genere)} className="list-group-item generelist">{genere}</li>)
                                ))}


                            </ul>
                        </div>
                        <div className="col-9">
                            <div className="input-group mb-3 searchbar">
                                <input onChange={this.handleCurrText} type="text" className="form-control" placeholder="Search" />
                                
                                {/* <input type="text" className="form-control" placeholder="8" /> */}
                            </div>
                            <table className="table toble">
                                <thead >
                                    <tr >
                                        < th scope="col" >Title</th>
                                        <th scope="col">Genres</th>
                                        <th scope="col">Popularity</th>
                                        <th scope="col">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.movies.map((movieobj) => (
                                        <tr>
                                            <th className="favmovie" scope="row">{movieobj.title}
                                                <img style={{ width: "80px", height: "40px" }} src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} className="card-img-top smallcard" alt="..." />
                                            </th>
                                            <td>{this.state.genreidobj[movieobj.genre_ids[0]]}</td>
                                            <td>{movieobj.popularity}</td>
                                            <td>{movieobj.vote_average}</td>
                                            <td className="imptd"><button type="button" onClick={()=>this.handleDelete(movieobj)} class="btn btn-danger delete">Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default Fav