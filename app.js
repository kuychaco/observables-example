/* 
* @Author: Katrina Uychaco
* @Date:   2015-07-26 21:38:18
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-27 00:28:00
*/

/*
Connect to coinbase websocket stream
Use to display data
*/

// an observer for when the socket is open
var openObserver = Rx.Observer.create(function(e) {
  console.info('socket open');

  // Now it is safe to send a message
  var subscribe = JSON.stringify({
    "type": "subscribe",
    "product_id": "BTC-USD"
  });
  socket.onNext(subscribe);
});

// an observer for when the socket is about to close
var closingObserver = Rx.Observer.create(function() {
  console.log('socket is about to close');
});

// create a web socket subject
var socket = Rx.DOM.fromWebSocket(
  'wss://ws-feed.exchange.coinbase.com',
  null, // no protocol
  openObserver,
  closingObserver);

var orderData = socket.map(function(event) {
  return JSON.parse(event.data);
});

orderData.forEach(function(data) {
  document.getElementById(data.side).innerText = data.price;
});

