import React, { Component, Fragment } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import ZebralogEntry from '../ZebralogEntry/ZebralogEntry';
import './ZebralogList.css';

class ZebralogList extends Component {
    static defaultProps = {
        zebralogs: []
    };

    static contextType = ZebralogsContext;

    state = {
        // headers array used for list headers
        headers: [
            { id: 'game_date', description: 'Game Date', cn: 'ZebralogList__game_date' },
            { id: 'site', description: 'Site', cn: 'ZebralogList__site' },
            { id: 'distance', description: 'Distance (miles)', cn: 'ZebralogList__distance'},
            { id: 'paid', description: 'Paid?', cn: 'ZebralogList__paid' },
            { id: 'type', description: 'Type', cn: 'ZebralogList__type' },
            { id: 'amount', description: 'Amount ($)', cn: 'ZebralogList__amount' },
            { id: 'notes', description: 'Notes', cn: 'ZebralogList__notes' },
            { id: 'actions', description: 'Actions', cn: 'ZebralogList__Actions' },
        ],
        // site used for 'search by site' filter functionality
        site: '',
    }

    renderHeaders() {
        return this.state.headers.map(header => {
            const { id, description, cn } = header
                return (
                    <li key={id} className={cn}>{description}</li>
                )
        })
    }

    onChange = e => {
        const { onChange } = this.context
        onChange("text");
    }

    render() {
        const { zebralogs } = this.context
        return (
            <Fragment>
                <form className='ZebralogList__FormGroup'>
                    <label htmlFor='search_for'>
                        Search by:
                        {' '}
                    </label>
                    <input
                        type='text'
                        className='Zebralogs__Site__SearchBox'
                        placeholder='site description'
                        name='site'
                        value={this.state.site}
                        onChange={this.onChange}
                    />
                </form>
                <section className='ZebralogList'>
                    <ul className='Zebralog__ListHeaders'>
                        {this.renderHeaders()}
                    </ul>
                    <ul className='ZebralogList__List'>
                        {zebralogs.map(zebralog =>
                            <ZebralogEntry
                                key={zebralog.id}
                                {...zebralog}
                            />
                        )}
                    </ul>
                </section>
            </Fragment>
        )
    }
}

export default ZebralogList;