document.addEventListener('DOMContentLoaded', () => {
    const optionBoxes = document.querySelectorAll('.option-box');
    if (optionBoxes.length > 0) {
        optionBoxes.forEach(box => {
            box.addEventListener('click', () => {
                optionBoxes.forEach(item => item.classList.remove('active'));
                box.classList.add('active');
            });
        });
    }
});