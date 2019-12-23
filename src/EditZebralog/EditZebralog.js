import React, { Component } from 'react';
import ZebralogsContext from '../ZebralogsContext';
import config from '../config';
import './EditZebralog.css';

const Required = () => (
    <span className='EditZebralog__required'>*</span>
)

class EditZebralog extends Component {
    static contextType = ZebralogsContext;

    state = {
        error: null,
        id: '',
        game_date: '',
        site: '',
        distance: '',
        paid: '',
        type: '',
        amount: '',
        notes: '',
    }

    componentDidMount() {
        const { zebralogId } = this.props.match.params;
        fetch(`${config.API_ENDPOINT}/api/zebralogs/${zebralogId}`, {
            method: 'GET',
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
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    game_date: responseData.game_date,
                    site: responseData.site,
                    distance: responseData.distance,
                    paid: responseData.paid,
                    type: responseData.type,
                    amount: responseData.amount,
                    notes: responseData.notes,
                })
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    handleChangeGameDate = e => {
        this.setState({ game_date: e.target.value })
    };

    handleChangeSite = e => {
        this.setState({ site: e.target.value })
    };

    handleChangeDistance = e => {
        this.setState({ distance: e.target.value })
    };

    handleChangePaid = e => {
        this.setState({ paid: e.target.value })
    };

    handleChangeType = e => {
        this.setState({ type: e.target.value })
    };

    handleChangeAmount = e => {
        this.setState({ amount: e.target.value })
    };

    handleChangeNotes = e => {
        this.setState({ notes: e.target.value })
    };

    handleSubmit = e => {
        e.preventDefault()
        const { zebralogId } = this.props.match.params;
        const { id, game_date, site, distance, paid, type, amount, notes } = this.state;
        const newZebralog = { id, game_date, site, distance, paid, type, amount, notes };
        fetch(`${config.API_ENDPOINT}/api/zebralogs/${zebralogId}`, {
            method: 'PATCH',
            body: JSON.stringify(newZebralog),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => Promise.reject(error))
                }
            })
            .then(() => {
                this.resetFields(newZebralog)
                this.context.updateZebralog(newZebralog)
                this.props.history.push('/')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            game_date: newFields.game_date || '',
            site: newFields.site || '',
            distance: newFields.distance || '',
            paid: newFields.paid || '',
            type: newFields.type || '',
            amount: newFields.amount || '',
            notes: newFields.notes || '',
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const { error, game_date, site, distance, paid, type, amount, notes } = this.state;
        return (
            <section className='EditZebralog'>
                <h2 className='EditZebralog__header'>Edit Entry</h2>
                <form
                    className='EditZebralog__form'
                    onSubmit={this.handleSubmit}
                >
                    <div className='EditZebralog__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <input
                        type='hidden'
                        name='id'
                    />
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
                            value={game_date}
                            onChange={this.handleChangeGameDate}
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
                            value={site}
                            onChange={this.handleChangeSite}
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
                            placeholder='0'
                            min='0'
                            required
                            value={distance}
                            onChange={this.handleChangeDistance}
                        />
                    </div>
                    <div>
                        <label htmlFor='paid'>
                            Paid?
                            {' '}
                            <Required />
                        </label>
                        <select 
                            name='paid'
                            id='paid'
                            required
                            value={paid} 
                            onChange={this.handleChangePaid}
                        >
                            <option value='Yes'>Yes</option>
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
                            name='type'
                            id='type'
                            required
                            value={type}
                            onChange={this.handleChangeType}
                        >
                            <option value='Other'>Other</option>
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
                            value={amount}
                            onChange={this.handleChangeAmount}
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
                            placeholder='None'
                            required
                            value={notes}
                            onChange={this.handleChangeNotes}
                        />
                    </div>
                    <div className='EditZebralog__buttons'>
                        <button type='button' onClick={this.handleClickCancel} className='EditZebralog__CancelButton'>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit' className='EditZebralog__EditButton'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditZebralog;