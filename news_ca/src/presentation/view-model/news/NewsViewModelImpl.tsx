import NewsHolder from '../../../domain/entity/news/models/NewsHolder';
import NewsListener from '../../../domain/entity/news/models/NewsListener';
import ArticleResult from '../../../domain/entity/news/structures/ArticleResult';
import ListArticleResult from '../../../domain/entity/news/structures/ListArticleResult';
import NewsUseCase from '../../../domain/interactors/news/NewsUseCase';
import BaseView from '../../view/BaseView';
import NewsViewModel from './NewsViewModel';

class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public isLoading: boolean;

  public news?: ListArticleResult;

  public isError: boolean;

  public errorMessage: string;

  public selectedNews? : ArticleResult;

  private baseView?: BaseView;

  private newsHolder: NewsHolder;

  private newsUseCase: NewsUseCase;

  constructor(newsUseCase: NewsUseCase, newsHolder: NewsHolder) {
    this.newsUseCase = newsUseCase;
    this.newsHolder = newsHolder;
    this.newsHolder.setNewsListener(this);
    this.isLoading = false;
    this.news = undefined;
    this.isError = false;
    this.errorMessage = '';
    this.selectedNews = undefined;
    this.init();
  }

  setSelectedNews(news: ArticleResult): void {
    this.selectedNews = news;
    this.notifyViewAboutChanges();
  }

  removeSelectedNews(): void {
    this.selectedNews = undefined;
    this.notifyViewAboutChanges();
  }

  public init(): void {
    this.newsUseCase.getNews();
    this.notifyViewAboutChanges();
  }

  public refresh(): void {
    this.isLoading = false;
    this.news = undefined;
    this.isError = false;
    this.errorMessage = '';
    this.init();
    this.onNewsChange();
  }

  onNewsChange(): void {
    this.isLoading = this.newsHolder.isLoading;
    this.news = this.newsHolder.news;
    this.isError = this.newsHolder.isError;
    this.errorMessage = this.newsHolder.errorMessage;
    this.notifyViewAboutChanges();
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };

  public getSelectedNews(): ArticleResult {
    return this.selectedNews!;
  }
}

export default NewsViewModelImpl;
