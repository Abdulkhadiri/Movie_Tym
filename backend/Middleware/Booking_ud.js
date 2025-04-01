const crypto = require('crypto');

function Booking_ud(username, show_id) {
    let date = new Date();
    let booking_id = crypto.createHash('sha256')
        .update(username + show_id + date)
        .digest('hex');

    // Take the first 7 characters of the sha256 hash
    booking_id = booking_id.substring(0, 7);

    return booking_id;
}

module.exports = Booking_ud;