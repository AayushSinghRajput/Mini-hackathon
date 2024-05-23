document.addEventListener('DOMContentLoaded', () => {
    const addMoreButton = document.querySelector('.add-more-button');
    const cardContainer = document.querySelector('.card-container');
    const businessModal = document.getElementById('businessModal');
    const closeModalButton = document.getElementById('closeModal');
    const businessForm = document.getElementById('businessForm');
    const fileUpload = document.getElementById('fileUpload');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let firstFocusableElement;
    let lastFocusableElement;

    // Function to open the modal
    function openModal() {
        businessModal.style.display = 'flex';
        businessModal.setAttribute('aria-hidden', 'false');
        firstFocusableElement = businessModal.querySelectorAll(focusableElements)[0];
        lastFocusableElement = businessModal.querySelectorAll(focusableElements)[businessModal.querySelectorAll(focusableElements).length - 1];
        firstFocusableElement.focus();
        businessModal.addEventListener('keydown', trapTabKey);
    }

    // Function to close the modal
    function closeModal() {
        businessModal.style.display = 'none';
        businessModal.setAttribute('aria-hidden', 'true');
        businessModal.removeEventListener('keydown', trapTabKey);
        addMoreButton.focus();
    }

    // Function to trap focus inside the modal
    function trapTabKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    // Function to validate the file upload
    function validateFileUpload(e) {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            fileUpload.value = '';
        }
    }

    // Function to handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        const businessName = document.getElementById('businessName').value.trim();
        const businessImage = document.getElementById('businessImage').value.trim();
        const businessDescription = document.getElementById('businessDescription').value.trim();

        if (!businessName || !businessImage || !businessDescription) {
            alert('All fields are required.');
            return;
        }

        if (!isValidURL(businessImage)) {
            alert('Please enter a valid URL for the business image.');
            return;
        }

        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = businessImage;
        img.alt = 'Business Image';

        const name = document.createElement('h3');
        name.textContent = businessName;

        const description = document.createElement('p');
        description.textContent = businessDescription;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(description);

        cardContainer.appendChild(card);
        closeModal();
    }

    // Function to check if a URL is valid
    function isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Event listeners
    addMoreButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === businessModal) {
            closeModal();
        }
    });
    businessForm.addEventListener('submit', handleFormSubmit);
    fileUpload.addEventListener('change', validateFileUpload);
});
