import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../Context';
import { Link } from 'react-router-dom';
import Axios from '../../../node_modules/axios';

class Contact extends Component {
  state = {
    showContactDetail: false
  };

  onShowClicked = () => {
    this.setState({
      showContactDetail: !this.state.showContactDetail
    });
  };

  //delete request
  onDeleteHandler = async (id, dispatch) => {
    dispatch({
      type: 'DELETE_CONTACT',
      payload: id
    });
    await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactDetail } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3 py-3 ">
              <h4>
                {name}
                <i
                  style={{ cursor: 'pointer' }}
                  onClick={this.onShowClicked}
                  className="fas fa-sort-down"
                />{' '}
                <i
                  onClick={this.onDeleteHandler.bind(this, id, dispatch)}
                  style={{ cursor: 'pointer' }}
                  className="float-right fas fa-times text-danger font-weight-bold"
                />
                <Link to={`/contacts/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      float: 'right',
                      marginRight: '1rem',
                      color: 'black',
                      cursor: 'pointer'
                    }}
                  />
                </Link>
              </h4>
              {showContactDetail ? (
                <ul className="list-group  ">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
export default Contact;
