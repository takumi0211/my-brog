export class PostList {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('posts')) || [];
        this.template = document.getElementById('post-card-template');
        this.container = document.querySelector('.posts-grid');
    }

    render(filteredPosts = null) {
        const postsToRender = filteredPosts || this.posts;
        this.container.innerHTML = '';

        postsToRender.forEach(post => {
            const card = this.createPostCard(post);
            this.container.appendChild(card);
        });
    }

    createPostCard(post) {
        const clone = this.template.content.cloneNode(true);
        
        clone.querySelector('time').textContent = post.date;
        clone.querySelector('.reading-time').textContent = `${post.readingTime}分`;
        clone.querySelector('h2').textContent = post.title;
        clone.querySelector('.post-card-excerpt').textContent = post.excerpt;

        const tagsContainer = clone.querySelector('.post-card-tags');
        post.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        return clone;
    }
} 