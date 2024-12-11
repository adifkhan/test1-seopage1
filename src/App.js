import React, { useEffect, useState } from "react";
import "./App.css";
import Tabbar from "./comps/Tabbar";
import NoOfProjects from "./tables/NoOfProjects";
import PredefinedCycle from "./tables/PredefinedCycle";
import TotalProjectValue from "./tables/TotalProjectValue";
import TotalReleaseAmount from "./tables/TotalReleaseAmount";
import FullyCompletedProject from "./tables/FullyCompletedProject";
import ProjectCompRate from "./tables/ProjectCompRate";
import MilestoneCompRate from "./tables/MilestoneCompRate";
import TaskCompRate from "./tables/TaskCompRate";
import AvgProjectCompTime from "./tables/AvgProjectCompTime";
import UpAndCrossSales from "./tables/UpAndCrossSales";
import ValueUpCrossSale from "./tables/ValueUpCrossSale";
import CanceledProject from "./tables/CanceledProject";
import DelayedProject from "./tables/DelayedProject";
import DelayedCompleted from "./tables/DelayedCompleted";

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = React.useState(table_titles[0]);

  // get table data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(activeTab.apiUri);
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, [activeTab.apiUri]);

  return (
    <div>
      <Tabbar tableTitles={table_titles} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab?.id === "predefined_cycle" && <PredefinedCycle data={data} />}
        {activeTab?.id === "no_of_projects" && <NoOfProjects data={data} />}
        {activeTab?.id === "total_project_value" && <TotalProjectValue data={data} />}
        {activeTab?.id === "total_released_amount" && <TotalReleaseAmount data={data} />}
        {activeTab?.id === "no_of_fully_completed_project" && <FullyCompletedProject data={data} />}
        {activeTab?.id === "project_completion_rate" && <ProjectCompRate data={data} />}
        {activeTab?.id === "milestone_completion_rate" && <MilestoneCompRate data={data} />}
        {activeTab?.id === "task_completion_rate" && <TaskCompRate data={data} />}
        {activeTab?.id === "average_project_completion_time" && <AvgProjectCompTime data={data} />}
        {activeTab?.id === "no_of_upsale_cross_sales" && <UpAndCrossSales data={data} />}
        {activeTab?.id === "value_of_upsale_cross_sale" && <ValueUpCrossSale data={data} />}
        {activeTab?.id === "canceled_projects" && <CanceledProject data={data} />}
        {activeTab?.id === "delayed_projects" && <DelayedProject data={data} />}
        {activeTab?.id === "delayed_completed" && <DelayedCompleted data={data} />}
      </div>
    </div>
  );
}

export default App;

const table_titles = [
  {
    id: "predefined_cycle",
    title: "Predefined Cycle",
    apiUri: "https://retoolapi.dev/cV9K7f/predefined_cycle",
  },
  {
    id: "no_of_projects",
    title: "No. of Projects",
    apiUri: "https://retoolapi.dev/raJ2QY/no_of_projects",
  },
  {
    id: "total_project_value",
    title: "Total Project Value",
    apiUri: "https://retoolapi.dev/qQwvdU/total_project_value",
  },
  {
    id: "total_released_amount",
    title: "Total Released Amount",
    apiUri: "https://retoolapi.dev/g8dYiX/total_released_amount",
  },
  {
    id: "no_of_fully_completed_project",
    title: "No. of Fully Completed Project",
    apiUri: "https://retoolapi.dev/Ap1WeY/no_of_fully_completed_project",
  },
  {
    id: "project_completion_rate",
    title: "Project Completion Rate",
    apiUri: "https://retoolapi.dev/q0JzIY/project_completion_rate",
  },
  {
    id: "milestone_completion_rate",
    title: "Milestone Completion Rate",
    apiUri: "https://retoolapi.dev/hPaSQx/milestone_completion_rate",
  },
  {
    id: "task_completion_rate",
    title: "Task Completion Rate",
    apiUri: "https://retoolapi.dev/JxFjNL/task_completion_rate",
  },
  {
    id: "average_project_completion_time",
    title: "Average Project Completion Time",
    apiUri: "https://retoolapi.dev/5uR4BW/average_project_completion_time",
  },
  {
    id: "no_of_upsale_cross_sales",
    title: "No of Upsale/Cross Sales",
    apiUri: "https://retoolapi.dev/4W877W/no_of_upsale_cross_sales",
  },
  {
    id: "value_of_upsale_cross_sale",
    title: "Value of Upsale/Crosssale",
    apiUri: "https://retoolapi.dev/pptYJy/value_of_upsale_cross_sale",
  },
  {
    id: "canceled_projects",
    title: "Canceled Projects",
    apiUri: "https://retoolapi.dev/XbPWst/canceled_projects",
  },
  {
    id: "delayed_projects",
    title: "Delayed Projects",
    apiUri: "https://retoolapi.dev/psFpKa/delayed_projects",
  },
  {
    id: "delayed_completed",
    title: "Delayed Completed",
    apiUri: "https://retoolapi.dev/lJOP3J/delayed_completed",
  },
];
