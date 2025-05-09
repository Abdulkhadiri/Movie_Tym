import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "react-multi-carousel/lib/styles.css";

import SingleCardSlider from "../CarouselSingle/singlecard";
import Multicard from "../CarouselMulti/Multicard";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <p style={{ fontSize: "larger", marginLeft: "20px" }}>
        🎬🍿Book your show now.. Now you can book your own private show for your
        friends and family👨‍👩‍👧‍👦
      </p>
      <SingleCardSlider />
      <Multicard />
      <Footer />
    </div>
  );
};

export default Home;
