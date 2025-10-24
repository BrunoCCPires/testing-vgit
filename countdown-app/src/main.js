import './style.css'

// Calculate Black Friday date (4th Friday after Thanksgiving, which is 4th Thursday of November)
function getBlackFridayDate() {
  const year = new Date().getFullYear();
  const november = new Date(year, 10, 1); // November is month 10 (0-indexed)

  // Find first Thursday of November
  let day = november.getDay();
  let firstThursday = 1 + ((4 - day + 7) % 7);

  // Fourth Thursday (Thanksgiving) + 1 day = Black Friday
  let blackFriday = new Date(year, 10, firstThursday + 21 + 1);

  // If Black Friday has passed, calculate for next year
  if (blackFriday < new Date()) {
    blackFriday = new Date(year + 1, 10, firstThursday + 21 + 1);
  }

  return blackFriday;
}

const targetDate = getBlackFridayDate();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    document.getElementById('targetDate').textContent = "Black Friday is here!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('targetDate').textContent = `Target Date: ${targetDate.toLocaleDateString('en-US', options)}`;
}

// Update immediately and then every second
updateCountdown();
setInterval(updateCountdown, 1000);
