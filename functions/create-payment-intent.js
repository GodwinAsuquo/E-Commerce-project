// domain/.netlify/functions/create-payment-intent

exports.handler = async function(event, context) {
    // const {cart, shipping_fee, total_amount} = JSON.parse(event.body)
// console.log(cart);
console.log(event);
return {
    statusCode: 200,
    body: 'Payment intent',
}
}

//note that we are only able to set up a post request because we can navigate to a particular endpoint when we refresh
//to see the events, clg events.  




