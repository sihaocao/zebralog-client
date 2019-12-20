import React from 'react';
import ReactDOM from 'react-dom';
import AddZebralog from './AddZebralog';

it(`renders without crashing`, () => {
    const div = document.createElement('div');
    const props = {
        history: {
            push: () => {},
        },
    }
    ReactDOM.render(<AddZebralog {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});