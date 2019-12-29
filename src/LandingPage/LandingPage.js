import React, { Component } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import './LandingPage.css';

class LandingPage extends Component {
    render() {
        let setlandingPageVisited = () => {
            ZebralogsContext.landingPageVisited = true;
        }
        return (
            // <ZebralogsContext.Consumer>
                <div className='landing-page'>
                    <h1>Welcome to Zebralogs!</h1>
                    <h3 className='app-description'>This app allows any sports official to track their game details and payment information. It includes a 'Download CSV' button for organized record keeping.</h3>
                    <button onClick={() => setlandingPageVisited()}>
                        Let's Get Started!
                    </button>
                </div>
            // </ZebralogsContext.Consumer>
        )
    }
}

export default LandingPage;