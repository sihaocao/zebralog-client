import React, { Component } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import ZebralogEntry from '../ZebralogEntry/ZebralogEntry';
import './ZebralogList.css';

class ZebralogList extends Component {
    static defaultProps = {
        zebralogs: []
    };

    static contextType = ZebralogsContext;

    render() {
        const { zebralogs } = this.context
        return (
            <section className='ZebralogList'>
                <ul className='Zebralog__ListHeaders'>
                    <li className='ZebralogList__game_date'>Game Date</li>
                    <li className='ZebralogList__site'>Site</li>
                    <li className='ZebralogList__distance'>Distance (miles)</li>
                    <li className='ZebralogList__paid'>Paid?</li>
                    <li className='ZebralogList__type'>Type</li>
                    <li className='ZebralogList__amount'>Amount ($)</li>
                    <li className='ZebralogList__notes'>Notes</li>
                    <li className='ZebralogList__Actions'>Actions</li>
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
        )
    }
}

export default ZebralogList;