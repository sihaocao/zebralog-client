import React, { Component } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import LandingPage from './LandingPage/LandingPage';
import ZebralogList from './ZebralogList/ZebralogList';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            if (!ZebralogsContext.landingPageVisited) {
                <LandingPage />
            } else {
                <ZebralogList />
            }
        )
    }
}

export default HomePage;