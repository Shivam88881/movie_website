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
        <Route exact  path='/' component={Movies}/>
        <Route path='/favourites' component={Favroite} />
      </Switch>
      {/* <Banner/> */}
      {/* <Movies/> name="udai" */}
      {/* <Favourite/> */}
    </Router>

  );
}

export default App;
