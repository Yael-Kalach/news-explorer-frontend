import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ children }) {
    return (
      <div className="news-card-list">
        <div className="news-card-list__container">
          {children}
        </div>
      </div>      
    );
  }
  
  export default NewsCardList;