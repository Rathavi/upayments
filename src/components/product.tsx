import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    matchRoutes,
    matchPath
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

interface RouteParams {
  id: string
}

class Product extends React.Component {
  state : any;

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

  componentDidMount() {
    console.log(this.props);
    let match = matchPath('/product/:id', window.location.pathname);
    fetch("https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/" + match?.params.id)
        .then((res) => res.json())
        .then((json) => {
            this.setState(json);
        });
  }
  render() {
    
  return <section id="product" className="product">
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