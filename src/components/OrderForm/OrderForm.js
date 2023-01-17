import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: false
    };
  }

  handleIngredientChange = (event) => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.name]})
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }


  handleSubmit = e => {
    e.preventDefault();
    if(this.state.name !== "" && this.state.ingredients.length !== 0) {
      this.props.submitOrder(this.state.name, this.state.ingredients)
      this.setState({error: false})
      this.clearInputs();
    } else {
      this.setState({error: true})
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} className='ingredient-button' onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className='order-feedback'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.error && <p className='error-message'>Please enter all information</p>}
        <button className='submit-button' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
