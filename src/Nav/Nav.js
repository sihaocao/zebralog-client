import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav(props) {
    return (
        <nav className='Nav'>
            <Link 
                to={'/'}
                className='AllEntries__Button'
            >
                All Entries
            </Link>
            {' '}
            <Link 
                to={'/add-zebralog'}
                className='AddEntry__Button'
            >
                Add Entry
            </Link>
        </nav>
    )
}