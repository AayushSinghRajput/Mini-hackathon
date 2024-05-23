document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mainForm");

    form.addEventListener("submit", function(event) {
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const image = document.getElementById("image");

        if (!validateEmail(email.value)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
        }

        if (!validatePhone(phone.value)) {
            alert("Please enter a valid phone number.");
            event.preventDefault();
        }

        if (!image.files.length) {
            alert("Please upload an image.");
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^\d{10}$/; // Simple validation for 10 digit phone number
        return re.test(phone);
    }
});
