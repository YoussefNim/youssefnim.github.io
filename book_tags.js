document.addEventListener('DOMContentLoaded', function() {
    // Get all tag links
    var tagLinks = document.querySelectorAll('.tags a');

    // Add click event listener to each tag link
    tagLinks.forEach(function(tagLink) {
        tagLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Reset background color for all tags
            tagLinks.forEach(function(link) {
                link.style.backgroundColor = '';
                link.style.fontWeight = ''
            });

            // Highlight selected tag with grey background
            this.style.backgroundColor = 'lightgrey';
            this.style.fontWeight = 'bold';

            var selectedTag = this.getAttribute('data-tag'); // Get the selected tag

            // Filter books based on the selected tag
            var books = document.querySelectorAll('#book-list li');
            books.forEach(function(book) {
                var bookTags = book.getAttribute('data-tags');
                if ((bookTags === null || bookTags === undefined) && selectedTag !== 'all') {
                    book.style.display = 'none'; // Hide book if it has no tags and a specific tag is selected
                } else if (selectedTag === 'all' || !bookTags || bookTags.split(' ').includes(selectedTag)) {
                    book.style.display = 'block'; // Show book if it matches the selected tag or if 'all' is selected
                } else {
                    book.style.display = 'none'; // Hide book if it doesn't match the selected tag
                }
            });
        });
    });

    // Set the "All" tag's background color to grey by default
    var allTag = document.querySelector('.tags a[data-tag="all"]');
    allTag.style.backgroundColor = 'lightgrey';
    allTag.style.fontWeight = 'bold';


});


