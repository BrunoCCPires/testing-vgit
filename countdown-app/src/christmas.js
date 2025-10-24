import './style.css'

// Calculate Christmas date
function getChristmasDate() {
  const year = new Date().getFullYear();
  let christmas = new Date(year, 11, 25); // December 25th

  // If Christmas has passed, calculate for next year
  if (christmas < new Date()) {
    christmas = new Date(year + 1, 11, 25);
  }

  return christmas;
}

const targetDate = getChristmasDate();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    document.getElementById('targetDate').textContent = "Merry Christmas! 🎄";
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
