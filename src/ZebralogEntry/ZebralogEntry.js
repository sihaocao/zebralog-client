import React from 'react';
// import { Link } from 'react-router-dom';
import ZebralogsContext from '../ZebralogsContext';
import config from '../config';
import './ZebralogEntry.css';

function deleteZebralogRequest(zebralogID, cb) {
    fetch(`${config.API_ENDPOINT}/api/zebralogs/${zebralogID}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => Promise.reject(error))
            }
        })
        .then(data => {
            cb(zebralogID)
        })
        .catch(error => {
            console.error(error)
        })
}

export default function ZebralogEntry(props) {
    return (
        <ZebralogsContext.Consumer>
            {(context) => (
                <li className='ZebralogEntry'>
                    <div className='ZebralogEntry__game_date'>
                        {props.game_date}
                    </div>
                    <div className='ZebralogEntry__site'>
                        {props.site}
                    </div>
                    <div className='ZebralogEntry__distance'>
                        {props.distance}
                    </div>
                    <div className='ZebralogEntry__paid'>
                        {props.paid}
                    </div>
                    <div className='ZebralogEntry__type'>
                        {props.type}
                    </div>
                    <div className='ZebralogEntry__amount'>
                        ${props.amount}
                    </div>
                    <div className='ZebralogEntry__notes'>
                        {props.notes}
                    </div>
                    <div className='ZebralogEntry__buttons'>
                        {/* <Link to={`/edit/${props.id}`}>
                            Edit
                        </Link>
                        {' '} */}
                        <button onClick={() => deleteZebralogRequest(props.id, context.deleteZebralog)}>
                            Delete
                        </button>
                    </div>
                </li>
            )}
        </ZebralogsContext.Consumer>
    )
}

ZebralogEntry.defaultProps = {
    onClickDelete: () => {},
}