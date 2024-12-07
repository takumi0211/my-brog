document.addEventListener('DOMContentLoaded', () => {
    // 検索機能
    const searchInput = document.getElementById('search');
    const posts = document.querySelectorAll('.post-card-link');

    // タグフィルター機能
    const tagButtons = document.querySelectorAll('.tag-filter .tag');
    let activeTag = 'all';

    // 検索とフィルターの組み合わせ関数
    function filterPosts() {
        const searchQuery = searchInput.value.toLowerCase();

        posts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-card-excerpt').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.post-card-tags .tag'))
                .map(tag => tag.textContent.toLowerCase());

            const matchesSearch = title.includes(searchQuery) || 
                                excerpt.includes(searchQuery);
            
            const matchesTag = activeTag === 'all' || 
                             tags.includes(activeTag.toLowerCase());

            post.style.display = matchesSearch && matchesTag ? 'block' : 'none';
        });
    }

    // 検索イベント
    searchInput.addEventListener('input', filterPosts);

    // タグフィルターイベント
    tagButtons.forEach(button => {
        button.addEventListener('click', () => {
            // アクティブなタグの更新
            tagButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // フィルタリング
            activeTag = button.dataset.tag;
            filterPosts();
        });
    });

   // Iframelyスクリプトの読み込み確認
    const iframelyScript = document.querySelector('script[src="//iframely.net/embed.js"]');

    if (iframelyScript) {
        iframelyScript.onload = () => {
            console.log('Iframely script loaded successfully.');
        };

        iframelyScript.onerror = () => {
            console.error('Failed to load Iframely script.');
        };
    } else {
        console.error('Iframely script tag not found.');
    }
});

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