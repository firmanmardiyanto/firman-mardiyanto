import ListArticleResult from '../../entity/news/structures/ListArticleResult';

interface NewsRepository {
    getNews(): Promise<ListArticleResult>;
}

export default NewsRepository;
