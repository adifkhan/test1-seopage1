import "./App.css";
import Tabbar from "./comps/Tabbar";
import PredefinedCylcle from "./PredefinedCylcle";

function App() {
  return (
    <div>
      <div className="position-fixed mb-1 mx-1 bottom-0 start-0 end-0 bg-light">
        <Tabbar />
      </div>
      <PredefinedCylcle />
    </div>
  );
}

export default App;
