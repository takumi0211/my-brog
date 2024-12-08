let articles; // グローバルスコープで articles を宣言

document.addEventListener('DOMContentLoaded', () => {
    // インデックスページ用にパスを調整
    articles = adjustPaths(true); // articles を初期化
    generateArticleCards();
    setupTagFilter();
});

function generateArticleCards(filteredArticles = null) {
    const container = document.querySelector('.posts-grid');
    const articlesToShow = filteredArticles || articles;

    container.innerHTML = articlesToShow.map(article => `
        <a href="${article.url}" class="post-card-link">
            <article class="post-card">
                <div class="post-card-thumbnail">
                    <img src="${article.thumbnail}" 
                         alt="${article.title}"
                         loading="lazy">
                </div>
                <div class="post-card-content">
                    <div class="post-card-meta">
                        <time datetime="${article.date.replace(/\./g, '-')}">${article.date}</time>
                        <span class="reading-time">${article.readTime}</span>
                    </div>
                    <h2>${article.title}</h2>
                    <p class="post-card-excerpt">
                        ${article.excerpt}
                    </p>
                    <div class="post-card-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        </a>
    `).join('');
}

function setupTagFilter() {
    const tagButtons = document.querySelectorAll('.tag-filter .tag');
    
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // アクティブなタグを更新
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const selectedTag = button.dataset.tag;
            
            // 記事をフィルタリング
            const filteredArticles = selectedTag === 'all' 
                ? articles 
                : articles.filter(article => article.tags.includes(selectedTag));
            
            // フィルタリングされた記事を表示
            generateArticleCards(filteredArticles);
        });
    });
}

// スクロール時のナビゲーションバーの挙動
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});