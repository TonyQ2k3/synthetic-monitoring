function isTradingTime() {
    let timeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    // timeString must be in format "H:M:S AM/PM" (e.g. "8:30:0 AM")
    let current = timeString.split(',')[1];

    const timeParts = current.match(/(\d+):(\d+):(\d+) (\w+)/);
    
    if (!timeParts) {
        throw new Error("Invalid time format");
    }

    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const period = timeParts[4]; // AM or PM

    // Convert to 24-hour format
    let totalMinutes = (period === 'PM' && hours !== 12) ? hours + 12 : hours;
    if (period === 'AM' && hours === 12) {
        totalMinutes = 0;
    }
    totalMinutes = totalMinutes * 60 + minutes; // Convert to total minutes

    // Define the range in total minutes
    const eightAM = 8 * 60; // 8:00 AM in minutes
    const threePM = 15 * 60; // 3:00 PM in minutes

    // Check if the time is between 8 AM and 3 PM
    return totalMinutes >= eightAM && totalMinutes < threePM;
}

module.exports = { isTradingTime }