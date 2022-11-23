import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'

function Main({ 
  isLoggedIn,
  handleSaveArticle, 
  handleDelete,
  token,
  formatDate
}) {
    return (
      <div className="main">
        <div>
          <SearchForm 
            isLoggedIn={isLoggedIn}
            handleSaveArticle={handleSaveArticle}
            handleDelete={handleDelete}
            token={token}
            formatDate={formatDate}
          />
          <About />
        </div>
      </div>
    );
  }
  
  export default Main;