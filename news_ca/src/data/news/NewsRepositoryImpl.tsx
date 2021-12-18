import ListArticleResult from '../../domain/entity/news/structures/ListArticleResult';
import NewsRepository from '../../domain/repository/news/NewsRepository';

class NewsRepositoryImpl implements NewsRepository {
  getNews(): Promise<ListArticleResult> {
    return new Promise((resolve, reject) => {
      fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=6e05b1b11ded4297b0dfddc018ff3778')
        .then((response) => {
          if (response.status !== 200) {
            reject(new Error('Something went wrong!'));
          } else if (response.status === 200) {
            resolve(response.json());
          } else if (response.status === 404) {
            reject(new Error('Not found!'));
          }
        })
        .catch(() => {
          reject(new Error('Something went wrong!'));
        });
    });
  }
}

export default NewsRepositoryImpl;
