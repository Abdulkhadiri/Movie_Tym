const bcrypt = require('bcrypt');

function Booking_ud(username, show_id) {
    let date = new Date();
    let booking_id = bcrypt.hashSync(username + show_id + date, 10);
    return booking_id;
}
module.exports = Booking_ud;