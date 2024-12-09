import "./App.css";
import Tabbar from "./comps/Tabbar";
import NoOfProjects from "./tables/NoOfProjects";
import PredefinedCycle from "./tables/PredefinedCycle";

function App() {
  return (
    <div>
      <div className="position-fixed bottom-0 start-0 end-0 bg-light">
        <Tabbar />
      </div>
      <div style={{ height: "calc(100vh - 50px)", overflow: "scroll" }}>
        <PredefinedCycle />
        {/* <NoOfProjects /> */}
      </div>
    </div>
  );
}

export default App;
