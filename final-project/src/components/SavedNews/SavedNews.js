import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews({ getSavedArticles }) {
  const [savedArticles, setsavedArticles] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);
  const [orderedKeywordsString, setorderedKeywordsString] = React.useState([]);

  React.useEffect(() => {
    getSavedArticles()
      .then((res) => {
        setsavedArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getSavedArticles]);

  React.useEffect(() => {
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));

    const orderKeywords = getOrederedFrequestKeywords(savedArticles);
    let s = '';
    if (orderKeywords.length === 0) {
      s = '';
    } else if (orderKeywords.length === 1) {
      s = orderKeywords[0];
    } else if (orderKeywords.length === 2) {
      s = `${orderKeywords[0]}, ${orderKeywords[1]}`;
    } else {
      s = `${orderKeywords[0]}, ${orderKeywords[1]} and ${
        orderKeywords.length - 2
      } others`;
    }
    setorderedKeywordsString(s);
  }, [savedArticles]);

  function handleUpdateList(updatedSavedCards) {
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
          <SavedNewsHeader orderedKeywordsString={orderedKeywordsString} name={localStorage.getItem('name')} savedArticles={savedArticles} />
          <NewsCardList>
          {savedArticles.length > 0 &&
          savedArticles.map((newsCard, index) => (
            <NewsCard
              key={index}
              keyword={newsCard.keyword}
              title={newsCard.title}
              date={newsCard.publishedAt}
              source={newsCard.source.name}
              description={newsCard.description}
              link={newsCard.url}
              image={newsCard.urlToImage}
              _id={newsCard._id}
              handleUpdateList={handleUpdateList}
            />
          ))}
          </NewsCardList>
        </div>
      </CurrentUserContext.Provider>
    );
  }

  function getOrederedFrequestKeywords(savedArticles) {
    const countersObj = {};
  
    savedArticles.forEach((obj) => {
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
  
  export default SavedNews;