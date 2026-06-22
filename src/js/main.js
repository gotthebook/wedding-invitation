import '../style.css'
import { initCountdown } from './countdown.js'
import { initMap } from './map.js'
import { initCalendar } from './calendar.js'
import { initGuestbook } from './guestbook.js'

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
  initCountdown();
  initMap();
  initCalendar();
  initGuestbook();
});
