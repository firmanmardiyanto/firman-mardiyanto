import NewsHolder from '../../entity/news/models/NewsHolder';
import ListArticleResult from '../../entity/news/structures/ListArticleResult';
import NewsRepository from '../../repository/news/NewsRepository';

class NewsUseCase {
  private newsRepository: NewsRepository;

  private newsHolder: NewsHolder;

  constructor(newsRepository: NewsRepository, newsHolder: NewsHolder) {
    this.newsRepository = newsRepository;
    this.newsHolder = newsHolder;
  }

  public getNews() {
    this.newsHolder.onLoading();
    this.newsRepository.getNews()
      .then((news: ListArticleResult) => {
        this.newsHolder.onSuccess(news);
      })
      .catch((e) => {
        this.newsHolder.onError(e.message);
      });
    this.newsHolder.notify();
  }
}

export default NewsUseCase;
