import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Contacts from './Components/contacts/Contacts';
import Header from './Components/layout/Header';
import AddContact from './Components/contacts/AddContact';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from './Context';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import EditContact from './Components/contacts/EditContact';
import EditReceipt from './Components/receitps/EditReceipt';
class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contacts/add" component={AddContact} />
                <Route
                  exact
                  path="/contacts/edit/:id"
                  component={EditContact}
                />
                <Route
                  exact
                  path="/receipt/edit/:receipt&:id"
                  component={EditReceipt}
                />
                />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
