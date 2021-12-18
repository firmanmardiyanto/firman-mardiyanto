interface ArticleSource {
    id: string;
    name: string;
}

interface ArticleResult {
    source: ArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export default ArticleResult;
