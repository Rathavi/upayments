import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

interface product {
  id: string,
  name : string,
  price : number,
  category : string,
  description : string,
  avatar : string,
  developerEmail : string,
  createdAt: number
}

interface categoryListState {
  products : Array<product>,
  categories : Array<any>,
  loaded : boolean,
  filter : boolean
}

class Home extends React.Component {

  state : categoryListState;

  // Constructor 
  constructor(props : any) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      loaded: false,
      filter: false
    };
  }

  componentDidMount() {
    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                products: json,
                loaded: true
            });
        });

    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                categories: json
            });
        });
  }

  render() {
    const { loaded, products } = this.state;
    return <section id="home" className="home d-flex align-items-center">
          <div className="container">
            <div className='mb-5'>
              <div className="relative float-right text-left rounded-lg bg-white shadow-lg">
                <div>
                  <button type="button" onClick={() => this.setState({filter: !this.state.filter})} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Categories
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>
                {this.state.filter ? <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                  <div className="py-1" role="none">
                  {this.state.categories.map((cat) => (
                    <a key={cat.id} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">{cat.name}</a>
                  ))}
                  </div>
                </div> : ''}
              </div>
              <input type="text" className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-1/4 p-3 sm:text-sm border-gray-300 rounded-md' placeholder='Apple watch, Samsung S21, Macbook Pro...' />
            </div>
            <div className="max-w-2xl mx-auto py-10 sm:py-15 lg:max-w-7xl">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <div key={product.id} className="group">
                    <div className="w-full min-h-80 bg-white aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      {product.avatar && product.avatar.indexOf('http') === 0 ? <img
                        src={product.avatar}
                        alt="No Image"
                        className="w-full h-full object-center object-contain lg:w-full lg:h-full"
                      /> : ''}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{product.price}</p>
                    </div>
                  </div>
                ))
                }
              </div>
              {!loaded ? <p className='text-center'>Please Wait...</p> : products.length ? '' : <p className='text-center'>No Product Available.</p>}
            </div>
          </div>
        </section>;
  }
}

export default Home;