document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('.image-selector input[type="radio"]');
    const displayedImage = document.getElementById('displayedImage');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            displayedImage.classList.add('hidden');
            setTimeout(() => {
                displayedImage.src = this.value;
                displayedImage.classList.remove('hidden');
            }, 300);
        });
    });
});