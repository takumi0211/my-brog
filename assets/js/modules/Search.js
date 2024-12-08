export class Search {
    constructor(postList) {
        this.postList = postList;
        this.searchInput = document.getElementById('search');
        this.bindEvents();
    }

    bindEvents() {
        this.searchInput.addEventListener('input', () => {
            const query = this.searchInput.value.toLowerCase();
            const filteredPosts = this.postList.posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query)
            );
            this.postList.render(filteredPosts);
        });
    }
} 