

document.addEventListener('DOMContentLoaded', function() {


 // 3. Recommend Similar Articles
 const metaTagsElement = document.querySelector('meta[name="keywords"]');
 if (metaTagsElement) {
     const metaTags = metaTagsElement.getAttribute('content').split(',').map(tag => tag.trim().toLowerCase());

     // Use relative path to go up one directory level from '2024/'
     const articleIndexURL = 'index.html'; // Adjusted to the correct path

     // Fetch the article index file
     fetch(articleIndexURL)
         .then(response => response.text())
         .then(data => {
             // Create a temporary DOM element to parse the article index HTML
             const parser = new DOMParser();
             const doc = parser.parseFromString(data, 'text/html');

             // Get all articles from the index
             const articles = doc.querySelectorAll('#article-list a[data-tags]');
             
             // Get the current article's URL to prevent self-recommendation
             const currentArticleUrl = window.location.href;

             // Filter articles that share at least one tag with the current article
             const recommendations = Array.from(articles).filter(article => {
                 const articleTags = article.getAttribute('data-tags').split(',').map(tag => tag.trim().toLowerCase());
                 
                 // Check if the article's URL is the same as the current article's URL
                 const isSelfRecommendation = currentArticleUrl.includes(article.getAttribute('href'));

                 // Return true if there is a matching tag and it's not the current article
                 return articleTags.some(tag => metaTags.includes(tag)) && !isSelfRecommendation;
             });

             // Display the recommended articles
             const recommendationDiv = document.getElementById("recommendation");

             if (recommendations.length > 0) {
                console.log("recommendations", recommendations)
                // Set the font size for the recommendations
                recommendationDiv.style.fontSize = '22px'; // Set the desired font size
                recommendationDiv.innerHTML = recommendations.map(article => {
                    let articleHref = article.getAttribute('href');
                    console.log("article href before any chge", articleHref)
                    // return `<div><a href="${articleHref}">${article.textContent}</a></div>`;                     
                     // Ensure the article's URL is correctly formed
                     if (articleHref.startsWith('2024/')) {
                         // If the href already starts with 2024, remove '2024/' from the start of the URL
                        articleHref = articleHref.replace("2024/", '');
                        console.log("after chge", articleHref)
                        return `<div><a href="${articleHref}">${article.textContent}</a></div>`;
                     } else {
                         // If the href does not start with 2024, prepend it correctly
                         return `<div><a href="${articleHref}">${article.textContent}</a></div>`;
                     }
                 }).join('');
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