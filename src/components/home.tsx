import React, { FormEvent } from 'react';
import { Link } from "react-router-dom";
import { product, category } from '../interfaces/app.interface';
import { ApiService } from '../services/api.service';

interface homeState {
  products : Array<product>,
  categories : Array<category>,
  query : string,
  loaded : boolean,
  catListOpen : boolean
}

class Home extends React.Component {

  state : homeState;

  api = new ApiService();

  // Constructor 
  constructor(props : any) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      query: '',
      loaded: false,
      catListOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: FormEvent<HTMLInputElement> | KeyboardEvent | MouseEvent | InputEvent) {
    this.setState({query: (event.target as HTMLInputElement).value});
  }

  deleteMap : any = {}

  async onDelete(id: string) {
    if(!this.deleteMap[id] && window.confirm('Are you sure?')) {
      this.deleteMap[id] = true;
      await this.api.deleteProduct(id);
      await this.fetchProducts();
      this.applyFilter();
    }
  }

  async fetchProducts() {
    let json  = await this.api.getProducts();
    this.setState({
      products: json.map((p : product) => {
        if(typeof p.name !== 'string') 
          p.name = (p.name as any).join('');
        return p;
      }),
      loaded: true
    });
  }

  async componentDidMount() {
    await this.fetchProducts();

    let json = await this.api.getCategories();
    this.setState({
      categories: json
    });
  }

  applyFilter() {
    const { products, categories, query } = this.state;
    let items = products;
    if(query) {
      items = products.filter((p) => {
        return p.name && p.name.toLowerCase().indexOf(query) > -1
      })
    }
    let isAnySelected = categories.find((c) => c.selected);
    if(isAnySelected && categories) {
      items = items.filter((p) => !!categories.find((c) => p.category === c.name && c.selected));
    }
    return items;
  }

  render() {
    const { loaded, categories } = this.state;
    let items = this.applyFilter();

    return <section>
          <div className="container">
            <div className='mb-5'>
              <div className="relative float-right text-left rounded-lg bg-white shadow-lg">
                <div>
                  <button type="button" onClick={() => this.setState({catListOpen: !this.state.catListOpen})} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Categories
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>
                {this.state.catListOpen ? <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                  <div className="py-1" role="none">
                  {categories.map((cat) => (
                    <a key={cat.id} onClick={() => {cat.selected = !cat.selected;this.setState({categories: categories})}} className={`text-gray-700 block px-4 py-2 pl-9 text-sm cursor-pointer relative ${cat.selected ? 'selected' : ''}`} role="menuitem" id="menu-item-0">
                      {cat.selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg></span> : ''}
                      {cat.name}
                    </a>
                  ))}
                  </div>
                </div> : ''}
              </div>
              <input type="text" value={this.state.query} onInput={(event) => this.handleChange(event)} className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block w-1/4 p-3 sm:text-sm border-gray-300' placeholder='Apple watch, Samsung S21, Macbook Pro...' />
            </div>
            <div className="max-w-2xl mx-auto py-10 sm:py-15 lg:max-w-7xl">
              <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {items.map((product) => (
                  <div key={product.id} className="group">
                    <Link to={`/product/${product.id}`}>
                      <div className="w-full min-h-80 bg-white aspect-w-1 aspect-h-1 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        {product.avatar && product.avatar.indexOf('http') === 0 ? <img
                          src={product.avatar}
                          alt="No Image"
                          className="w-full h-full object-center object-contain lg:w-full lg:h-full"
                        /> : ''}
                      </div>
                    </Link>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-lg text-gray-700">{product.name}</h3>
                      </div>
                      <a className='cursor-pointer' onClick={() => this.onDelete(product.id)}>
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px">
                          <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"/>
                        </svg>
                      </a>
                    </div>
                    <p className="text-sm font-medium text-gray-900">$ {product.price || 0}</p>
                  </div>))
                }
              </div>
              {!loaded ? <p className='text-center'>Please Wait...</p> : items.length ? '' : <p className='text-center'>No Product Available.</p>}
            </div>
            <Link to='/product/create' className='cursor-pointer fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gray-800 text-4xl font-bold text-white text-center py-2'>+</Link>
          </div>
        </section>;
  }
}

export default Home;