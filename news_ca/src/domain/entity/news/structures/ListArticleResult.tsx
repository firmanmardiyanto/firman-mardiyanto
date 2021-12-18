import ArticleResult from './ArticleResult';

interface ListArticleResult {
    status: string;
    totalResults: number;
    articles: ArticleResult[];
}

export default ListArticleResult;
