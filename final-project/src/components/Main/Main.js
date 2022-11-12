import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'

function Main({ 
  isLoggedIn,
  handleCardSave, 
  handleDelete,
  isMarked,
  currentId
}) {
    return (
      <div className="main">
        <div>
          <SearchForm 
            isLoggedIn={isLoggedIn}
            handleCardSave={handleCardSave}
            handleDelete={handleDelete}
            currentId={currentId}
            isMarked={isMarked} 
          />
          <About />
        </div>
      </div>
    );
  }
  
  export default Main;