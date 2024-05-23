document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.querySelector(".login-dropdown__btn");
    const dropdownContent = document.querySelector(".login-dropdown__content");

    dropdownBtn.addEventListener("click", function () {
        const expanded = dropdownBtn.getAttribute("aria-expanded") === "true" || false;
        dropdownBtn.setAttribute("aria-expanded", !expanded);
        dropdownContent.classList.toggle("show");
    });

    window.addEventListener("click", function (event) {
        if (!event.target.matches('.login-dropdown__btn')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownBtn.setAttribute("aria-expanded", false);
                dropdownContent.classList.remove('show');
            }
        }
    });

    const form = document.getElementById("mainForm");

    form.addEventListener("submit", function(event) {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const image = document.getElementById("image");

        if (!validateEmail(email.value)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
        }

        if (password.value.length < 8) {
            alert("Password must be at least 8 characters long.");
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
});
