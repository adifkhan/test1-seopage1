import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import TableTools from "../comps/TableTools";
import { conditionalColumnFiltering, swapColumns } from "../utils/myFunc";

const PredefinedCycle = ({ data }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [visibleCol, setVisibleCol] = useState([...headCells]);
  const [columns, setColumns] = useState([...visibleCol]);
  const [searchData, setSearchData] = useState({ id: "", text: "" });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [density, setDensity] = useState("md");

  const tableRef = useRef(null);
  const resizingColumnRef = useRef(null);
  const startXRef = useRef(0);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // update visible data depending on column search
  useEffect(() => {
    if (searchData.id && searchData.text) {
      const filteredData = data.filter((item) =>
        item[searchData.id].toString().toLowerCase().includes(searchData.text.toLowerCase())
      );
      setVisibleData(filteredData);
    } else {
      setVisibleData(data);
    }
  }, [data, searchData.id, searchData.text]);

  const applyFilters = (filters) => {
    const filteredData = conditionalColumnFiltering({ data, filters });
    setVisibleData(filteredData);
  };

  // functions for resizing columns
  const handleMouseDown = (event, colIndex) => {
    event.stopPropagation();
    resizingColumnRef.current = colIndex;
    startXRef.current = event.clientX;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (resizingColumnRef.current === null || !tableRef.current) return;

    const table = tableRef.current;
    const th = table.querySelectorAll("th")[resizingColumnRef.current];
    const deltaX = event.clientX - startXRef.current;
    const newWidth = th.offsetWidth + deltaX;

    const MIN_WIDTH = 140;
    const MAX_WIDTH = 500;

    if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
      th.style.width = `${newWidth}px`;
      th.style.minWidth = `${newWidth}px`;
      startXRef.current = event.clientX;
    }
  };

  const handleMouseUp = () => {
    resizingColumnRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      <div className="table_toolbar">
        <TableTools
          density={density}
          setDensity={setDensity}
          visibleCol={visibleCol}
          setVisibleCol={setVisibleCol}
          columns={columns}
          setColumns={setColumns}
          applyFilters={applyFilters}
        />
      </div>
      <Table bordered hover style={{ margin: "176px 5px 5px" }} ref={tableRef}>
        <thead align="center" className="sticky_top">
          <tr className="table_head">
            {columns.map((col, index) =>
              col.id === "no_of_projects_minimum_ideal_18" ||
              col.id === "total_project_value_minimum_ideal_8000_usd" ||
              col.id === "project_completion_rate_minimum_ideal_85" ? (
                <th
                  key={index}
                  className="fw-medium bg-info p-1 position-relative"
                  style={{ fontSize: "14px", cursor: "pointer", minWidth: "140px" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index, columns, setColumns)}
                >
                  <label dangerouslySetInnerHTML={{ __html: col.label }} className="d-block" />
                  <input
                    type="text"
                    className="search_input"
                    placeholder="Search..."
                    onChange={(e) => setSearchData({ id: col.id, text: e.target.value })}
                  />
                  <div
                    className="resize-handle"
                    onMouseDown={(event) => handleMouseDown(event, index)}
                  />
                </th>
              ) : col.id === "project_manager" ? (
                <th
                  key={index}
                  className="sticky_left fw-medium bg-info p-0"
                  style={{ fontSize: "14px", cursor: "pointer", minWidth: "140px" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index, columns, setColumns)}
                >
                  <div className="position-relative w-100 h-100 p-1 pt-4">
                    <label className="d-block">{col.label}</label>
                    <input
                      type="text"
                      className="search_input"
                      placeholder="Search..."
                      onChange={(e) => setSearchData({ id: col.id, text: e.target.value })}
                    />
                    <div
                      className="resize-handle"
                      onMouseDown={(event) => handleMouseDown(event, index)}
                    />
                  </div>
                </th>
              ) : (
                <th
                  key={index}
                  className="fw-medium bg-info p-1 position-relative"
                  style={{ fontSize: "14px", cursor: "pointer", minWidth: "140px" }}
                  draggable
                  onDragStart={() => setDraggedIndex(index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => swapColumns(draggedIndex, index, columns, setColumns)}
                >
                  <label className="d-block">{col.label}</label>
                  <input
                    type="text"
                    className="search_input"
                    placeholder="Search..."
                    onChange={(e) => setSearchData({ id: col.id, text: e.target.value })}
                  />
                  <div
                    className="resize-handle"
                    onMouseDown={(event) => handleMouseDown(event, index)}
                  />
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody align="center">
          {visibleData.length > 0 ? (
            visibleData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((col, colIndex) =>
                  col.id === "project_manager" ? (
                    <td
                      key={colIndex}
                      className={`sticky_left align-middle p-1 ${
                        density === "md" ? "py-3" : density === "lg" ? "py-5" : "py-1"
                      }`}
                    >
                      <div>{row?.[col.id]}</div>
                    </td>
                  ) : (
                    <td
                      key={colIndex}
                      className={`align-middle p-1 ${
                        density === "md" ? "py-3" : density === "lg" ? "py-5" : "py-1"
                      }`}
                    >
                      {row?.[col.id]}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="align-middle py-3">
                No match found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PredefinedCycle;

const headCells = [
  { id: "project_manager", label: "Project Manager" },
  {
    id: "no_of_projects_minimum_ideal_18",
    label: `No. of Projects <br/><span class="text-danger" style="font-size: 12px;">(Minimum Ideal 18)</span>`,
  },
  {
    id: "total_project_value_minimum_ideal_8000_usd",
    label: `Total Project Value <br/><span class="text-danger" style="font-size: 12px;">(Minimum Ideal 8000 USD)</span>`,
  },
  { id: "total_released_amount", label: "Total Released Amount" },
  { id: "no_of_fully_completed_project", label: "No. of Fully Completed Project" },
  {
    id: "no_of_completed_projects_without_autorization",
    label: "No. of Completed Projects Without Autorization",
  },
  {
    id: "project_completion_rate_minimum_ideal_85",
    label: `Project Completion Rate <br/><span class="text-danger" style="font-size: 12px;">(Minimum Ideal 85%)</span>`,
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
