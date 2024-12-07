import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

class Editor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.preview = document.getElementById('preview');
        this.titleInput = document.getElementById('post-title');
        this.tagsInput = document.getElementById('post-tags');
        this.saveButton = document.getElementById('save-draft');
        this.publishButton = document.getElementById('publish');

        this.bindEvents();
        this.loadDraft();
    }

    bindEvents() {
        this.editor.addEventListener('input', () => {
            this.updatePreview();
            this.saveDraft();
        });

        this.publishButton.addEventListener('click', () => {
            this.publishPost();
        });
    }

    updatePreview() {
        const markdown = this.editor.value;
        this.preview.innerHTML = marked(markdown);
    }

    saveDraft() {
        const draft = {
            title: this.titleInput.value,
            content: this.editor.value,
            tags: this.tagsInput.value,
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('draft', JSON.stringify(draft));
    }

    loadDraft() {
        const draft = JSON.parse(localStorage.getItem('draft'));
        if (draft) {
            this.titleInput.value = draft.title;
            this.editor.value = draft.content;
            this.tagsInput.value = draft.tags;
            this.updatePreview();
        }
    }

    publishPost() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const newPost = {
            id: Date.now(),
            title: this.titleInput.value,
            content: this.editor.value,
            tags: this.tagsInput.value.split(',').map(tag => tag.trim()),
            date: new Date().toLocaleDateString('ja-JP'),
            readingTime: Math.ceil(this.editor.value.split(' ').length / 200)
        };
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        localStorage.removeItem('draft');
        window.location.href = '/';
    }
}

new Editor(); 