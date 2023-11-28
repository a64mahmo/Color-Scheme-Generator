// Get the color input element
const colorInputEL = document.getElementById('colorPicker');
const colorSchemeEL = document.getElementById('colorScheme');
const getColorSchemeBtn = document.getElementById('getColorScheme');

// the cards that will display the colors
const cards = [
    document.querySelector('.card-container > :nth-child(1)'),
    document.querySelector('.card-container > :nth-child(2)'),
    document.querySelector('.card-container > :nth-child(3)'),
    document.querySelector('.card-container > :nth-child(4)'),
    document.querySelector('.card-container > :nth-child(5)')
];

// Define the color and mode
let mode = 'monochrome';
let hex = 'E22503';

// Define a function to fetch a color scheme from the Color API
function fetchColorScheme() {
    // Fetch a color scheme
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Log each color in the color scheme
            data.colors.forEach((color, index) => {
                console.log(`\nColor ${index + 1}:`);
                console.log(`Name: ${color.name.value}`);
                console.log(`RGB: ${color.rgb.value}`);

                // Change the background color of the corresponding card
                cards[index].style.backgroundColor = color.rgb.value;

                // Change the data-color attribute of the corresponding card
                cards[index].setAttribute('data-color', color.hex.value);
            });
        });
}

// Add an event listener to the color input. This will log the selected color whenever the user picks a new color
colorInputEL.addEventListener('input', e => {
    hex = colorInputEL.value.slice(1); // Logs the selected color
});

// Add an event listener to the color scheme select. This will log the selected color scheme whenever the user picks a new color scheme
colorSchemeEL.addEventListener('change', e => {
    mode = colorSchemeEL.value; // Logs the selected color scheme
});

// Add an event listener to the get color scheme button. This will fetch and log a color scheme whenever the user clicks the button
getColorSchemeBtn.addEventListener('click', e => {
    fetchColorScheme();

});



// Add an event listener to each card. This will copy the color to the clipboard whenever the user clicks a card
cards.forEach(card => {
    // Get the "copied" indicator for this card
    const copiedIndicator = card.querySelector('.copied-indicator');

    card.addEventListener('click', e => {
        // Get the data-color value of the clicked card
        let color = e.target.getAttribute('data-color');

        // Copy the color to the clipboard
        navigator.clipboard.writeText(color).then(() => {
            console.log(`Copied ${color} to clipboard`);

            // Show the "copied" indicator
            copiedIndicator.style.display = 'block';

            // Hide the "copied" indicator after 2 seconds
            setTimeout(() => {
                copiedIndicator.style.display = 'none';
            }, 2000);
        })
    });
});