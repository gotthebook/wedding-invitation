/**
 * Add to Calendar Module
 * Opens a Google Calendar event creation page instead of downloading an .ics file
 */

const WEDDING_DETAILS = {
  title: "Elena & Julian's Wedding",
  date: '20260801',
  time: '190000',
  location: 'THE SPRINGS CLUB, Jl. Springs Boulevard Blok, Gading Serpong, Cihuni, Tangerang'
};

export function initCalendar() {
  const calendarBtn = document.getElementById('calendar-btn');
  
  calendarBtn.addEventListener('click', openGoogleCalendar);
}

function openGoogleCalendar() {
  const startDate = parseLocalDateTime(WEDDING_DETAILS.date, WEDDING_DETAILS.time);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: WEDDING_DETAILS.title,
    details: 'You are invited to our wedding!',
    location: WEDDING_DETAILS.location,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`
  });

  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  window.open(url, '_blank');
}

function parseLocalDateTime(dateString, timeString) {
  const year = Number(dateString.slice(0, 4));
  const month = Number(dateString.slice(4, 6)) - 1;
  const day = Number(dateString.slice(6, 8));
  const hours = Number(timeString.slice(0, 2));
  const minutes = Number(timeString.slice(2, 4));
  const seconds = Number(timeString.slice(4, 6) || '00');

  return new Date(year, month, day, hours, minutes, seconds);
}

function formatGoogleDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}
