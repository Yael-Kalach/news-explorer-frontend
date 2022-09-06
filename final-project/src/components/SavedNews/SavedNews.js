import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews(props) {
    return (
      <div className="saved-news">
        <SavedNewsHeader />
        <NewsCardList />
      </div>
    );
  }
  
  export default SavedNews;