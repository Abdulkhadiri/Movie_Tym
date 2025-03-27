import React, { useContext, useEffect, useState } from "react";
import { Search, LogOut, LogIn, Menu, X, Home, User, Phone, BookOpen, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownContext } from "../Context";
import "./navbar.css";

const Navbar = () => {
  const [user, setUser] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {Location,setLocation} = useContext(DropdownContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(sessionStorage.getItem("user"));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogin = () => {
    navigate('/log');
  };

  const handleLogout = () => {
    sessionStorage.setItem("user", "");
    navigate('/');
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-1">
        <div className="first_container">
          <div className="logo">
            <img 
              style={{ height: '250px', width: '300px' }} 
              src={require('../../assets/images/mainlogo.png')} 
              alt="img" 
            />
          </div>
          <div className="first_sub_container">
            <div className="search_and_input">
              <div className="search_bar">
                <input type="text" placeholder="Search movies" />
                <button className="search">
                  <Search />
                </button>
              </div>
            </div>

            <div className="auth-menu-container">
              {user && windowWidth > 768 && (
                <button onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
              {!user && windowWidth > 768 && (
                <button onClick={handleLogin}>
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              )}
              {windowWidth <= 768 && (
                <button className="hamburger" onClick={toggleSidebar}>
                  {isSidebarOpen ? <X /> : <Menu />}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {windowWidth > 768 && (
          <div className="border-t">
            <div className="nav_items">
              Welcome {user ? user : 'Guest'}!
              <Link to="/home">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/private-booking">Private Booking</Link>
              <div className="location-dropdown">
                <MapPin className="location-icon" />
                <select value={Location} onChange={(e)=>setLocation(e.target.value)}>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pamur">Pamur</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="user-profile">
            {user ? (
              <>
                <User className="user-icon" />
                <span>{user}</span>
              </>
            ) : (
              <span>Guest</span>
            )}
          </div>
          <button className="close-sidebar" onClick={closeSidebar}>
            <X />
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" onClick={closeSidebar}>
            <Home />
            <span>Home</span>
          </Link>
          <Link to="/profile" onClick={closeSidebar}>
            <User />
            <span>Profile</span>
          </Link>
          <Link to="/contact" onClick={closeSidebar}>
            <Phone />
            <span>Contact Us</span>
          </Link>
          <Link to="/private-booking" onClick={closeSidebar}>
            <BookOpen />
            <span>Private Booking</span>
          </Link>
        </nav>
        <div className="sidebar-footer">
          {user ? (
            <button onClick={handleLogout} className="sidebar-logout">
              <LogOut />
              <span>Logout</span>
            </button>
          ) : (
            <button onClick={handleLogin} className="sidebar-login">
              <LogIn />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </nav>
  );
};

export default Navbar;
