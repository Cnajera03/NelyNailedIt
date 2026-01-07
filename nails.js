// Initialize EmailJS
emailjs.init("DcFu_X6vKCHsrvHP8");

let basePrice = 0;
let total = basePrice;
let selectedAddons = [];
let selectedServices = [];

// ================= SERVICE CHECKBOXES =================
document.querySelectorAll(".service-checkbox").forEach(cb => {
  cb.addEventListener("change", updateTotal);
});

// ================= UPDATE TOTAL =================
function updateTotal() {
  selectedServices = Array.from(
    document.querySelectorAll(".service-checkbox:checked")
  ).map(cb => cb.value);

  const serviceTotal = Array.from(
    document.querySelectorAll(".service-checkbox:checked")
  ).reduce((sum, cb) => sum + Number(cb.dataset.price), 0);

  total = basePrice + serviceTotal;

  document.getElementById("serviceField").value =
    selectedServices.join(", ");

  document.getElementById("addonsField").value = "None";

  document.getElementById("total").innerText = `$${total}`;
  document.getElementById("totalField").value = `$${total}`;
}

// ================= TIME SELECTION 
 

// ================= FORM SUBMIT =================
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

   

    emailjs
      .sendForm(
        "service_hkep44n",
        "template_p6vquoh",
        this
      )
      .then(() => {
        alert("Appointment request sent 💖");

        this.reset();
        total = basePrice;
        selectedServices = [];
 

        document.getElementById("total").innerText = "$0";
      })
      .catch(err => {
        console.error("EmailJS error:", err);
        alert("Email failed. Check console.");
      });
  });
 
  document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".hero-video");
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  });
 
