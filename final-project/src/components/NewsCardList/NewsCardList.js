import React from "react";

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