import "./App.css";

import WavingSvg from "./WavingSvg";

function App() {
  return (
    <div>
      <main className="container">
        <p>Test 123</p>
        <div style={{
          width: '600px',
          height: '400px',
          border: '2px solid red',
        }}>
          <WavingSvg />
        </div>
      </main>
    </div>
  );
}

export default App;
