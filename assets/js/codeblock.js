document.addEventListener('DOMContentLoaded', () => {
    // コードブロックを全て取得
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
        // コンテナを作成
        const container = document.createElement('div');
        container.className = 'code-block-container';
        
        // ヘッダーを作成
        const header = document.createElement('div');
        header.className = 'code-block-header';
        
        // タイトルを設定
        const title = document.createElement('span');
        title.className = 'code-block-title';
        title.textContent = `Code Block ${index + 1}`;
        
        // コピーボタンを作成
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        copyButton.onclick = () => {
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        };
        
        // コードブロックのコンテンツ用のコンテナ
        const content = document.createElement('div');
        content.className = 'code-block-content';
        
        // 要素を組み立て
        header.appendChild(title);
        header.appendChild(copyButton);
        container.appendChild(header);
        content.appendChild(codeBlock.cloneNode(true));
        container.appendChild(content);
        
        // 元のコードブロックを新しい構造に置き換え
        codeBlock.parentElement.replaceWith(container);
    });
}); 