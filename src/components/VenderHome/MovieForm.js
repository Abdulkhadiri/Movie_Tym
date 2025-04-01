// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import './Movie.css';

// const MovieForm = () => {
//   const [formData, setFormData] = useState({
//     movieName: '',
//     releaseDate: '',
//     time: '',
//     movieImage: '',
//     ticketPrice: '',
//     language: '',
//     city: '',
//     area: '',
//     theatre: '',
//     screenNumber: ''
//   });

//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [availableTheatres, setAvailableTheatres] = useState([]);
//   const [availableScreens, setAvailableScreens] = useState([]);
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const username = sessionStorage.getItem("user") || 'alice_smith';
//   const token = sessionStorage.getItem("token") || ""; 

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/Vendors/fetch_City`, {
//       params: { username },
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => setCities(response.data))
//     .catch(error => console.error('Error fetching cities:', error));
//   }, [username, token]);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_API_URL}/Vendors/getMovies`, {
//       params: { username },
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => setMovies(response.data.movies || []))
//     .catch(error => console.error('Error fetching movies:', error));
//   }, [username, token]);

//   const fetchLocations = (selectedCity) => {
//     axios.get(`${process.env.REACT_APP_API_URL}/Vendors/getAreas`, {
//       params: { owner_id: username, city: selectedCity },
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => setAreas(response.data || []))
//     .catch(error => console.error('Error fetching areas:', error));
//   };

//   const fetchTheatres = (selectedCity, selectedArea) => {
//     axios.get(`${process.env.REACT_APP_API_URL}/Vendors/getTheatres`, {
//       params: { city: selectedCity, username, location: selectedArea },
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => setAvailableTheatres(response.data || []))
//     .catch(error => console.error('Error fetching theatres:', error));
//   };

//   const fetchScreens = (selectedTheatre) => {
//     console.log(selectedTheatre);
//     axios.get(`${process.env.REACT_APP_API_URL}/Vendors/getScreens`, {
//       params: { theatre: selectedTheatre },
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(response => {
//       const numberOfScreens = Number(response.data);
//       const screensArray = Array.from({ length: numberOfScreens }, (_, i) => i + 1);
//       setAvailableScreens(screensArray);
//     })
//     .catch(error => console.error('Error fetching screens:', error));
//   };

//   const handleCityChange = (city) => {
//     setFormData(prev => ({
//       ...prev,
//       city,
//       area: '',
//       theatre: '',
//       screenNumber: ''
//     }));
//     setAreas([]);
//     setAvailableTheatres([]);
//     setAvailableScreens([]);
//     if (city) fetchLocations(city);
//   };

//   const handleAreaChange = (area) => {
//     setFormData(prev => ({
//       ...prev,
//       area,
//       theatre: '',
//       screenNumber: ''
//     }));
//     setAvailableTheatres([]);
//     setAvailableScreens([]);
//     if (formData.city && area) fetchTheatres(formData.city, area);
//   };

//   const handleTheatreChange = (theatre) => {
//     setFormData(prev => ({
//       ...prev,
//       theatre,
//       screenNumber: ''
//     }));
//     setAvailableScreens([]);
//     if (theatre) fetchScreens(theatre);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     switch (name) {
//       case 'city':
//         handleCityChange(value);
//         break;
//       case 'area':
//         handleAreaChange(value);
//         break;
//       case 'theatre':
//         handleTheatreChange(value);
//         break;
//       case 'movieName':
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (Array.isArray(movies)) {
//           setFilteredMovies(
//             movies.filter(movie =>
//               movie?.title?.toLowerCase().includes(value.toLowerCase())
//             )
//           );
//         }
//         break;
//       default:
//         setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };
  
//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     const uploadData = new FormData();
//     uploadData.append("file", file);
//     uploadData.append("upload_preset", "MOVIE_TYM");

//     try {
//         const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, {
//             method: "POST",
//             body: uploadData,
//         });
//         const data = await response.json();
//         if(data.secure_url){
//             setImage(data.secure_url);
//             setImageUrl(data.secure_url);
//             setFormData(prev => ({ ...prev, movieImage: data.secure_url }));
//         }
//         else{
//           console.log("Error uploading image");
//         }
        
//     } catch (error) {
//         console.error("Upload failed:", error);
//     } finally {
//         setLoading(false);
//     }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/vendors/add_show`, formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert('Movie details submitted successfully!');
//       setFormData({
//         movieName: '',
//         releaseDate: '',
//         time: '',
//         movieImage: '',
//         ticketPrice: '',
//         language: '',
//         city: '',
//         area: '',
//         theatre: '',
//         screenNumber: ''
//       });
//       setFilteredMovies([]);
//       setAreas([]);
//       setAvailableTheatres([]);
//       setAvailableScreens([]);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <div className="mov-container">
//       <div className="mov-logo">
//         <img src={require("../../assets/images/log.png")} alt="Logo" className="movie-logo-img"/>
//       </div>

//       <div className="mov-form-wrapper">
//         <h2 className="mov-title">Submit Movie Details</h2>
//         <form onSubmit={handleSubmit} className="movie-form">

//           <div className="mov-form-group">
//             <label className="mov-label">Movie Name:</label>
//             <input
//               className="mov-input"
//               type="text"
//               name="movieName"
//               value={formData.movieName}
//               onChange={handleChange}
//               list="movie-options"
//               required
//             />
//             <datalist id="movie-options">
//               {filteredMovies.map((movie, index) => (
//                 <option key={index} value={movie.title} />
//               ))}
//             </datalist>
//           </div>
//           <div className="mov-form-group">
//             <label className="mov-label">City:</label>
//             <select
//               className="mov-input"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select City</option>
//               {cities.map((city, index) => (
//                 <option key={index} value={city}>{city}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mov-form-group">
//             <label className="mov-label">Area:</label>
//             <select
//               className="mov-input"
//               name="area"
//               value={formData.area}
//               onChange={handleChange}
//               required
//               disabled={!formData.city}
//             >
//               <option value="">Select Area</option>
//               {areas.map((area, index) => (
//                 <option key={index} value={area}>{area}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mov-form-group">
//             <label className="mov-label">Theatre:</label>
//             <select
//               className="mov-input"
//               name="theatre"
//               value={formData.theatre}
//               onChange={handleChange}
//               required
//               disabled={!formData.city || !formData.area}
//             >
//               <option value="">Select Theatre</option>
//               {availableTheatres.map((theatre, index) => (
//                 <option key={theatre.theatre_id} value={theatre.theater_id}>{theatre.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mov-form-group">
//             <label className="mov-label">Screen Number:</label>
//             <select
//               className="mov-input"
//               name="screenNumber"
//               value={formData.screenNumber}
//               onChange={handleChange}
//               required
//               disabled={!formData.theatre}
//             >
//               <option value="">Select Screen</option>
//               {availableScreens.map((screen, index) => (
//                 <option key={index} value={screen}>Screen {screen}</option>
//               ))}
//             </select>
//             <input type="file" accept="image/*" onChange={handleImageUpload} />

            
//           </div>

//           {[
//             { label: 'Release Date', name: 'releaseDate', type: 'date' },
//             { label: 'Time', name: 'time', type: 'time' },
//             { label: 'Ticket Price', name: 'ticketPrice', type: 'number' },
//             { label: 'Language', name: 'language', type: 'text' }
//           ].map(field => (
//             <div className="mov-form-group" key={field.name}>
//               <label className="mov-label">{field.label}:</label>
//               <input
//                 className="mov-input"
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           ))}

