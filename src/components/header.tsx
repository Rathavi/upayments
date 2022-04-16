import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
      return <header className='rounded-lg bg-white shadow-lg px-5 py-3 my-10'>
      <nav className="float-right mt-1">
        <ul>
          <li><Link className='p-1 mx-2' to="/register">Register</Link> </li>
        </ul>
      </nav>
      <div>
        <Link to="/home">
          <h1 className="text-3xl font-bold italic">UPayments Store</h1>
        </Link>
      </div>
    </header>
  }
}

export default Header;