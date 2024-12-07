export class TagFilter {
    constructor(postList) {
        this.postList = postList;
        this.tagButtons = document.querySelectorAll('.tag-filter .tag');
        this.bindEvents();
    }

    bindEvents() {
        this.tagButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.tagButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const selectedTag = button.dataset.tag;
                const filteredPosts = selectedTag === 'all' 
                    ? this.postList.posts
                    : this.postList.posts.filter(post => 
                        post.tags.includes(selectedTag)
                    );
                
                this.postList.render(filteredPosts);
            });
        });
    }
} 