import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';
import moment from 'moment';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'DELETE_RECEIPT':
      return {
        receipts: state.receipts.filter(
          receipt => receipt.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        receipts: [action.payload, ...state.receipts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    case 'UPDATE_RECEIPT':
      return {
        ...state,
        receipts: state.receipts.map(
          receipt =>
            receipt.id === action.payload.id
              ? (receipt = action.payload)
              : receipt
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    receipts: [
      {
        id: uuid(),
        date: moment().format('Do MMM YY'),
        balance: 10
      },
      {
        id: uuid(),
        date: moment().format('Do MMM YY'),
        balance: 190
      },
      {
        id: uuid(),
        date: moment().format('Do MMM YY'),
        balance: 70
      }
    ],
    taxi: 4,
    deposit: 200,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({
      contacts: res.data
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
