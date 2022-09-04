import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNews(props) {
    return (
      <main className="saved-news">
        <SavedNewsHeader />
        <NewsCardList />
      </main>
    );
  }
  
  export default SavedNews;