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
  const modal = document.getElementById(eventId);

  // Scope queries to the modal so we get the right inputs
  const name = modal.querySelector("#name").value.trim();
  const surname = modal.querySelector("#surname").value.trim();
  const cellno = modal.querySelector("#cellno").value.trim();
  const age = modal.querySelector("#age").value.trim();
  const tickets = parseInt(modal.querySelector("#tickets").value, 10);

  if (!name || !surname || !cellno || !age || !tickets) {
    alert("Please fill in all fields.");
    return false;
  }

  if (tickets < 1 || tickets > 4) {
    alert("You can only book between 1 and 4 tickets.");
    return false;
  }

  const bookingId = "TICKET" + Math.floor(1000 + Math.random() * 9000);

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