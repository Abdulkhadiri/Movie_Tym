import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Movie.css';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    movieName: '',
    releaseDate: '',
    time: '',
    movieImage: '',
    ticketPrice: '',
    language: '',
    city: '',
    theatre: '',
    screenNumber: ''
  });

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [cities, setCities] = useState([]);
  const [availableTheatres, setAvailableTheatres] = useState([]);
  const [availableScreens, setAvailableScreens] = useState([]);

  const username = sessionStorage.getItem("user") || 'theater_owner_1';
  const token = sessionStorage.getItem("token") || ""; 

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Vendors/fetch_locations`, {
      params: { username },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setCities(response.data))
    .catch(error => console.error('Error fetching cities:', error));
  }, [username, token]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Vendors/getMovies`, {
      params: { username },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setMovies(response.data.movies || []))
    .catch(error => console.error('Error fetching movies:', error));
  }, [username, token]);

  const fetchTheatres = (selectedCity) => {
    if (selectedCity) {
      axios.get(`${process.env.REACT_APP_API_URL}/getTheatres`, {
        params: { city: selectedCity, username },
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => setAvailableTheatres(response.data || []))
      .catch(error => console.error('Error fetching theatres:', error));
      setAvailableScreens([]);
      setFormData(prev => ({ ...prev, theatre: '', screenNumber: '' }));
    }
  };
  const fetchScreens = (selectedTheatre) => {
    if (selectedTheatre) {
      axios.get(`${process.env.REACT_APP_API_URL}/getScreens`, {
        params: { theatre: selectedTheatre },
        headers: { Authorization:`Bearer ${token}` }
      })
      .then(response => setAvailableScreens(response.data || []))
      .catch(error => console.error('Error fetching screens:', error));

      setFormData(prev => ({ ...prev, screenNumber: '' }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'city') {
      fetchTheatres(value);
      console.log("hello");
    }

    if (name === 'theatre') {
      fetchScreens(value);
    }

    if (name === 'movieName' && Array.isArray(movies)) {
      setFilteredMovies(
        movies.filter(movie => movie?.title?.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/vendors/add_show`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Movie details submitted successfully!');
      setFormData({
        movieName: '',
        releaseDate: '',
        time: '',
        movieImage: '',
        ticketPrice: '',
        language: '',
        city: '',
        theatre: '',
        screenNumber: ''
      });

      setFilteredMovies([]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mov-container">
      <div className="mov-logo">
        <img src={require("../../assets/images/log.png")} alt="Logo" className="movie-logo-img"/>
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
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
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
              disabled={!formData.city}
            >
              <option value="">Select Theatre</option>
              {availableTheatres.map((theatre, index) => (
                <option key={index} value={theatre}>{theatre}</option>
              ))}
            </select>
          </div>

          <div className="mov-form-group">
            <label className="mov-label">Screen Number:</label>
            <select
              className="mov-input"
              name="screenNumber"
              value={formData.screenNumber}
              onChange={handleChange}
              required
              disabled={!formData.theatre}
            >
              <option value="">Select Screen</option>
              {availableScreens.map((screen, index) => (
                <option key={index} value={screen}>{screen}</option>
              ))}
            </select>
          </div>

          {[
            { label: 'Release Date', name: 'releaseDate', type: 'date' },
            { label: 'Time', name: 'time', type: 'time' },
            { label: 'Movie Image URL', name: 'movieImage', type: 'text' },
            { label: 'Ticket Price', name: 'ticketPrice', type: 'number' },
            { label: 'Language', name: 'language', type: 'text' }
          ].map(field => (
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

          <button className="mov-submit-btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;