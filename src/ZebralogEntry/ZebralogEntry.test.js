import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ZebralogEntry from './ZebralogEntry';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
        id: '123',
        game_date: '2019-10-01',
        distance: '20',
        paid: 'Yes',
        type: 'Varsity',
        amount: '91',
        notes: 'None',
        onClickDelete: () => {},
    }
    ReactDOM.render(
        <BrowserRouter>
            <ZebralogEntry {...props} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});