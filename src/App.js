import "./App.css";
import Tabbar from "./comps/Tabbar";
import Demo from "./Demo";
import NoOfProjects from "./tables/NoOfProjects";
import PredefinedCycle from "./tables/PredefinedCycle";

function App() {
  return (
    <div>
      <div className="position-fixed bottom-0 start-0 end-0 bg-light">
        <Tabbar />
      </div>
      <div style={{ height: "calc(100vh - 50px)", overflow: "scroll" }}>
        {/* <PredefinedCycle /> */}
        {/* <NoOfProjects /> */}
        <Demo minCellWidth={120} />
      </div>
    </div>
  );
}

export default App;
