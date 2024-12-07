import { PostList } from './modules/PostList.js';
import { Search } from './modules/Search.js';
import { TagFilter } from './modules/TagFilter.js';

document.addEventListener('DOMContentLoaded', () => {
    const postList = new PostList();
    const search = new Search(postList);
    const tagFilter = new TagFilter(postList);

    // 初期表示
    postList.render();
}); 