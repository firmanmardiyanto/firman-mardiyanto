import React from 'react';
import './App.css';
import NewsRepositoryImpl from './data/news/NewsRepositoryImpl';
import NewsHolder from './domain/entity/news/models/NewsHolder';
import NewsUseCase from './domain/interactors/news/NewsUseCase';
import NewsViewModelImpl from './presentation/view-model/news/NewsViewModelImpl';
import NewsComponent from './presentation/view/news/NewsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = function () {
  const newsRepository = new NewsRepositoryImpl();
  const newsHolder = new NewsHolder();
  const newsUseCase = new NewsUseCase(newsRepository, newsHolder);
  const newsViewModel = new NewsViewModelImpl(newsUseCase, newsHolder);
  return (
    <div className="container-app container-fluid h-100">
      <h2 className="text-center m-3">News App</h2>
      <NewsComponent newsViewModel={newsViewModel} />
    </div>
  );
};

export default App;
