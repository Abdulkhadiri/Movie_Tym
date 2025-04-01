import { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import "./TicketPage.css";

const TicketPage = () => {
  const { show_id, booking_id } = useParams(); // ✅ Get URL parameters
  const location = useLocation();
  const { selectedSeats, totalCost } = location.state || {};

  const ticketRef = useRef(null);
  const [ticketData, setTicketData] = useState({
    movieName: "",
    theatreName: "",
    screenNumber: "",
    showTime: "",
    showDate: "",
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/seats/get_ticket?show_id=${show_id}`);
        const { theater_name, address, screen, show_date, show_time, movie_name } = response.data;
        setTicketData({
    movieName: movie_name,
    theatreName: theater_name,
    theatreAddress: address,
    screenNumber: screen,
    showDate: new Date(show_date).toLocaleDateString(), // Formatting the date
    showTime: show_time,
  });
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    if (show_id) {
      fetchShowDetails();
    }
  }, [show_id]);

  const downloadPDF = async () => {
    if (ticketRef.current) {
      const canvas = await html2canvas(ticketRef.current);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
      pdf.save("Movie_Ticket.pdf");
    }
  };

  return (
    <div className="ticket-page">
      <div ref={ticketRef} className="ticket">
        <h2>🎟️ Movie Ticket</h2>
        <p><strong>Booking ID:</strong> {booking_id}</p>
        <p><strong>Movie:</strong> {ticketData.movieName}</p>
        <p><strong>Theatre:</strong> {ticketData.theatreName}</p>
        <p><strong>Screen:</strong> {ticketData.screenNumber}</p>
        <p><strong>Show Time:</strong> {ticketData.showTime}</p>
        <p><strong>Date:</strong> {ticketData.showDate}</p>
        <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "No seats selected"}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>

        {/* QR Code Display */}
        <div className="qr-code-container">
          <QRCodeCanvas 
            value={JSON.stringify({
              show_id,
              booking_id,
              ...ticketData,
              selectedSeats,
              totalCost
            })} 
            size={100} 
          />
        </div>
      </div>

      {/* PDF Download Button */}
      <button className="buttonnn" onClick={downloadPDF}>Download Ticket</button>
    </div>
  );
};

export default TicketPage;
