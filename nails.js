// Initialize EmailJS
emailjs.init("DcFu_X6vKCHsrvHP8");

let basePrice = 0;
let total = basePrice;
let selectedTime = "";
let selectedAddons = [];
let selectedServices = [];

// Service checkboxes
document.querySelectorAll(".service-checkbox").forEach(cb => {
  cb.addEventListener("change", updateTotal);
});

// Update total
function updateTotal() {
  selectedServices = Array.from(
    document.querySelectorAll(".service-checkbox:checked")
  ).map(cb => cb.value);

  const serviceTotal = Array.from(
    document.querySelectorAll(".service-checkbox:checked")
  ).reduce((sum, cb) => sum + Number(cb.dataset.price), 0);

  total = basePrice + serviceTotal;

  document.getElementById("serviceField").value = selectedServices.join(", ");
  document.getElementById("addonsField").value = "None";
  document.getElementById("total").innerText = `$${total}`;
  document.getElementById("totalField").value = `$${total}`;
}

// Time selection
document.querySelectorAll(".time-slot").forEach(slot => {
  slot.addEventListener("click", () => {
    document.querySelectorAll(".time-slot").forEach(s =>
      s.classList.remove("selected")
    );
    slot.classList.add("selected");
    selectedTime = slot.innerText;
    document.getElementById("timeField").value = selectedTime;
  });
});

// Form submit
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!selectedTime) {
      alert("Please select a time");
      return;
    }

    emailjs
      .sendForm(
        "service_0v21hf5",
        "template_p6vquoh",
        this
      )
      .then(() => {
        alert("Appointment request sent 💖");
        this.reset();
        total = basePrice;
        selectedServices = [];
        selectedTime = "";
        document.getElementById("total").innerText = `$0`;
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("Email failed. Check console.");
      });
  });
