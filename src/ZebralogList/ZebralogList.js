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
        const { onChange } = this.context;
        onChange(e.target.value);
    }

    render() {
        const { filteredZebralogs } = this.context;
        return (
            <Fragment>
                <form className='ZebralogList__FormGroup'>
                    <label htmlFor='search_for'>
                        Search for:
                        {' '}
                    </label>
                    <input
                        type='text'
                        className='Zebralogs__Site__SearchBox'
                        placeholder='Site description...'
                        name='site'
                        onChange={this.onChange}
                    />
                    <p className='Zebralogs__Note'>* Most recent entry will be added to the top of the list *</p>
                </form>
                <section className='ZebralogList'>
                    <ul className='Zebralog__ListHeaders'>
                        {this.renderHeaders()}
                    </ul>
                    <ul className='ZebralogList__List'>
                        {filteredZebralogs.map(filteredZebralog =>
                            <ZebralogEntry
                                key={filteredZebralog.id}
                                {...filteredZebralog}
                            />
                        )}
                    </ul>
                </section>
                <p className='ZebralogsList__Copyright'>Copyright &copy; 2020 - <a href='https://sihaocao.github.io' target='_blank' rel='noopener noreferrer'>Sihao Cao</a></p>
            </Fragment>
        )
    }
}

export default ZebralogList;