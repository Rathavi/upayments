import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


class NewProduct extends React.Component {
  render() {
  return <section id="newproduct" className="newproduct d-flex align-items-center">
          <div className="container">
            <h2>New Product</h2>
          </div>
        </section>;
  }
}

export default NewProduct;