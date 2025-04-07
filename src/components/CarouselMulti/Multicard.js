import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Multi.css';
import {useNavigate} from 'react-router-dom';



function Multicard() {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const handleMovieClick=(title)=>{
    navigate(`/movies/${title}`);
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    fetch('/movies2.json')
      .then(response => response.json())
      .then(data => setMovies(data.movies))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="carousel-container">
      <h1 className="slider-title">Recommended</h1>
      <Carousel className='cardbo' responsive={responsive}>
        {movies.map((movie) => (
          <div className="carousel-item" key={movie.id} onClick={() => handleMovieClick(movie.title)}>
            <img src={movie.image_url} alt={movie.title} />
            
            <div className="button-group">
              <button className="rating-button">
                ⭐Rating: {movie.rating}
              </button>
              <button className="votes-button">
                {movie.votes} Votes
              </button>
            </div>
            <div className="type">
              <h4>{movie.title}</h4>
              <p>{movie.type}</p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Second Carousel container */}
      <h1 className="slider-title">Upcoming</h1>
      <Carousel className='cardbo' responsive={responsive}>
        {movies.map((movie) => (
          <div className="carousel-item" key={movie.id} onClick={()=>handleMovieClick(movie.id)}>
            <img src={movie.image_url} alt={movie.title} />
            
            <div className="button-group">
              <button className="rating-button">
              ⭐Rating: {movie.rating}
              </button>
              <button className="votes-button">
                {movie.votes} Votes
              </button>
            </div>
            <div className="type">
              <h4>{movie.title}</h4>
              <p>{movie.type}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Multicard;









// import React, { useState, useEffect } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import "./Multi.css";
// import { useNavigate } from "react-router-dom";

// function Multicard() {
//   const [movies, setMovies] = useState([]);
//   const navigate = useNavigate();
//   const defaulttype = "Epic";

//   // Default image if no image is available
//   const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToFmU_x7OhtW5woxA7SQ75vCwsCaLQyZvpUZylEsxWbc5jB4wyyn2tEtfb6xgnkAxGIsU&usqp=CAU";


//   const handleMovieClick = (id) => {
//     navigate(`/movies/${id}`);
//   };

//   const responsive = {
//     superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/home/getshows") // Change URL if needed
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched Movies:", data); // Debugging log
//         setMovies(data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="carousel-container">
//       <h1 className="slider-title">Recommended</h1>
//       <Carousel className="cardbo" responsive={responsive}>
//         {movies.map((movie) => (
//           <div
//             className="carousel-item"
//             key={movie.show_id}
//             onClick={() => handleMovieClick(movie.show_id)}
//           >
//             <img
//               src={movie.image_url || defaultImage}
//               alt={movie.movie_name}
//             />
//             <div className="button-group">
//               <button className="rating-button">⭐ Rating: {movie.rating || "N/A"}</button>
//               <button className="votes-button">{movie.votes || 0} Votes</button>
//             </div>
//             <div className="type">
//               <h4>{movie.movie_name}</h4>
//               <p>{movie.Movie_Type || defaulttype}</p>
//             </div>
//           </div>
//         ))}
//       </Carousel>

//       {/* Second Carousel Container */}
//       <h1 className="slider-title">Upcoming</h1>
//       <Carousel className="cardbo" responsive={responsive}>
//         {movies.map((movie) => (
//           <div
//             className="carousel-item"
//             key={movie.show_id}
//             onClick={() => handleMovieClick(movie.show_id)}
//           >
//             <img
//               src={movie.image_url || defaultImage}
//               alt={movie.movie_name}
//             />
//             <div className="button-group">
//               <button className="rating-button">⭐ Rating: {movie.rating || "N/A"}</button>
//               <button className="votes-button">{movie.votes || 0} Votes</button>
//             </div>
//             <div className="type">
//               <h4>{movie.movie_name}</h4>
//               <p>{movie.Movie_Type || defaulttype }</p>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// export default Multicard;

