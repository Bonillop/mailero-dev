import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from '../Payments/Payments';

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        )
      default:
        return ([
          <li key="1"><Payments /></li>,
          <li key="2" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="3"><a href="/api/logout">Logout</a></li>
        ]
        )
    }
  }

  render() {
    console.log(this.props.auth);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">Mailero</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><a href="#">Login with Google</a></li> */}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// This function maps the state in the store to the props of the component
function mapStateToProps(state) {
  return { auth: state.auth }
}

// Can be done this way using ES6 syntax
// function mapStateToProps({ auth }) { // destructuring
//   return { auth } // same key name assignment
// }


export default connect(mapStateToProps)(Header);