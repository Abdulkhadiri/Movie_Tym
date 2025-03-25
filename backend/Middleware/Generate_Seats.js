 // Import database execution function
 const db = require('../Middleware/Database');
 const execute_query = async(query, params) => {
     return new Promise((resolve, reject) => {
         db.query(query, params, (error, results) => {
             if (error) return reject(error);
             resolve(results);
         });
     });
 };
 async function generateSeats(show_id, ticketPrice) {
     const sections = [
         { name: 'Orchestra', extra: 50, rows: ['A', 'B', 'C'], seatsPerRow: 10 },
         { name: 'Mezzanine', extra: 100, rows: ['D', 'E', 'F'], seatsPerRow: 10 },
         { name: 'Balcony', extra: 150, rows: ['G', 'H', 'I'], seatsPerRow: 10 },
     ];
     const seatEntries = [];
     sections.forEach(section => {
         section.rows.forEach(row => {
             for (let i = 1; i <= section.seatsPerRow; i++) {
                 seatEntries.push([
                     show_id,
                     `${row}${i}`,
                     'available',
                     section.name,
                     ticketPrice + section.extra
                 ]);
             }
         });
     });


     try {
         const query = `INSERT INTO seat (show_id, seat_number, status, seat_type, extra_price) VALUES ?`;
         await execute_query(query, [seatEntries]);
         console.log('Seats added successfully.');
     } catch (error) {
         console.error('Error adding seats:', error);
         throw error;
     }
 }
 module.exports = generateSeats;