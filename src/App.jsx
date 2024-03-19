import { useEffect, useState } from "react";

function App() {
  const [worker, setWorker] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Create a new web worker
    const myWorker = new Worker("worker.js");

    // Set up event listener for messages from the worker
    myWorker.onmessage = function (event) {
      console.log("Received result from worker:", event.data);

      setData(event.data);
      // set up the result
    };

    // Save the worker instance to state
    setWorker(myWorker);

    // Clean up the worker when the component unmounts
    return () => {
      myWorker.terminate();
    };
  }, []); // Run this effect only once when the component mounts

  const handleClick = () => {
    // Send a message to the worker
    if (worker) {
      worker.postMessage(5); // Send the number 5 to the worker
    }
  };
  return (
    <>
      <div>
        <button onClick={handleClick}>Calculate in Web Worker</button>
        <button onClick={() => alert("Hello Mks Tamin!")}>Alert</button>
        <hr />
        {data.map((itm, i) => (
          <p
            style={{
              display: "inline-block",
              border: "1px solid black",
              padding: "5px",
              margin: "5px",
            }}
            key={i}
          >
            {itm?.full_name} {i}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
