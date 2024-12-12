import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import TableTools from "../comps/TableTools";
import { conditionalColumnFiltering, swapColumns } from "../utils/myFunc";

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
  { id: "total_milestone", label: "Total Milestone" },
  { id: "completed_milestone_task_wise", label: "Completed Milestone (Task Wise)" },
  { id: "released_milestone", label: "Released Milestone" },
  { id: "milestone_awaiting_payment", label: "Milestone Awaiting Payment" },
  { id: "milestone_release_time", label: "Milestone Release Time" },
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
  { id: "status", label: "Status" },
  { id: "project_completion_time", label: "Project Completion Time" },
];
const MilestoneCompRate = ({ data }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const filteredData = conditionalColumnFiltering({ data, filters });
    setVisibleData(filteredData);
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
                  onMouseDown={(event) => {
                    event.stopPropagation();
                    handleMouseDown(event, index);
                  }}
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

export default MilestoneCompRate;
