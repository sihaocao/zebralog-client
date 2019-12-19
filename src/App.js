import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddZebralog from './AddZebralog/AddZebralog';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import ZebralogsContext from './ZebralogsContext';

class App extends Component {
  state = {
    zebralogs: [],
    error: null,
  };

  setZebralogs = zebralogs => {
    this.setState({
      zebralogs,
      error: null,
    })
  }

  addZebralog = zebralog => {
    this.setState({
      zebralogs: [ ...this.state.zebralogs, zebralog ],
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/zebralogs`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setZebralogs)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  render() {
    const contextValue = {
      zebralogs: this.state.zebralogs,
      addZebralog: this.addZebralog,
    }
    return (
      <main className='App'>
        <h1>Zebra Logs</h1>
        <ZebralogsContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              path='/add-zebralog'
              component={AddZebralog}
            />
          </div>
        </ZebralogsContext.Provider>
      </main>
    )
  }
}

export default App;
