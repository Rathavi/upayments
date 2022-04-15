import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


class Register extends React.Component {
  render() {
  return <section id="register" className="register d-flex align-items-center">
          <div className="container">
            <h2>Register</h2>
          </div>
        </section>;
  }
}

export default Register;