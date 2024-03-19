onmessage = function (event) {
  console.log("Received message from the main thread:", event.data);

  let wbData = [];

  const socket = new WebSocket(
    "ws://203.202.247.124:8765/socket-api/v1/marketfeed/ws"
  );

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    wbData.push(JSON.parse(event.data));
    // console.log(JSON.parse(event.data));
    postMessage(wbData);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  // Perform some computation
  // const result = event.data * 2;

  // Send the result back to the main thread
  // postMessage(result);
};
