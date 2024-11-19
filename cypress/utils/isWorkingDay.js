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

module.exports = { isWorkingDay };