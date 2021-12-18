import ArticleResult from '../../../domain/entity/news/structures/ArticleResult';
import ListArticleResult from '../../../domain/entity/news/structures/ListArticleResult';
import BaseViewModel from '../BaseViewModel';

interface NewsViewModel extends BaseViewModel {
    isLoading: boolean;
    news?: ListArticleResult;
    isError: boolean;
    errorMessage: string;
    selectedNews?: ArticleResult;
    refresh(): void;
    setSelectedNews(news: ArticleResult): void;
    removeSelectedNews(): void;
}

export default NewsViewModel;
