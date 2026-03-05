// Audio player references
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Format time helper (seconds → mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
  } else {
    audio.pause();
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
  }
});

// Update progress + time display
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Show duration once metadata is loaded
audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

// Reset when song ends
audio.addEventListener("ended", () => {
  playPauseBtn.classList.remove("fa-pause");
  playPauseBtn.classList.add("fa-play");
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
});

// Modal controls
function openTicket(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeTicket(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
}

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
    document.body.style.overflow = "";
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.style.display = "none";
    });
    document.body.style.overflow = "";
  }
});

// Ticket booking (redirect to ticket page)
function confirmTicket(eventId) {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const cellno = document.getElementById("cellno").value.trim();
  const age = document.getElementById("age").value.trim();
  const tickets = parseInt(document.getElementById("tickets").value, 10);

  if (!name || !surname || !cellno || !age || !tickets) {
    alert("Please fill in all fields.");
    return false;
  }

  if (tickets < 1 || tickets > 4) {
    alert("You can only book between 1 and 4 tickets.");
    return false;
  }

  // Generate unique booking ID
  const bookingId = "TICKET" + Date.now();

  // Save booking info locally
  localStorage.setItem(bookingId, JSON.stringify({
    name,
    surname,
    cellno,
    age,
    tickets,
    eventId
  }));

  // Redirect user directly to ticket page
  window.location.href = `ticket.html?bookingId=${bookingId}`;

  return false; // prevent default form submission
}