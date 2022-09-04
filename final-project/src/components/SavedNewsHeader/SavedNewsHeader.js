function SavedNewsHeader() {
    return (
      <section className="saved-news__header">
        <p className="saved-news__top-title">Saved articles</p>
        <h1 className="saved-news__title">Elise, you have 5 saved articles</h1>
        <div className="saved-news__keywords_container">
          <p className="saved-news__subtitle">By keywords:
            <span className="saved-news__keywords">Nature, Yellowstone, and 2 other</span>
          </p>
        </div>
      </section>
    );
  }
  
  export default SavedNewsHeader;