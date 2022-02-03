// import axios from "axios";

// const options = {
//   method: 'GET',
//   url: 'https://app.snipcart.com/api/products',
//   params: {limit: '200'},
//   headers: {
//     Accept: 'application/json',
//     Authorization: API_AUTH,
//     'content-type': 'application/json'
//   }
// };

// axios.request(options).then(function (response) {
//   const items = response.data.items
//   // creates an array of items 
//   Object.keys(items).map(key =>{
//     const stock = items[key].stock
//     if (stock === 0 ){
//       console.log('Out of Stock: ', 'name: ', items[key].name, 'id: ', items[key].id)
//       // $('#outOfStock').addClass('soldOut');
//       document.querySelector(`#${items[key].id}`).remove();

//     }
//   });
 
  
// }).catch(function (error) {
//   console.error(error);
// });

