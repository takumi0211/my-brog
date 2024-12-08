let articles; // グローバルスコープで articles を宣言

document.addEventListener('DOMContentLoaded', () => {
    // 記事ページ用にパスを調整
    articles = adjustPaths(false); // articles を初期化
    generateTableOfContents();
    setupSmoothScroll();
    generateRelatedArticles();
});

function generateTableOfContents() {
    const toc = document.getElementById('toc');
    // article-content内のh2, h3のみを取得し、grid-cardクラスを持つ要素は除外
    const headings = document.querySelectorAll('.article-content h2:not(.grid-card *), .article-content h3:not(.grid-card *)');
    const tocList = document.createElement('ul');
    let currentH2Item = null;
    let currentH2Count = 0;
    let currentH3Count = 0;

    headings.forEach(heading => {
        // 関連記事セクションは除外
        if (heading.closest('.related-section')) return;
        
        // 見出しにIDがない場合は生成
        if (!heading.id) {
            heading.id = heading.textContent
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        
        if (heading.tagName === 'H2') {
            currentH2Count++;
            currentH3Count = 0;
            currentH2Item = li;
            li.className = 'h2';
            a.textContent = heading.textContent;
            tocList.appendChild(li);
        } else if (heading.tagName === 'H3') {
            currentH3Count++;
            li.className = 'h3';
            a.textContent = heading.textContent;
            
            // H3のリストを格納するulを作成
            if (!currentH2Item.querySelector('ul')) {
                const subList = document.createElement('ul');
                currentH2Item.appendChild(subList);
            }
            currentH2Item.querySelector('ul').appendChild(li);
        }
        
        li.appendChild(a);
    });

    toc.appendChild(tocList);

    // スムーズスクロールの設定
    document.querySelectorAll('.table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                const headerOffset = 100; // ヘッダーの高さ分を調整
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function generateRelatedArticles() {
    // 現在の記事のパスを取得
    const currentPath = window.location.pathname.split('/').pop();
    const currentArticle = articles.find(article => article.url.endsWith(currentPath));
    
    if (!currentArticle) {
        console.log('Current article not found:', currentPath); // デバッグ用
        return;
    }

    // 関連記事を見つける（タグが1つでも一致する記事）
    const relatedArticles = articles.filter(article => 
        article.id !== currentArticle.id && // 現在の記事を除外
        article.tags.some(tag => currentArticle.tags.includes(tag)) // タグが1つでも一致
    );

    console.log('Related articles found:', relatedArticles.length); // デバッグ用

    // 関連記事セクションを生成
    const container = document.querySelector('.grid-container');
    if (!container) {
        console.log('Container not found'); // デバッグ用
        return;
    }

    if (relatedArticles.length === 0) {
        container.innerHTML = '<p class="no-related">関連する記事が見つかりませんでした。</p>';
        return;
    }

    container.innerHTML = relatedArticles.map(article => `
        <a href="${article.url}" class="grid-card">
            <div class="grid-card-content">
                <div class="grid-card-text">
                    <div class="grid-card-header">
                        <span class="grid-card-date">${article.date}</span>
                        <span class="grid-card-readtime">${article.readTime}</span>
                    </div>
                    <h3 class="grid-card-title">${article.title}</h3>
                    <p class="grid-card-excerpt">${article.excerpt}</p>
                    <div class="grid-card-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="grid-card-image">
                    <img src="${article.thumbnail}" alt="${article.title}のサムネイル画像">
                </div>
            </div>
        </a>
    `).join('');
} 