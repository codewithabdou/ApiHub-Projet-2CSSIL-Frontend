function convertToDate(dateString: string): string {
    // Split the date string into date and time parts
    const [fullDate, timePart] = dateString.split('T');
    
    // Split the date part into year, month, and day
    const [datePart, fractionalSeconds] = fullDate.split('.');
    const [year, month, day] = datePart.split('-').map(Number);

    // Split the time part into hour, minute, and second
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Create a new Date object
    // Note: JavaScript months are 0-indexed, so we subtract 1 from the month
    const dateObject = new Date(year, month - 1, day, hour, minute, second);

    // Format the date as "dd/mm/yyyy"
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '-');

    return formattedDate; // Return the formatted date string
}

export default convertToDate;
