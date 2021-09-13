import React from 'react';
import './App.css';
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import './index.css';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import SearchContent from './components/SearchContent/SearchContent';
import Content from './components/Content/Content';
import NoMatch from './NoMatch';
class App extends React.Component {
  render() { 
    return(
      <Router>
        <Switch>
          <Route path="/" exact component={Content} />
          <Route path="/home" exact component={Content} />
          <Route path="/search" exact component={SearchContent} />
          <Route path="/details/:id">
               <PokemonDetails />
           </Route>
           <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
