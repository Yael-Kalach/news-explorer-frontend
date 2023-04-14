function SavedNewsHeader({ orderedKeywordsString, name, savedArticles }) {
    return (
      <section className="saved-news__header">
        <p className="saved-news__top-title">Saved articles</p>
        <h1 className="saved-news__title">{name}, you have {savedArticles.length} saved articles.</h1>
          <p className="saved-news__subtitle">By keywords: {''}
            <span className="saved-news__keywords">{orderedKeywordsString}</span>
          </p>
      </section>
    );
  }
  
  export default SavedNewsHeader;