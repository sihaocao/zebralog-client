import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
                <div className='LandingPage'>
                    <h1 className='App__Title'>Hello there:</h1>
                    <h3 className='App__Description'>Zebralogs allows any sports official to track one's game information. You can also search and export the list of contest entries for organized record keeping.</h3>
                    <button className='LandingPage__Button' onClick={this.props.exitLandingPage}>
                        Let's Get Started!
                    </button>
                    <p className='LandingPage__Copyright'>Copyright &copy; 2020 - <a href='https://sihaocao.github.io' target='_blank' rel='noopener noreferrer'>Sihao Cao</a></p>
                </div>
        )
    }
}

export default LandingPage;