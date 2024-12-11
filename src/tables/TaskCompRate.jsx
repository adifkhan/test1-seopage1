import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import TableTools from "../comps/TableTools";

const headCells = [
  { id: "id", label: "SL NO" },
  { id: "project_name", label: "Project Name" },
  {
    id: "client",
    label: "Client",
  },
  {
    id: "project_value",
    label: "Project Value",
  },
  { id: "released_amount", label: "Released Amount" },
  { id: "released_amount_percentage", label: "Released Amount (Percentage)" },
  { id: "total_tasks", label: "Total Tasks" },
  { id: "completed_tasks", label: "Completed Tasks" },
  { id: "submitted_to_client", label: "Submitted to Client" },
  { id: "under_review", label: "Under Review" },
  { id: "revisions", label: "Revisions" },
  {
    id: "task_completion_time_how_many_tasks_he_completed_daily_for_that",
    label: "Task Completion Time (How many tasks he completed daily for that project)",
  },
  { id: "deal_closed_by", label: "Deal Closed By" },
  {
    id: "estimated_hours",
    label: "Estimated Hours",
  },
  {
    id: "total_hours_logged",
    label: "Total Hours Logged",
  },
  {
    id: "freelancer_com_message_page_link",
    label: "Freelancer.com Message Page Link",
  },
  { id: "freelancer_com_profile_link", label: "Freelancer.com Profile Link" },
  { id: "members", label: "Members" },
  { id: "start_date", label: "Start Date" },
  { id: "deadline", label: "Deadline" },
  { id: "deliverables_signed_by_the_client", label: "Deliverables Signed By the Client" },
  { id: "deliverables_signed_internally", label: "Deliverables Signed Internally" },
  { id: "project_progress_payment_wise", label: "Project Progress (Payment Wise)" },
  { id: "project_progress_task_completion_wise", label: "Project Progress (Task Completion Wise)" },
  { id: "status_in_progress", label: "Status (In Progress)" },
  { id: "project_completion_time", label: "Project Completion Time" },
  { id: "no_of_upsell_from_that_project", label: "No. of Upsell From That Project" },
  { id: "value_of_upsale", label: "Value of Upsale" },
  { id: "no_of_cross_sale_from_that_project", label: "No. of Cross Sale From That Project" },
  { id: "value_of_cross_sale", label: "Value of Cross Sale" },
];

const TaskCompRate = ({ data }) => {
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

  // update visible data
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
    const filteredData = data.filter((item) => {
      const isMatch = filters.some((query) => {
        const label = query.label;
        const option = query.option.toLowerCase();
        const value = query.value.toLowerCase();

        if (item[label] !== undefined) {
          const fieldValue = item[label].toString().toLowerCase();

          switch (option) {
            case "begins with":
              return fieldValue.startsWith(value);
            case "contains":
              return fieldValue.includes(value);
            case "greater than":
              const numericFieldValueGT = parseFloat(fieldValue.replace(/[^0-9.]/g, ""));
              const numericQueryValueGT = parseFloat(value.replace(/[^0-9.]/g, ""));
              return (
                !isNaN(numericFieldValueGT) &&
                !isNaN(numericQueryValueGT) &&
                numericFieldValueGT > numericQueryValueGT
              );
            case "less than":
              const numericFieldValueLT = parseFloat(fieldValue.replace(/[^0-9.]/g, ""));
              const numericQueryValueLT = parseFloat(value.replace(/[^0-9.]/g, ""));
              return (
                !isNaN(numericFieldValueLT) &&
                !isNaN(numericQueryValueLT) &&
                numericFieldValueLT < numericQueryValueLT
              );
            case "equal to":
              return fieldValue === value;
            case "not equal to":
              return fieldValue !== value;
            default:
              return false;
          }
        }

        return false;
      });
      return isMatch ? item : null;
    });

    setVisibleData(filteredData);
  };

  const swapColumns = (fromIndex, toIndex) => {
    const updatedHeaders = [...columns];

    // Swap headers
    const [movedHeader] = updatedHeaders.splice(fromIndex, 1);
    updatedHeaders.splice(toIndex, 0, movedHeader);

    setColumns(updatedHeaders);
  };

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
            {columns.map((col, index) => (
              <th
                key={index}
                className="fw-medium bg-info p-1 position-relative"
                style={{ fontSize: "14px", cursor: "pointer", minWidth: "140px" }}
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => swapColumns(draggedIndex, index)}
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
            ))}
          </tr>
        </thead>
        <tbody align="center">
          {visibleData.length > 0 ? (
            visibleData?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`align-middle p-1 ${
                      density === "md" ? "py-3" : density === "lg" ? "py-5" : "py-1"
                    }`}
                  >
                    {row?.[col.id]}
                  </td>
                ))}
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

export default TaskCompRate;
