import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'

function Main({ resultSearch, handleShowMore }) {
    return (
      <div className="main">
        <div>
          <SearchForm resultSearch={resultSearch} handleShowMore={handleShowMore} />
          <About />
        </div>
      </div>
    );
  }
  
  export default Main;