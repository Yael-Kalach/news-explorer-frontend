import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'

function Main({ isLoggedIn }) {
    return (
      <div className="main">
        <div>
          <SearchForm isLoggedIn={isLoggedIn} />
          <About />
        </div>
      </div>
    );
  }
  
  export default Main;