export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (order) => {
  console.log(order)
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(response => response.json())
}