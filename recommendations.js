document.addEventListener("DOMContentLoaded", function () {
  // 3. Recommend Similar Articles
  const metaTagsElement = document.querySelector('meta[name="keywords"]');
  if (metaTagsElement) {
    const metaTags = metaTagsElement
      .getAttribute("content")
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    // Use relative path to go up one directory level from '2024/'
    const articleIndexURL = "../index.html"; // Adjusted to the correct path

    // Fetch the article index file
    fetch(articleIndexURL)
      .then((response) => response.text())
      .then((data) => {
        // Create a temporary DOM element to parse the article index HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        // Get all articles from the index
        const articles = doc.querySelectorAll("#article-list a[data-tags]");

        // Get the current article's URL to prevent self-recommendation
        const currentArticleUrl = window.location.href.split("/").pop(); // This gives just the filename (e.g., masculinity-conservatism-west.html)

        // Extract the current article's year from its URL
        // const currentYear = currentArticleUrl.split('/').slice(-2, -1)[0]; // Assumes URL is structured like '.../2024/article-title.html'

        // Filter articles that share at least one tag with the current article
        const recommendations = Array.from(articles).filter((article) => {
          const articleTags = article
            .getAttribute("data-tags")
            .split(",")
            .map((tag) => tag.trim().toLowerCase());

          // Check if the article's filename is the same as the current article's filename
          const articleHref = article.getAttribute("href").split("/").pop();
          const isSelfRecommendation = currentArticleUrl == articleHref;

          // Return true if there is a matching tag and it's not the current article
          return (
            articleTags.some((tag) => metaTags.includes(tag)) &&
            !isSelfRecommendation
          );
        });

        // Display the recommended articles
        const recommendationDiv = document.getElementById("recommendation");

        if (recommendations.length > 0) {
          console.log("recommendations", recommendations);
          // Set the font size for the recommendations
          recommendationDiv.style.fontSize = "20px"; // Set the desired font size

          recommendationDiv.innerHTML = recommendations
            .map((article) => {
              let articleHref = article.getAttribute("href");
              console.log("article href before any chge", articleHref);
              return `<div>• <a href="../${articleHref}">${article.textContent}</a></div>`;
            })
            .join("");
        } else {
          recommendationDiv.innerHTML = `No similar articles found. <a href="../index.html">Check the index</a>`;
        }
      })
      .catch((error) => {
        console.error("Error loading article index:", error);
        document.getElementById("recommendation").innerHTML =
          "Error loading recommendations.";
      });
  }
});
