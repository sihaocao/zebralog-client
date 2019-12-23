import React, { Component } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import config from '../config';
import './AddZebralog.css';

const Required = () => (
    <span className='AddZebralog__required'>*</span>
);

class AddZebralog extends Component {
    static contextType = ZebralogsContext;

    state = {
        error: null,
        paid: 'Yes',
        type: 'Other',
    };

    handleChange = e => {
        this.setState({
            paid: e.target.value,
            type: e.target.value,
        })
    }

    handlesubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const { game_date, site, distance, paid, type, amount, notes } = e.target
        const zebralog = {
            game_date: game_date.value,
            site: site.value,
            distance: distance.value,
            paid: paid.value,
            type: type.value,
            amount: amount.value,
            notes: notes.value,
        }
        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/api/zebralogs`, {
            method: 'POST',
            body: JSON.stringify(zebralog),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
                return res.json()
            })
            .then(data => {
                game_date.value = ''
                site.value = ''
                distance.value = ''
                paid.value = ''
                type.value = ''
                amount.value = ''
                notes.value = ''
                this.context.addZebralog(data)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const { error } = this.state;
        return (
            <section className='AddZebralog'>
                <h2 className='AddZebralog__header'>Create Entry</h2>
                <form
                    className='AddZebralog__form'
                    onSubmit={this.handlesubmit}
                >
                    <div className='AddZebralog__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <div>
                        <label htmlFor='game_date'>
                            Game Date
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='date'
                            name='game_date'
                            id='game_date'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='site'>
                            Site
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='text'
                            name='site'
                            id='site'
                            placeholder='Boston High School'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='distance'>
                            Distance (miles)
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='number'
                            name='distance'
                            id='distance'
                            defaultValue='0'
                            min='0'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='paid'>
                            Paid?
                            {' '}
                            <Required />
                        </label>
                        <select 
                            value={this.state.paid} 
                            onChange={this.handleChange} 
                            name='paid'
                            id='paid'
                            required
                        >
                            <option defaultValue value='Yes'>Yes</option>
                            <option value='Pending'>Pending</option>
                            <option value='No'>No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='type'>
                            Type
                            {' '}
                            <Required />
                        </label>
                        <select
                            value={this.state.type}
                            onChange={this.handleChange}
                            name='type'
                            id='type'
                            required
                        >
                            <option defaultValue value='Other'>Other</option>
                            <option value='Subvarsity'>Subvarsity</option>
                            <option value='Tournament'>Tournament</option>
                            <option value='Varsity'>Varsity</option>
                            <option value='Youth'>Youth</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='amount'>
                            Amount ($)
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='number'
                            name='amount'
                            id='amount'
                            placeholder='0'
                            min='0'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='notes'>
                            Notes
                            {' '}
                            <Required />
                        </label>
                        <input
                            type='text'
                            name='notes'
                            id='notes'
                            defaultValue='None'
                            required
                        />
                    </div>
                    <div className='AddZebralog__buttons'>
                        <button type='button' onClick={this.handleClickCancel} className='AddZebralog__CancelButton'>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit' className='AddZebralog__AddButton'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddZebralog;