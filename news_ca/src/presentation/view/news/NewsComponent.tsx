import React from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  CardBody, CardFooter, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Spinner,
} from 'reactstrap';
import ArticleResult from '../../../domain/entity/news/structures/ArticleResult';
import ListArticleResult from '../../../domain/entity/news/structures/ListArticleResult';
import Helpers from '../../utils/helpers';
import NewsViewModel from '../../view-model/news/NewsViewModel';
import BaseView from '../BaseView';

export interface NewsComponentProps {
    newsViewModel: NewsViewModel;
}

export interface NewsComponentState {
    isLoading : boolean;
    isError : boolean;
    errorMessage : string;
    news?: ListArticleResult;
    selectedNews?: ArticleResult;
}

class NewsComponent extends React.Component<NewsComponentProps, NewsComponentState>
  implements BaseView {
  private newsViewModel: NewsViewModel;

  public constructor(props: NewsComponentProps) {
    super(props);

    const { newsViewModel } = props;

    this.newsViewModel = newsViewModel;
    this.state = {
      isLoading: newsViewModel.isLoading,
      isError: newsViewModel.isError,
      errorMessage: newsViewModel.errorMessage,
      news: newsViewModel.news,
      selectedNews: newsViewModel.selectedNews,
    };
  }

  componentDidMount(): void {
    this.newsViewModel.attachView(this);
  }

  componentWillUnmount(): void {
    this.newsViewModel.detachView();
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  onViewModelChanged(): void {
    this.setState({
      isLoading: this.newsViewModel.isLoading,
      isError: this.newsViewModel.isError,
      errorMessage: this.newsViewModel.errorMessage,
      news: this.newsViewModel.news,
      selectedNews: this.newsViewModel.selectedNews,
    });
  }

  centerRow(children: React.ReactNode): React.ReactNode {
    return (
      <div className="row d-flex justify-content-center align-items-center">
        {children}
      </div>
    );
  }

  public render(): React.ReactNode {
    const {
      isLoading, isError, errorMessage, news, selectedNews,
    } = this.state;

    if (selectedNews) {
      return this.centerRow(
        <Card className="mt-3 p-0" style={{ maxWidth: 400 }}>
          <CardHeader>
            <CardTitle>{selectedNews.title}</CardTitle>
            <CardSubtitle>{selectedNews.author}</CardSubtitle>
          </CardHeader>
          <CardBody>
            <CardImg key={selectedNews.title} alt={selectedNews.title} src={selectedNews.urlToImage} width="100%" />
            <CardText>{selectedNews.content}</CardText>
            <CardText>
              Published at
              {' '}
              {Helpers.dateTimeFormatToString(selectedNews.publishedAt)}
            </CardText>
            <a href={selectedNews.url} target="_blank" rel="noreferrer">Read More..</a>
          </CardBody>
          <CardFooter>

            <Button color="warning" onClick={() => this.newsViewModel.removeSelectedNews()}>Back</Button>
          </CardFooter>
        </Card>,
      );
    }
    return (
      <div>
        {isLoading && this.centerRow(<Spinner className="col-12 p-2 mt-5" color="primary" />)}
        {isError && this.centerRow(
          <div>
            <Alert className="col mt-2 mx-3" color="danger">{errorMessage}</Alert>
            <Button onClick={() => this.newsViewModel.refresh()} className="col mt-2 mx-3">Reload!</Button>
          </div>,
        )}
        {news && (
        <div className="row">
          {news.articles.map((article, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${key}_${Helpers.titleToSlugAndRemoveSpecialCharacter(article.title)}`} className="col-md-4 p-3 d-flex align-items-stretch">
              <Card>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardSubtitle>{article.author}</CardSubtitle>
                </CardHeader>
                <CardBody>
                  <CardImg key={article.title} alt={article.title} src={article.urlToImage} width="100%" />
                  <CardSubtitle className="mt-2">
                    {Helpers.dateTimeFormatToString(article.publishedAt)}
                  </CardSubtitle>
                  <CardText>
                    {article.description}
                    <br />
                    <Link onClick={() => this.newsViewModel.setSelectedNews(article)} color="primary" to="/">Read more</Link>
                  </CardText>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
        )}

      </div>
    );
  }
}

export default NewsComponent;
