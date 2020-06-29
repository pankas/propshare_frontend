import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import BaseRouter from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  render(){
    return(<div>
      <Router>
        <BaseRouter/>
      </Router>
    </div>
    )
  }
}

export default App;