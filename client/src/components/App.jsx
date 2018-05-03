// Import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import decode from 'jwt-decode';
import jwt from "jsonwebtoken"
// Import services
import AuthService from '../services/AuthService';
import ApiService from '../services/ApiService';

// Import CustomerApp component and subcomponents

// Import RestaurantApp component and subcomponents
import {
  CustomerAppContainer,
  RestaurantAppContainer,
  RestaurantLoginContainer,
  CustomerLoginContainer,
  FindRestaurantsContainer,
  OrderHistoryContainer,
  CustomerOrderContainer,
  CustomerSettingsContainer,
  RestaurantRegisterContainer,
  DashBoardContainer,
  MenuManagerContainer,
  RestaurantSettingsContainer,
  PromosContainer,
  CustomerRegisterContainer,
  MenuContainer,
  ConfirmOrderContainer,
} from './Containers';

// import {sampleRestaurantGet} from '../../sampleData';

// Create parent application
class App extends React.Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.checkUser = this.checkUser.bind(this);
    this.state = {
    };
  }
  
  componentWillMount(){
    
  }

  componentDidMount() {
    const restaurantId = 2;
    ApiService.getRestaurantData(restaurantId).then((res) => {
      this.props.loadRestaurantData(res);
    });
  }

  checkUser(){
    var token = this.Auth.getToken()
    var decoded = jwt.decode(token, {complete: true});
    if(token){
      if(decoded.payload.userType === 'Customer'){
        return 'Customer';
      } else if(decoded.payload.userType === 'Restaurant'){
        return 'Restaurant';
      }
    }
  }
  
  render() {
    return (
      <div>
        {/* <Switch> */}
        {
        this.checkUser() === 'Customer'
         ? <Route path="/customer/home" component={CustomerAppContainer} />
         : this.checkUser() === 'Restaurant'
         ? <Route path="/restaurant/home" component={RestaurantAppContainer} /> 
         : ''
        }
        <Route exact path="/" component={CustomerLoginContainer} />
        <Route path="/customer/login" component={CustomerLoginContainer} />
        <Route path="/restaurant/login" component={RestaurantLoginContainer} />
        <Route path="/customer/findRestaurants" component={FindRestaurantsContainer} />
        <Route path="/customer/history" component={OrderHistoryContainer} />
        <Route path="/customer/order" component={CustomerOrderContainer} />
        <Route path="/customer/settings" component={CustomerSettingsContainer} />
        <Route path="/customer/register" component={CustomerRegisterContainer} /> 
        <Route path="/customer/:id/menu" component={MenuContainer} />   
        <Route path="/restaurant/userRegister" component={RestaurantRegisterContainer} />
        <Route path="/customer/confirm-order" component={ConfirmOrderContainer} />   
        {/* </Switch> */}
      </div>
    );
  }
}
  
  export default App;
