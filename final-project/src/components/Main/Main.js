import SearchForm from '../SearchForm/SearchForm.js'
import About from '../About/About.js'
import { useLocation, useNavigate } from 'react-router-dom';

function Main() {
  const { pathname } = useLocation();
    return (
      <main className="main">
        <div>
          <SearchForm />
          <About />
        </div>
      </main>
    );
  }
  
  export default Main;