//           <button className="mov-submit-btn" type="submit">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MovieForm;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone"; // Import Dropzone
import "./Movie.css";
import { FaCloudUploadAlt } from "react-icons/fa";

const MovieForm = () => {
  const [formData, setFormData] = useState({
    movieName: "",
    releaseDate: "",
    time: "",
    ticketPrice: "",
    language: "",
    city: "",
    theatre: "",
    movieImage: null, // Change from URL to File
  });

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [preview, setPreview] = useState(null); // Image preview state

  useEffect(() => {
    fetch("/movies2.json")
      .then((response) => response.json())
      .then((data) => setMovies(data.movies))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "movieName" && Array.isArray(movies)) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  // Handle Image Upload using Dropzone
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]; // Get the first file
    setFormData((prevState) => ({ ...prevState, movieImage: file }));

    // Generate preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreview(reader.result);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.movieImage) {
      alert("Please upload a movie image!");
      return;
    }

    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    storedMovies.push({ ...formData, movieImage: preview });
    localStorage.setItem("movies", JSON.stringify(storedMovies));
    alert("Movie details submitted successfully!");

    try {
      const imageFormData = new FormData();
      imageFormData.append("image", formData.movieImage);

      // Upload image to your API
      const imageUploadResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/upload_image`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Send movie details including uploaded image URL
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/vendors/add_show`,
        { ...formData, movieImage: imageUploadResponse.data.imageUrl }
      );

      console.log(result.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setFormData({
      movieName: "",
      releaseDate: "",
      time: "",
      ticketPrice: "",
      language: "",
      city: "",
      theatre: "",
      movieImage: null,
    });
    setPreview(null);
    setFilteredMovies([]);
  };

  return (
    <div className="mov-container">
      <div className="mov-logo">
        <img
          src={require("../../assets/images/log.png")}
          alt="Logo"
          className="movie-logo-img"
        />
      </div>

      <div className="mov-form-wrapper">
        <h2 className="mov-title">Submit Movie Details</h2>
        <form onSubmit={handleSubmit} className="movie-form">
          <div className="mov-form-group">
            <label className="mov-label">Movie Name:</label>
            <input
              className="mov-input"
              type="text"
              name="movieName"
              value={formData.movieName}
              onChange={handleChange}
              list="movie-options"
              required
            />
            <datalist id="movie-options">
              {filteredMovies.map((movie, index) => (
                <option key={index} value={movie.title} />
              ))}
            </datalist>
          </div>

          {[  
            { label: "Release Date", name: "releaseDate", type: "date" },
            { label: "Time", name: "time", type: "time" },
            { label: "Ticket Price", name: "ticketPrice", type: "number" },
            { label: "Language", name: "language", type: "text" },
          ].map((field) => (
            <div className="mov-form-group" key={field.name}>
              <label className="mov-label">{field.label}:</label>
              <input
                className="mov-input"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mov-form-group">
            <label className="mov-label">City:</label>
            <select
              className="mov-input"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div className="mov-form-group">
            <label className="mov-label">Theatre:</label>
            <select
              className="mov-input"
              name="theatre"
              value={formData.theatre}
              onChange={handleChange}
              required
            >
              <option value="">Select Theatre</option>
              <option value="PVR">PVR</option>
              <option value="AAA">AAA</option>
              <option value="CINEPOLIS">CINEPOLIS</option>
              <option value="ARJUN">ARJUN</option>
            </select>
          </div>
          <div className="mov-form-group">
  <label className="mov-label">Upload Movie Image:</label>
  <div {...getRootProps()} className="dropzone">
    <input {...getInputProps()} />
    <FaCloudUploadAlt className="upload-icon" /> {/* Upload Icon */}
    <p>Drag & drop an image here, or click to select one</p>
  </div>
  {preview && (
    <img src={preview} alt="Preview" className="preview-image" />
  )}
</div>

          <button className="mov-submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;