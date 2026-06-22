/**
 * Add to Calendar Module
 * Generates and downloads an .ics file or opens Google Calendar event link
 */

const WEDDING_DETAILS = {
  title: "Elena & Julian's Wedding",
  date: '20260801',
  time: '190000',
  location: 'THE SPRINGS CLUB, Jl. Springs Boulevard Blok, Gading Serpong, Cihuni, Tangerang'
};

export function initCalendar() {
  const calendarBtn = document.getElementById('calendar-btn');
  
  calendarBtn.addEventListener('click', function() {
    // Generate ICS file content
    const icsContent = generateICS();
    
    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'wedding-invitation.ics');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function generateICS() {
  // Generate a unique UID
  const uid = `${Date.now()}@wedding-invitation`;
  const now = new Date();
  const dtstamp = formatDate(now);
  
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${dtstamp}
DTSTART:${WEDDING_DETAILS.date}T${WEDDING_DETAILS.time}Z
SUMMARY:${WEDDING_DETAILS.title}
LOCATION:${WEDDING_DETAILS.location}
DESCRIPTION:You are invited to our wedding!
END:VEVENT
END:VCALENDAR`;

  return icsContent;
}

function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
