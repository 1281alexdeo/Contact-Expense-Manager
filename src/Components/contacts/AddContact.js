import React, { Component } from 'react';
import { Consumer } from '../../Context';

import moment from 'moment';
import axios from 'axios';
import TextInputGroup from '../layout/TextInputGroup';
class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    balance: '',
    date: moment().format('Do MMM  YY'),
    errors: {}
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    errors: {
    }
    const { name, email, phone, balance, date, errors } = this.state;
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }
    if (balance === '') {
      this.setState({ errors: { balance: 'Balance is required' } });
      return;
    }
    const newContact = {
      name,
      email,
      phone,
      balance,
      date
    };
    //post request
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      newContact
    );
    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    });

    //clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      balance: '',
      errors: {}
    });
    //redirect to home
    this.props.history.push('/');
  };
  onChangeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  render() {
    const { name, email, phone, balance, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="name"
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={name}
                    onChange={this.onChangeHandler}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="email"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    value={email}
                    onChange={this.onChangeHandler}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="phone"
                    type="text"
                    placeholder="Enter Phone"
                    name="phone"
                    value={phone}
                    onChange={this.onChangeHandler}
                    error={errors.phone}
                  />

                  <TextInputGroup
                    label="balance"
                    type="number"
                    placeholder="Enter Total "
                    name="balance"
                    value={balance}
                    onChange={this.onChangeHandler}
                    error={errors.balance}
                  />
                  {/* <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      className="form-control form-control-lg"
                      placeholder="Enter Phone"
                      name="phone"
                      value={phone}
                      onChange={this.onChangeHandler}
                    />
                  </div> */}

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-success btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default AddContact;
