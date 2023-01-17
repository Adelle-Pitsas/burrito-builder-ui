import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    this.fetchOrders()
  }

  submitOrder = (name, ingredients) => {
    postOrder({name: name, ingredients: ingredients})
    .then(data => {
      this.setState({orders: [...this.state.orders, data]})
    })
  }

  removeOrder = (id) => {
    deleteOrder(id)
    this.fetchOrders()
  }

  fetchOrders = () => {
    getOrders()
      .then(data => {
        this.setState({orders: data.orders})
      })
      .catch(err => console.error('Error fetching:', err));
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder}/>
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    );
  }
}


export default App;
