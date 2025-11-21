import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; // IMPORTANT: using new CSS

function App() {
  const [factss, setcontent] = useState("");
  const [btn, setcount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get("https://catfact.ninja/fact");
        setcontent(res.data.fact);
      } catch (err) {
        console.log("Error fetching:", err);
      }
    };

    getData();
  }, [btn]);

  return (
    <div className="container">
      <h1 className="title">🐱 Random Cat Fact</h1>

      <div className="fact-box">
        {factss ? factss : "Click the button to get a cat fact!"}
      </div>

      <button className="btn" onClick={() => setcount(btn + 1)}>
        Get New Fact
      </button>
    </div>
  );
}

export default App;
