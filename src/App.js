import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddZebralog from './AddZebralog/AddZebralog';
// import EditZebralog from './EditZebralog/EditZebralog';
import ZebralogList from './ZebralogList/ZebralogList';
import ZebralogsContext from './ZebralogsContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

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

  deleteZebralog = zebralogId => {
    const newZebralogs = this.state.zebralogs.filter(zl =>
      zl.id !== zebralogId
    )
    this.setState({
      zebralogs: newZebralogs
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
      deleteZebralog: this.deleteZebralog,
    }
    return (
      <main className='App'>
        <h1 className='App__Title'>Zebra Logs</h1>
        <ZebralogsContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              exact
              path='/'
              component={ZebralogList}
            />
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
