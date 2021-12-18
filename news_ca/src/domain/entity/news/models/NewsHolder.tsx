import ListArticleResult from '../structures/ListArticleResult';
import NewsListener from './NewsListener';

class NewsHolder {
  public newsListener?: NewsListener;

  public isLoading: boolean = false;

  public news?: ListArticleResult;

  public isError: boolean = false;

  public errorMessage: string = '';

  public onLoading() {
    this.isLoading = true;
    this.isError = false;
    this.notify();
  }

  public onSuccess(news: ListArticleResult) {
    this.isLoading = false;
    this.isError = false;
    this.news = news;
    this.notify();
  }

  public onError(message: string) {
    this.isLoading = false;
    this.isError = true;
    this.errorMessage = message;
    this.notify();
  }

  public setNewsListener(newsListener: NewsListener) {
    this.newsListener = newsListener;
  }

  public notify() {
    if (this.newsListener) {
      this.newsListener.onNewsChange();
    }
  }
}

export default NewsHolder;
