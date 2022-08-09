/* <a href="#" className="btn btn-primary banner-btn"><span className="card-span">Watch Now</span></a> */
import { movies } from "./Getmovies";
import React, { Component } from 'react'
import axios from 'axios';

import { interval } from "d3";
export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            banner:[],
            intervalkiid:null,
            currpage:1
        }
    }
    
    
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f43ec88334e8002b2f15a7eb15756537&language=en-US&page=${this.state.currpage}`)
        //    console.log(res);
        let bannerarr = res.data.results;
        console.log(bannerarr)
        console.log("mount");
        this.setState({
            banner: [...res.data.results]
           })
           
          
           console.log("aagya") 
          
          let intervalid;
          let imgdiv;
            let titlediv;
            let textdiv;
          setTimeout(()=>{
                imgdiv= document.querySelector(".banner-image")
                titlediv= document.querySelector(".banner-card-title");
                textdiv= document.querySelector(".banner-card-text");
              },1000)
               
                           
                    
            intervalid =  setInterval(()=>{
                let idx=Math.floor(Math.random() * bannerarr.length) ;
                  
                 imgdiv.src = `https://image.tmdb.org/t/p/original${bannerarr[idx].backdrop_path}`            
                titlediv.innerHTML = bannerarr[idx].title
                textdiv.innerHTML = bannerarr[idx].overview  
            
            },3000)
           
                 this.setState({
                    intervalkiid:intervalid
                 })
  
    }
    componentWillUnmount(){
        clearInterval(this.state.intervalkiid)
        console.log("interval cleared")
    }
  
   
    render() {
        console.log("render");      
        let idx=Math.floor(Math.random() * 20) ;
        let movie = movies.results[idx];
      
        return (
            <>
                {

                    this.state.banner[0] == undefined ? <div><div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div></div> :
                        <>
                            <div className="card movie-card">
                                
                                <img src={`https://image.tmdb.org/t/p/original${this.state.banner[idx].backdrop_path}`} className="card-img-top banner-image" alt="..."/>
                                    <div className="card-body body-card">
                                        <h2 style={{color:"white"}} className="card-title banner-card-title">{this.state.banner[idx].original_title}</h2>
                                        <p style={{color:"white"}} className="card-text banner-card-text">{this.state.banner[idx].overview}</p>
                                        
                                    </div>
                                    <div className=" trending">Trending</div>
                            </div>

                        </>
                }

            </>
        )
    }
}


//........................
/* <a href="#" className="btn btn-primary banner-btn"><span className="card-span">Watch Now</span></a> */
// import { movies } from "./Getmovies";
// import React, { Component } from 'react'
// import axios from 'axios';
// import { interval } from "d3";
// export default class Banner extends Component {
//     constructor(){
//         super();
//         this.state={
//             banner:[]
//         }
//     }
    
    
//     async componentDidMount(){
//         const res = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=f43ec88334e8002b2f15a7eb15756537")
//         //    console.log(res);
//         let bannerarr = res.data.results;
//         console.log(bannerarr)
//         console.log("mount");
//         this.setState({
//             banner: [...res.data.results]
//            })
           
          
//            console.log("aagya") 
          
//           let intervalid;
//           let div;    
//           setTimeout(()=>{
//                 div= document.querySelector(".banner-image")
//               },1000)
              
//             intervalid =  setInterval(()=>{
//                 let idx=Math.floor(Math.random() * bannerarr.length) ;
//                  console.log(bannerarr[idx])  
//                 div.src = `https://image.tmdb.org/t/p/original${bannerarr[idx].backdrop_path}`            
//               },3000)
           
//              this.componentWillUnmount(clearInterval(intervalid))     
  
//     }
   
//     render() {
//         console.log("render");      
//         let idx=Math.floor(Math.random() * 20) ;
//         let movie = movies.results[idx];
      
//         return (
//             <>
//                 {

//                     this.state.banner[0] == undefined ? <div><div className="spinner-border text-primary" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div></div> :
//                         <>
//                             <div className="card movie-card">
                                
//                                 <img src={`https://image.tmdb.org/t/p/original${this.state.banner[idx].backdrop_path}`} className="card-img-top banner-image" alt="..."/>
//                                     <div className="card-body body-card">
//                                         <h2 style={{color:"white"}} className="card-title">{this.state.banner[idx].original_title}</h2>
//                                         <p style={{color:"white"}} className="card-text">{this.state.banner[idx].overview}</p>
                                        
//                                     </div>
//                             </div>

//                         </>
//                 }

//             </>
//         )
//     }
// }
