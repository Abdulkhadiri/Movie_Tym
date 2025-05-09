import "./App.css";

import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Preview from "./components/Preview/Preview";
import LoginSignup from "./components/LoginSignUp/LoginSignup"
import Admin from './components/Admin/Admin'
import ThreaterOwner from "./components/Vender/Vender"
import PrivateBooking from "./components/private_booking/PrivateBooking";
import Contact from './components/Contact/Contact'
import MovieDetails from "./components/Booking/Moviedetails";
import AdminHome from "./components/AdminHome/AdminHome";
import VenderHome from "./components/VenderHome/MovieForm";
import UserProfile from "./components/MyBooking/UserProfile";
import SeatSelection from "./components/Booking/SeatSelection";
import ForgetPassword from "./components/Forgotpassword/Forgotpassword";
import VendorDashboard from "./components/VenderDashboard/VenderDashboard";
import VenderEdit from "./components/VenderDashboard/VenderEdit";
import TicketPage from "./components/Booking/TicketPage";
import Review from "./components/VenderDashboard/Review";
import AdminEdit from "./components/AdminHome/AdminEdit";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Preview />} />
        <Route index path="/home" element={<Home />} />
        <Route path="/log" element={<LoginSignup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vendor" element={<ThreaterOwner />} />
        <Route path="/private-booking" element={<PrivateBooking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/movies/:movie_name" element={<MovieDetails />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/venderhome" element={<VenderHome />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/seats/:showId" element={<SeatSelection />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/vender-dashboard" element={<VendorDashboard/>}/>
        <Route path="/venderedit" element={<VenderEdit/>}/>
        <Route path="/ticket/:show_id/:booking_id/:selectedSeats" element={<TicketPage />} />
        <Route path="/review" element={<Review/>}/>
        <Route path="/admin/edit_vendor/:id" element={<AdminEdit />} />
        </Routes>
    </BrowserRouter>
     
    
  );
}

export default App;
