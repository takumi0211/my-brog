document.addEventListener('DOMContentLoaded', () => {
    // 目次の生成
    generateTableOfContents();
    // スムーズスクロールの設定
    setupSmoothScroll();
});

function generateTableOfContents() {
    const toc = document.getElementById('toc');
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    const tocList = document.createElement('ul');
    let currentH2Count = 0;
    let currentH3Count = 0;

    headings.forEach(heading => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        
        li.className = heading.tagName.toLowerCase();
        
        if (heading.tagName === 'H2') {
            currentH2Count++;
            currentH3Count = 0;
            a.setAttribute('data-number', `${currentH2Count}.`);
        } else if (heading.tagName === 'H3') {
            currentH3Count++;
            a.setAttribute('data-number', `${currentH2Count}.${currentH3Count}.`);
        }
        
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent.replace(/^\d+\.\s*/, '').replace(/^\d+\.\d+\.\s*/, '');
        
        li.appendChild(a);
        tocList.appendChild(li);
    });

    toc.appendChild(tocList);
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