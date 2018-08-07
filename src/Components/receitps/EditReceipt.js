import React, { Component } from 'react';
import { Consumer } from '../../Context';

import moment from 'moment';
import TextInputGroup from '../layout/TextInputGroup';

class EditRecipt extends Component {
  state = {
    balance: '',
    date: moment().format('Do MMM  YY'),
    errors: {}
  };

  componentDidMount = () => {
    const { receipt } = this.props.match.params;
    this.setState({
      balance: receipt
    });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { balance, date } = this.state;
    if (balance === '') {
      this.setState({ errors: { balance: 'Balance is required' } });
      return;
    }
    const { id } = this.props.match.params;
    const updReceipt = {
      id,
      balance,
      date
    };
    //post request

    dispatch({
      type: 'UPDATE_RECEIPT',
      payload: updReceipt
    });

    //clear state
    this.setState({
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
    const { errors, balance } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch, receipts } = value;
          console.log();
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Receipt</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="balance"
                    type="number"
                    placeholder="Enter Total "
                    name="balance"
                    value={balance}
                    onChange={this.onChangeHandler}
                    error={errors.balance}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
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
export default EditRecipt;
