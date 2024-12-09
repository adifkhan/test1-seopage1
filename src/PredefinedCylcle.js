import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const headCells = [
  { id: "id", label: "ID" },
  { id: "project_manager", label: "Project Manager" },
  {
    id: "no_of_projects_minimum_ideal_18",
    label: {
      __html: `No. of Projects <span class="text-danger" style="font-size: 12px;">(Minimum Ideal 18)</span>`,
    },
  },
  {
    id: "total_project_value_minimum_ideal_8000_usd",
    label: `Total Project Value{" "}
              <span className="text-danger" style={{ fontSize: "12px" }}>
                (Minimum Ideal 8000 USD)
              </span>`,
  },
  { id: "total_released_amount", label: "Total Released Amount" },
  { id: "no_of_fully_completed_project", label: "No. of Fully Completed Project" },
  {
    id: "no_of_completed_projects_without_autorization",
    label: "No. of Completed Projects Without Autorization",
  },
  {
    id: "project_completion_rate_minimum_ideal_85",
    label: `Project Completion Rate{" "}
              <span className="text-danger" style={{ fontSize: "12px" }}>
                (Minimum Ideal 85%)
              </span>`,
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

const PredefinedCylcle = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(headCells);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://retoolapi.dev/cV9K7f/predefined_cycle");
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, dropIndex) => {
    const dragIndex = event.dataTransfer.getData("text/plain");
    const newColumns = [...columns];
    const [draggedColumn] = newColumns.splice(dragIndex, 1);
    newColumns.splice(dropIndex, 0, draggedColumn);
    setColumns(newColumns);
  };
  return (
    <div>
      <h2 className="text-center fw-normal my-2">
        Total Project: 63 <br /> Total Project Value: $75,600.00
      </h2>
      <Table bordered hover responsive className="w-100">
        <thead align="center">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="fw-medium"
                style={{ fontSize: "14px", cursor: "pointer" }}
                draggable
                onDragStart={(event) => handleDragStart(event, i)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, i)}
              >
                {col.label}
              </th>
            ))}
            {/* <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              #ID
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Project Manager
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              No. of Projects{" "}
              <span className="text-danger" style={{ fontSize: "12px" }}>
                (Minimum Ideal 18)
              </span>
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Total Project Value{" "}
              <span className="text-danger" style={{ fontSize: "12px" }}>
                (Minimum Ideal 8000 USD)
              </span>
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Total Released Amount
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              No. of Fully Completed Project
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              No. of Completed Projects Without Autorization
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Project Completion Rate{" "}
              <span className="text-danger" style={{ fontSize: "12px" }}>
                (Minimum Ideal 85%)
              </span>
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Project Completion Rate (Without Authorization)
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              No. of First Time Clients
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Milestone Completion Rate
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Task Completion Rate
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Average Project Completion Time
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              No. of Upsale/Cross Sales
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Value of Upsale/Cross Sale
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Canceled Projects
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Delayed Projects
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Delayed Completed
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Percentage of Delayed Projects
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Cancelation Rate
            </th>
            <th className="fw-medium" style={{ fontSize: "14px", cursor: "pointer" }} draggable>
              Avg. Payment Rel. Time
            </th> */}
          </tr>
        </thead>
        <tbody align="center">
          {data?.map((item) => (
            <tr key={item.id}>
              <td draggable className="">
                {item?.id}
              </td>
              <td draggable className="">
                {item?.project_manager}
              </td>
              <td draggable className="">
                {item?.no_of_projects_minimum_ideal_18}
              </td>
              <td draggable className="">
                {item?.total_project_value_minimum_ideal_8000_usd}
              </td>
              <td draggable className="">
                {item?.total_released_amount}
              </td>
              <td draggable className="">
                {item?.no_of_fully_completed_project}
              </td>
              <td draggable className="">
                {item?.no_of_completed_projects_without_autorization}
              </td>
              <td draggable className="">
                {item?.project_completion_rate_minimum_ideal_85}
              </td>
              <td draggable className="">
                {item?.project_completion_rate_without_authorization}
              </td>
              <td draggable className="">
                {item?.no_of_first_time_clients}
              </td>
              <td draggable className="">
                {item?.milestone_completion_rate}
              </td>
              <td draggable className="">
                {item?.task_completion_rate}
              </td>
              <td draggable className="">
                {item?.average_project_completion_time}
              </td>
              <td draggable className="">
                {item?.no_of_upsale_cross_sales}
              </td>
              <td draggable className="">
                {item?.value_of_upsale_cross_sale}
              </td>
              <td draggable className="">
                {item?.canceled_projects}
              </td>
              <td draggable className="">
                {item?.delayed_completed}
              </td>
              <td draggable className="">
                {item?.delayed_projects}
              </td>
              <td draggable className="">
                {item?.percentage_of_delayed_projects}
              </td>
              <td draggable className="">
                {item?.cancelation_rate}
              </td>
              <td draggable className="">
                {item?.avg_payment_rel_time}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PredefinedCylcle;
