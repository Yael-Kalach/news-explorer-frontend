import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  return (
    <CurrentUserContext.Provider>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
