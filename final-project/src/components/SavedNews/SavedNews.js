import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews({ getSavedArticles, isLoggedIn }) {
  const [savedArticles, setsavedArticles] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);
  const [orderedKeywordsString, setorderedKeywordsString] = React.useState([]);

  React.useEffect(() => {
    getSavedArticles()
      .then((res) => {
        setsavedArticles(Array.from(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getSavedArticles]);

  React.useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    const orderKeywords = getOrderedFrequestKeywords(savedArticles);
    let arr = '';
    if (orderKeywords.length === 0) {
      arr = '';
    } else if (orderKeywords.length === 1) {
      arr = orderKeywords[0];
    } else if (orderKeywords.length === 2) {
      arr = `${orderKeywords[0]}, ${orderKeywords[1]}`;
    } else {
      arr = `${orderKeywords[0]}, ${orderKeywords[1]} and ${
        orderKeywords.length - 2
      } others`;
    }
    setorderedKeywordsString(arr);
  }, [savedArticles]);

  function getOrderedFrequestKeywords(savedArticlesEl) {
    const countersObj = {};
  
    Array.from(savedArticlesEl).forEach((obj) => {
      const key = obj.keyword;
      if (countersObj[key] === undefined) {
        countersObj[key] = 1;
      } else {
        countersObj[key] += 1;
      }
    });
    let entries = Object.entries(countersObj);
    let sorted = entries.sort((a, b) => b[1] - a[1]);
    const topKeywords = [];
    sorted.forEach((arr) => {
      topKeywords.push(arr[0]);
    });
    return topKeywords;
  }

  function handleUpdateList() {
    getSavedArticles()
      .then((res) => {
        setsavedArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="saved-news">
          <SavedNewsHeader 
            orderedKeywordsString={orderedKeywordsString} 
            name={localStorage.getItem('name')} 
            savedArticles={savedArticles} 
          />
          <div className="news-card-list">
            <div className="news-card-list__container">
              {savedArticles.length > 0 &&
              savedArticles.map((newsCard, index) => (
                <NewsCard
                  key={index}
                  cardKeyword={newsCard.keyword}
                  cardTitle={newsCard.title}
                  cardDescription={newsCard.text}
                  cardUrl={newsCard.link}
                  cardUrlToImage={newsCard.image}
                  cardPublishedAt={newsCard.date}
                  cardSource={newsCard.source}
                  cardOwner={newsCard.owner}
                  _id={newsCard._id}
                  handleUpdateList={handleUpdateList}
                  isLoggedIn={isLoggedIn}
                />
              ))} 
            </div>
          </div>
        </div>
      </CurrentUserContext.Provider>
    );
  }
  
  export default SavedNews;