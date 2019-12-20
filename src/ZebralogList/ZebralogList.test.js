import React from 'react';
import ReactDOM from 'react-dom';
import ZebralogList from './ZebralogList';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ZebralogList />, div);
    ReactDOM.unmountComponentAtNode(div);
});