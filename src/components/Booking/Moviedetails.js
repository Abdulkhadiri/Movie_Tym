import React, { useState, useEffect, useContext } from 'react';
import { Star } from 'lucide-react';
import './moviedetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import ShowCard from './ShowCard';
import { DropdownContext } from '../Context';
import NavigationArrows from './NavigationArrows';

const MovieDetails = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const { movie_name } = useParams();
    const {Location} = useContext(DropdownContext);
    const navigate = useNavigate();
   
    useEffect(() => {
        fetch('/movies2.json')
            .then(response => response.json())
            .then(data => setMovies(data.movies))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const movie = movies.find(m => m.title ===movie_name);

    const fetchShows = (date) => {
        if (movie && date) {
            fetch(`http://localhost:5000/Theater_Generation/shows?movie_name=${movie.title}&date=${date}&Location=${Location}`)
                .then(response => response.json())
                .then(data => {
                    setShows(Array.isArray(data) ? data : []);
                })
                .catch(error => {
                    console.error('Error fetching shows:', error);
                    setShows([]);
                });
        }
    };

    const onDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        fetchShows(date);
    };

    const onShowSelect = (show, movieName) => {
        navigate(`/seats/${show.showId}`, {
            state: {
                movieName,
                theatreName: show.theatre,
                showTime: show.showTime,
                showDate: show.date
            }
        });
    };

    if (!movies.length || !movie) {
        return <div>Loading or Movie not found...</div>;
    }

    return (
        <div className="moviedetails_container">
            <NavigationArrows prevPath={`/home`}/>
            <div className="movie-info">
                <img src={movie.image_url} alt={movie.title} className="movie-image" />
                <div className="details">
                    <h1>{movie.title}</h1>
                    <p><strong>Type:</strong> {movie.type}</p>
                    <div className="rating">
                        <Star size={20} fill="gold" color="gold" />
                        <span>{movie.rating}</span>
                    </div>
                </div>
            </div>

            <div className="movie-side">
                <div className="date-picker">
                    <label htmlFor="date">Select Date: </label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={onDateChange}
                    />
                </div>
                <div className="shows-container">
                    {selectedDate && shows.length === 0 && <div className='no-shows'>No shows available for the selected date.</div>}
                    {Array.isArray(shows) && shows.map(show => (
                        <ShowCard
                            key={show.show_id}
                            show={{
                                theatre: show.theater_name,
                                showTime: show.show_time,
                                date: show.show_date,
                                showId: show.show_id
                            }}
                            movieName={movie.title}
                            onClick={onShowSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default MovieDetails;
