import React from 'react';
import { matchPath } from "react-router-dom";
import { product } from '../interfaces/app.interface';
import { ApiService } from '../services/api.service';

class Product extends React.Component {
  
  state : product;

  api = new ApiService();
  
  // Constructor 
  constructor(props : any) {
    super(props);

    this.state = {
      id : '',
      name : '',
      price : 0,
      category : '',
      description : '',
      avatar : '',
      developerEmail : '',
      createdAt : 0
    };
  }

  async componentDidMount() {
    let match = matchPath('/product/:id', window.location.pathname);
    let json = await this.api.getProduct(match?.params.id as string);
    this.setState(json);
  }

  render() {
    return <section>
          <div className="container">
            <div className="flex flex-row space-x-7">
              <div className="w-1/4">
                <div className="w-full min-h-80 bg-white aspect-w-1 aspect-h-1.5 rounded-xl overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  {this.state.avatar && this.state.avatar.indexOf('http') === 0 ? <img
                    src={this.state.avatar}
                    alt="No Image"
                    className="w-full h-full object-center object-contain lg:w-full lg:h-full"
                  /> : ''}
                </div>
              </div>
              <div className="w-3/4 min-h-80 lg:h-80">
                <h1 className='font-bold lg:text-5xl sm:text-3xl xs:text-2xl'>{this.state.name}</h1>
                <h4 className='font-bold lg:text-2xl sm:text-xl xs:text-lg lg:mt-60 sm:mt-10'>$ {this.state.price}</h4>
              </div>
            </div>
            <hr className='my-10 border-2 border-gray-400'></hr>
            <h4 className='font-bold text-2xl mb-2'>Description</h4>
            <p>{this.state.description}</p>
          </div>
        </section>;
  }
}

export default Product;