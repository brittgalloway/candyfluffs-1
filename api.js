import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://app.snipcart.com/api/products',
  params: {limit: '200'},
  headers: {
    Accept: 'application/json',
    Authorization: 'Basic U19NalJqWm1RMFlqRXRObVF3WmkwME16ZGxMV0kzT1RVdE56VmlPRGRpWVdSa09HSmhOak0zTmpJM05UazJNamd6TXpRMk5EVXc6dW5kZWZpbmVk',
    'content-type': 'application/json'
  }
};

axios.request(options).then(function (response) {
  const items = response.data.items
  const outOfStock = [];
  // creates an array of stock levels
  Object.keys(items).map(key =>{
    const stock = items[key].stock
    if (stock === 0 ){
      outOfStock.push(key);
      console.log('Im 0 stock')
    }
  });
 
  console.log('push', outOfStock);
  
}).catch(function (error) {
  console.error(error);
});

