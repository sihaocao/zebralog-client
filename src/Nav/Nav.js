import React from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import './Nav.css';

export default function Nav(props) {
    return (
        <nav className='Nav'>
            <CSVLink
                filename={'zebralogs_db.csv'}
                className='Download__Button'
                data={props.db_values}
            >
                Download CSV
            </CSVLink>
            {' '}
            <Link 
                to={'/add-zebralog'}
                className='AddEntry__Button'
            >
                Create Entry
            </Link>
        </nav>
    )
}