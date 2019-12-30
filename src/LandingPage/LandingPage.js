import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        return (
                <div className='landing-page'>
                    <h1>Welcome to Zebralogs!</h1>
                    <h3 className='app-description'>This app allows any sports official to track their game details and payment information. It includes a 'Download CSV' button for organized record keeping.</h3>
                    <button onClick={this.props.exitLandingPage}>
                        Let's Get Started!
                    </button>
                </div>
        )
    }
}

export default LandingPage;