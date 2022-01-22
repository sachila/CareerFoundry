import { BrowserRouter } from "react-router-dom";
import { RootProvider } from "./Components/RootProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RootProvider />
    </BrowserRouter>
  );
}

export default App;
