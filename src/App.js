import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar'
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favroite from './Components/Favroite';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/movie_website' exact render={()=>(
          <>
            <Banner/> 
            <Movies/>
          </>
      )}/>
        <Route path='/movie_website/favourites' component={Favroite} />
      </Switch>
      
    </Router>

  );
}

export default App;
