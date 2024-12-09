import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const headCells = [
  { id: "id", label: "#ID" },
  { id: "project_manager", label: "Project Manager" },
  {
    id: "no_of_projects_minimum_ideal_18",
    label: `No. of Projects <span class="text-danger" style="font-size: 12px;">(Minimum Ideal 18)</span>`,
  },
  {
    id: "total_project_value_minimum_ideal_8000_usd",
    label: `Total Project Value <span class="text-danger" style="font-size: 12px;">(Minimum Ideal 8000 USD)</span>`,
  },
  { id: "total_released_amount", label: "Total Released Amount" },
  { id: "no_of_fully_completed_project", label: "No. of Fully Completed Project" },
  {
    id: "no_of_completed_projects_without_autorization",
    label: "No. of Completed Projects Without Autorization",
  },
  {
    id: "project_completion_rate_minimum_ideal_85",
    label: `Project Completion Rate <span class="text-danger" style="font-size: 12px;">(Minimum Ideal 85%)</span>`,
  },
  {
    id: "project_completion_rate_without_authorization",
    label: "Project Completion Rate (Without Authorization)",
  },
  { id: "no_of_first_time_clients", label: "No. of First Time Clients" },
  { id: "milestone_completion_rate", label: "Milestone Completion Rate" },
  { id: "task_completion_rate", label: "Task Completion Rate" },
  { id: "average_project_completion_time", label: "Average Project Completion Time" },
  { id: "no_of_upsale_cross_sales", label: "No. of Upsale/Cross Sales" },
  { id: "value_of_upsale_cross_sale", label: "Value of Upsale/Cross Sale" },
  { id: "canceled_projects", label: "Canceled Projects" },
  { id: "delayed_projects", label: "Delayed Projects" },
  { id: "delayed_completed", label: "Delayed Completed" },
  { id: "percentage_of_delayed_projects", label: "Percentage of Delayed Projects" },
  { id: "cancelation_rate", label: "Cancelation Rate" },
  { id: "avg_payment_rel_time", label: "Avg. Payment Rel. Time" },
];
const NoOfProjects = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(headCells);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://retoolapi.dev/cV9K7f/predefined_cycle");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  const swapColumns = (fromIndex, toIndex) => {
    const updatedHeaders = [...columns];

    // Swap headers
    const [movedHeader] = updatedHeaders.splice(fromIndex, 1);
    updatedHeaders.splice(toIndex, 0, movedHeader);

    setColumns(updatedHeaders);
  };
  return (
    <div>
      <h2 className="text-center fs-3 fw-normal my-3">
        Total Project: 63 <br /> Total Project Value: $75,600.00
      </h2>
      <Table bordered hover>
        <thead align="center" className="position-sticky top-0 left-0">
          <tr className="table_head">
            {columns.map((col, index) =>
              col.id === "no_of_projects_minimum_ideal_18" ||
              col.id === "total_project_value_minimum_ideal_8000_usd" ||
              col.id === "project_completion_rate_minimum_ideal_85" ? (
                <th
                  key={index}
                  className="fw-medium px-3 bg-info"
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index)}
                  dangerouslySetInnerHTML={{ __html: data.label }}
                >
                  <label dangerouslySetInnerHTML={{ __html: col.label }} />
                </th>
              ) : col.id === "project_manager" ? (
                <th
                  key={index}
                  className="fw-medium px-3 bg-info text-nowrap sticky-left"
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index)}
                >
                  {col.label}
                </th>
              ) : (
                <th
                  key={index}
                  className="fw-medium px-3 bg-info"
                  style={{ fontSize: "14px", cursor: "pointer" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index)}
                >
                  {col.label}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody align="center">
          {data.length > 0 &&
            data?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((col, colIndex) =>
                  col.id === "project_manager" ? (
                    <td key={colIndex} className="">
                      {row?.[col.id]}
                    </td>
                  ) : (
                    <td key={colIndex}>{row?.[col.id]}</td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NoOfProjects;
