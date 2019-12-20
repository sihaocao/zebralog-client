import React from 'react';
import ReactDOM from 'react-dom';
import EditZebralog from './EditZebralog';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        match: { params: {} },
        history: {
            push: () => {}
        },
    }
    ReactDOM.render(<EditZebralog {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
});