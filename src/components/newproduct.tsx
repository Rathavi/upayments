import React from 'react';
import { Navigate } from "react-router-dom";
import { product, category } from '../interfaces/app.interface';
import { ApiService } from '../services/api.service';

interface newProductState {
  catListOpen: boolean,
  categories: Array<category>,
  selectedCategory: category,
  wait: boolean,
  shouldRedirect: boolean
}

class NewProduct extends React.Component {

  state: newProductState;

  api = new ApiService();

  constructor(props: any) {
    super(props);

    this.state = {
      catListOpen: false,
      categories: [],
      selectedCategory: { id: '', name: '', createdAt: '', selected: false},
      wait: false,
      shouldRedirect: false
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    let json = await this.api.getCategories();
    this.setState({
      categories: json
    });
  }

  onCategorySelection(cat : category) {
    let categories = this.state.categories;
    categories.forEach(c => (c.selected = false));
    cat.selected = !cat.selected;
    this.setState({
      selectedCategory: cat.selected ? cat : { id: '', name: '', createdAt: '', selected: false}
    })
  }

  isValid(product: product) : boolean {
    if(!product.name || !product.description || !product.avatar || !product.price || !product.category || !product.name) {
      return false;
    }
    // TODO: can be added other validations here
    return true;
  }

  onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    
    if(this.state.wait) {
      return;
    }

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      avatar: { value: string };
      price: { value: number };
    };

    let newProd = {
      name : target.name.value,
      description : target.description.value,
      avatar : target.avatar.value,
      category : this.state.selectedCategory.name,
      developerEmail : 'rathvibharat@yahoo.com',
      price : target.price.value
    } as product;
    
    if(!this.isValid(newProd)) {
      return;
    }

    this.createProduct(newProd)
  }

  async createProduct(product: product) {
    this.state.wait = true;
    await this.api.addProduct(product);
    this.setState({ wait: false, shouldRedirect: true });
  }
  
  render() {
    const { categories, shouldRedirect } = this.state;
    if(shouldRedirect) {
      return <Navigate to="/home" replace />
    }
    return <section>
          <div className="container">
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='md:w-96 w-full'>
                <h4 className='font-bold text-center lg:text-2xl sm:text-xl xs:text-lg sm:mt-10 mb-5'>Create Product</h4>
                <form onSubmit={this.onSubmit}>
                  <input className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 w-full mb-5' type='text' name='name' placeholder='Product name' required />
                  <textarea className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 w-full mb-5' name='description' placeholder='Description' required></textarea>
                  <input className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 w-full mb-5' type='text' name='avatar' placeholder='Image URL' required />
                  <div className="w-full relative float-right text-left rounded-lg bg-white shadow-lg mb-5">
                    <div>
                      <button type="button" onClick={() => this.setState({catListOpen: !this.state.catListOpen})} className={`inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ${this.state.selectedCategory.id ? 'text-gray-700' : 'text-gray-400'}`} aria-expanded="true" aria-haspopup="true">
                        {this.state.selectedCategory.name || 'Categories'}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                    </div>
                    {this.state.catListOpen ? <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                      <div className="py-1" role="none">
                      {categories.map((cat) => (
                        <a key={cat.id} onClick={() => {this.onCategorySelection(cat)}} className={`text-gray-700 block px-4 py-2 pl-9 text-sm cursor-pointer relative ${cat.selected ? 'selected' : ''}`} role="menuitem" id="menu-item-0">
                          {cat.selected ? <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg></span> : ''}
                          {cat.name}
                        </a>
                      ))}
                      </div>
                    </div> : ''}
                  </div>
                  <input className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 w-full mb-5' type='number' name='price' placeholder='Price' required />
                  <input className='rounded-lg bg-white shadow-lg focus:ring-indigo-500 focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 w-full mb-5 cursor-pointer font-bold' type='submit' value="SUBMIT" disabled={this.state.wait} />
                </form>
              </div>
            </div>
          </div>
        </section>;
  }
}

export default NewProduct;