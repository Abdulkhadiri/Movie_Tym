import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import 'react-multi-carousel/lib/styles.css';
import SingleCardSlider from '../CarouselSingle/singlecard';
import Multicard from '../CarouselMulti/Multicard';

const Home = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    // Check if user is not logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Start countdown
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            navigate('/log');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    }
  }, [navigate]);

  // Handler to redirect to login if timer is active
  const handleRedirectToLogin = (e) => {
    e.preventDefault();
    if (isTimerActive) {
      navigate('/log');
    }
  };

  return (
    <div>
      <div onClick={handleRedirectToLogin}>

      <Navbar />
      </div>
      
      <div 
        onClick={handleRedirectToLogin}
        style={{ pointerEvents: isTimerActive ? 'auto' : 'none' }}
      >
        <p style={{fontSize:'larger', marginLeft:'20px'}}> 
          🎬🍿Book your show now.. Now you can book your own private show for your friends and family👨‍👩‍👧‍👦
        </p>
        
        <SingleCardSlider />
        <Multicard/>
      </div>
      
      <Footer/>
    </div>
  );
}

export default Home;