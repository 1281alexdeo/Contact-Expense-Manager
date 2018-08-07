import React, { Component } from 'react';
import Contact from './Contact';
import { Link } from 'react-router-dom';
import { Consumer } from '../../Context'; //import consumer

class Contacts extends Component {
  getTotalExpense = contacts => {
    const taxi = 4;
    return contacts.reduce((prev, contact) => prev + contact.balance + taxi, 0);
  };

  totalCredit = contacts => {
    return this.getTotalExpense(contacts) / 2;
  };

  netBalance = (deposit, contacts) => {
    let netBalance = this.getTotalExpense(contacts) / 2;
    return deposit - netBalance;
  };

  onDeleteReceipt = (id, dispatch) => {
    dispatch({
      type: 'DELETE_RECEIPT',
      payload: id
    });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts, deposit, receipts, dispatch } = value;
          const { id } = value.receipts;
          return (
            <div>
              <h3 className="mb-4 bg-primary p-2 text-light">
                Total Expense:{`$${this.getTotalExpense(receipts)}.00`}
              </h3>
              <h3 className="mb-4 p-2 text-dark bg-light">
                {' '}
                Total Credit: {`$${this.totalCredit(receipts)}.00`}
              </h3>
              <h3
                className={
                  this.netBalance(deposit, receipts) < 0
                    ? 'mb-4 bg-light p-2 text-danger'
                    : 'mb-4 bg-light p-2 text-success'
                }
              >
                {' '}
                Deposit Balance:{`$${this.netBalance(deposit, receipts)}.00`}
              </h3>
              <table className="table table-sm table-hover table-dark table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">Recipt Id</th>
                    <th scope="col">Total Cost</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((receipt, index) => (
                    <React.Fragment key={receipt.id}>
                      <tr>
                        <td scope="row">{index + 1}</td>
                        <td scope="row">{`$${receipt.balance}.00`}</td>
                        <td scope="row">{`$${receipt.balance / 2}.00`}</td>
                        <td scope="row">{receipt.date}</td>
                        <td scope="row">
                          <Link
                            to={`/receipt/edit/${receipt.balance}&${
                              receipt.id
                            }`}
                          >
                            <i
                              className="fas fa-pencil-alt"
                              style={{
                                float: 'left',
                                marginRight: '2rem',
                                color: 'white',
                                cursor: 'pointer'
                              }}
                            />
                          </Link>
                          <i
                            onClick={this.onDeleteReceipt.bind(
                              this,
                              receipt.id,
                              dispatch
                            )}
                            className="fas fa-times"
                          />{' '}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <tr />
                </tbody>
              </table>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default Contacts;
