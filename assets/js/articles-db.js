const articlesDB = [
    {
        id: 1,
        title: "人生死あり、修短は命なり",
        excerpt: "今回は「名探偵コナン」のアニメを見ていた時に気になった言葉について深掘りしていくことにします。",
        date: "2024.08.16",
        readTime: "10分",
        tags: ["哲学", "コナン"],
        thumbnail: "/assets/images/article1/人生死あり_サムネ.jpeg",
        url: "/posts/article1.html"
    },
    {
        id: 2,
        title: "OpenAI o1-miniで素因数分解ゲームを作る。-AIとの付き合い方-",
        excerpt: "今日は9/12にリリースされて今話題のOpenAIのo1を用いて、ゲームを作った話をしたいと思います。",
        date: "2024.09.18",
        readTime: "3分",
        tags: ["AI", "Programming"],
        thumbnail: "/assets/images/article2/サムネ.jpeg",
        url: "/posts/article2.html"
    },
    {
        id: 3,
        title: "ChatGPTの中身はコナン君!? -LLMの仕組みをアナロジーする-",
        excerpt: "今回はChatGPTの仕組みについて考えていきたいと思います。",
        date: "2024.11.11",
        readTime: "10分",
        tags: ["AI", "コナン", "Programming"],
        thumbnail: "/assets/images/article3/サムネ3.jpeg",
        url: "/posts/article3.html"
    },
    {
        id: 4,
        title: "『名探偵コナン』から考えるイマヌエル・カントの道徳",
        excerpt: "--大部分はカントについてなので、名探偵コナンを知らない人でも十分楽しめると思います--",
        date: "2024.09.16",
        readTime: "10分",
        tags: ["哲学", "コナン"],
        thumbnail: "/assets/images/article4/サムネ_4.jpeg",
        url: "/posts/article4.html"
    }
];

// パスの調整関数を修正
function adjustPaths(isIndex = false) {
    return articlesDB.map(article => {
        if (isIndex) {
            // index.html用のパス調整
            return {
                ...article,
                thumbnail: article.thumbnail.substring(1),
                url: article.url.substring(1)
            };
        } else {
            // 記事ページ用のパス調整
            return {
                ...article,
                thumbnail: '..' + article.thumbnail,
                url: '..' + article.url
            };
        }
    });
} 