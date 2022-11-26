import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'

function Main({ 
  isLoggedIn,
  handleSaveArticle, 
  handleDelete,
  handleLoginPopupClick,
  formatDate
}) {
    return (
      <div className="main">
        <div>
          <SearchForm 
            isLoggedIn={isLoggedIn}
            handleSaveArticle={handleSaveArticle}
            handleDelete={handleDelete}
            handleLoginPopupClick={handleLoginPopupClick}
            formatDate={formatDate}
          />
          <About />
        </div>
      </div>
    );
  }
  
  export default Main;