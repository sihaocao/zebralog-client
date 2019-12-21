import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddZebralog from './AddZebralog/AddZebralog';
import EditZebralog from './EditZebralog/EditZebralog';
import ZebralogList from './ZebralogList/ZebralogList';
import ZebralogsContext from './ZebralogsContext';
import Nav from './Nav/Nav';
import config from './config';
import SiteLogo from './Zebralog-logo.png';
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
      zebralogs: [ zebralog, ...this.state.zebralogs ],
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

  updateZebralog = updatedZebralog => {
    this.setState({
      zebralogs: this.state.zebralogs.map(zl =>
        (zl.id !== updatedZebralog.id) ? zl : updatedZebralog  
      )
    })
  }

  render() {
    const contextValue = {
      zebralogs: this.state.zebralogs,
      addZebralog: this.addZebralog,
      deleteZebralog: this.deleteZebralog,
      updateZebralog: this.updateZebralog,
    }
    return (
      <main className='App'>
        <div className='App__Logo__Title'>
          <img className='App__Logo' src={SiteLogo} alt='site logo of zebra emblem'/>
          <h1 className='App__Title'>ZebraLogs</h1>
        </div>
        <div className='Navigation__Buttons'>
            <Nav db_values={this.state.zebralogs} />
        </div>
        <ZebralogsContext.Provider value={contextValue}>
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
            <Route
              path='/edit/:zebralogId'
              component={EditZebralog}
            />
          </div>
        </ZebralogsContext.Provider>
      </main>
    )
  }
}

export default App;
