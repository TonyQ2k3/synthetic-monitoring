function isWorkingDay() {
    // dateString is a string in the format 'MM/DD/YYYY' (e.g. '12/31/2024')
    let timeString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    let dateString = timeString.split(",")[0];
    // Parse the date string
    const dateParts = dateString.split('/');
    const month = parseInt(dateParts[0], 10) - 1; // Month is 0-indexed in JavaScript
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Create a Date object
    const date = new Date(year, month, day);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();

    // Check if it's a weekday (1 to 5)
    return dayOfWeek >= 1 && dayOfWeek <= 5;
}

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
    const threePM = 14 * 60 + 45; // 2:45 PM in minutes

    // Check if the time is between 8 AM and 2:45 PM
    console.log(totalMinutes);
    return totalMinutes >= eightAM && totalMinutes < threePM;
}

module.exports = { isWorkingDay, isTradingTime };

console.log(isTradingTime());