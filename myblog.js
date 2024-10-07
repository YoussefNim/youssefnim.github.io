
document.addEventListener('DOMContentLoaded', function() {
const toggle_mode_btn = document.getElementById("toggle_mode_btn")

const storedTheme = localStorage.getItem('theme')

// If a theme preference is stored, apply it to the body classList
if (storedTheme){
    document.body.classList.add(storedTheme)
}

if (toggle_mode_btn){
    // got error message bc was trying to attach this eventListener in ConstantSourceNode.html even tho doesn't exist
    toggle_mode_btn.addEventListener('click', function(){
        
        document.body.classList.toggle('dark_mode');
        // Update the theme preference in localStorage
        const currentTheme = document.body.classList.contains('dark_mode') ? 'dark_mode' : '';
        localStorage.setItem('theme', currentTheme);
    })
}


// Get the current page pathname
var currentPagePath = window.location.pathname;

// Select all navigation links
var navLinks = document.querySelectorAll('nav a');

// Loop through each navigation link
navLinks.forEach(function(link) {
    // Check if the link's href attribute matches the current page pathname
    if (link.pathname === currentPagePath) {
        // style background of the active link
        link.style.fontWeight = 'bolder'
    }
});

 // 3. Recommend Similar Articles
    // Get the tags from the current article's <meta name="keywords">
    const metaTagsElement = document.querySelector('meta[name="keywords"]');
    if (metaTagsElement) {
        const metaTags = metaTagsElement.getAttribute('content').split(',');

        // URL of the article index
        const articleIndexURL = 'index.html'; // Make sure this path is correct.

        // Fetch the article index file
        fetch(articleIndexURL)
            .then(response => response.text())
            .then(data => {
                // Create a temporary DOM element to parse the article index HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Get all articles from the index
                const articles = doc.querySelectorAll('#article-list li');

                // Filter articles that share at least one tag with the current article
                const recommendations = Array.from(articles).filter(article => {
                    const articleTags = article.getAttribute('data-tags').split(',').map(tag => tag.trim());
                    return articleTags.some(tag => metaTags.includes(tag));
                });

                // Display the recommended articles
                const recommendationDiv = document.getElementById("recommendation");

                if (recommendations.length > 0) {
                    recommendationDiv.innerHTML = recommendations.map(article => 
                        article.innerHTML
                    ).join(', ');
                } else {
                    recommendationDiv.innerHTML = "No similar articles found.";
                }
            })
            .catch(error => {
                console.error("Error loading article index:", error);
                document.getElementById("recommendation").innerHTML = "Error loading recommendations.";
            });
    }


})