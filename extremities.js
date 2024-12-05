// Toggle the visibility of the "More Apps" dropdown when the button is clicked
function toggleDropdown(event) {
    event.stopPropagation();  // Prevent the click event from propagating to the document
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
}

// Close the dropdown if clicked outside of the dropdown button or content
function closeDropdown(event) {
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownButton = document.querySelector('.dropbtn');
    
    // Check if the click was outside the dropdown or button
    if (!dropdownButton.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.classList.remove('show');
    }
}

// Add event listener to document to close the dropdown if clicked outside
document.addEventListener('click', closeDropdown);

// Call toggleDropdown when the dropdown button is clicked
document.querySelector('.dropbtn').addEventListener('click', toggleDropdown);
