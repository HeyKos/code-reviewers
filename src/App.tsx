import * as React from 'react';
import './styles/App.css';
import { DeveloperList } from './components/developer-list';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Code Review Rotation</h1>
        </header>
        <DeveloperList />
      </div>
    );
  }
}

export default App;
