export default function getTimeDifference(created_at: string): string {
    const createdAtDate = new Date(created_at);
    const currentDate = new Date();
    
    const timeDifferenceInSeconds = (currentDate.getTime() - createdAtDate.getTime()) / 1000;
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;
    
    if (timeDifferenceInSeconds < secondsInMinute) {
        return "Just now";
    } else if (timeDifferenceInSeconds < secondsInHour) {
        const minutes = Math.floor(timeDifferenceInSeconds / secondsInMinute);
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (timeDifferenceInSeconds < secondsInDay) {
        const hours = Math.floor(timeDifferenceInSeconds / secondsInHour);
        return `${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (timeDifferenceInSeconds < secondsInMonth) {
        const days = Math.floor(timeDifferenceInSeconds / secondsInDay);
        return `${days} jour${days > 1 ? 's' : ''} `;
    } else if (timeDifferenceInSeconds < secondsInYear) {
        const months = Math.floor(timeDifferenceInSeconds / secondsInMonth);
        return `${months} mois${months > 1 ? 's' : ''}`;
    } else {
        const years = Math.floor(timeDifferenceInSeconds / secondsInYear);
        return `${years} an${years > 1 ? 's' : ''} `;
    }
}