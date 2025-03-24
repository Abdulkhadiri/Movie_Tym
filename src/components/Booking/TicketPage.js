import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf"; // ✅ Import jsPDF
import html2canvas from "html2canvas"; // ✅ Import html2canvas
import "./TicketPage.css"; // Import CSS file

const TicketPage = () => {
  const location = useLocation();
  const { selectedSeats, totalCost, movieName, theatreName, showTime, showDate } = location.state || {};

  // ✅ Define ticketRef
  const ticketRef = useRef(null);

  // ✅ Function to Download PDF
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
        <p><strong>Movie:</strong> {movieName}</p>
        <p><strong>Theatre:</strong> {theatreName}</p>
        <p><strong>Show Time:</strong> {showTime}</p>
        <p><strong>Date:</strong> {showDate}</p>
        <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "No seats selected"}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost}</p>

        {/* QR Code Display */}
        <div className="qr-code-container">
          <QRCodeCanvas value={JSON.stringify({ movieName, theatreName, showTime, showDate, selectedSeats, totalCost })} size={100} />
        </div>
      </div>

      {/* ✅ PDF Download Button */}
      <button className="buttonnn"  onClick={downloadPDF}>Download Ticket</button>
    </div>
  );
};

export default TicketPage;
