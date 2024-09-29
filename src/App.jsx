import React, { useState } from 'react';
import Menu from './components/Menu';
import InfiniteScroll from './components/InfiniteScroll';
import Quiz from './components/Quiz';
import SendQuestionForm from './components/SendQuestionForm';
import './App.css';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Menu navigateTo={navigateTo} />
      {currentPage === 'home' && <InfiniteScroll />}
      {currentPage === 'send-question' && <SendQuestionForm />}
      {currentPage === 'quiz' && <Quiz />}
    </div>
  );
}

export default App;
