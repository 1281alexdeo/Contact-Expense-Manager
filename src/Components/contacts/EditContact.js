import React, { Component } from 'react';
import { Consumer } from '../../Context';

import axios from 'axios';
import TextInputGroup from '../layout/TextInputGroup';
class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    //get request
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    errors: {
    }
    const { name, email, phone } = this.state;
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

    const updContact = {
      name,
      email,
      phone
    };

    //put request
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({
      type: 'UPDATE_CONTACT',
      payload: res.data
    });
    //clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
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
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
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

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-warning btn-block"
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
export default EditContact;
