import "./App.css";
import MainComponent from "./Components/MainComponent";

function App() {
  console.log(process.env.REACT_APP_TITLE);
  return (
    <div className="app">
      <MainComponent />
    </div>
  );
}

export default App;
