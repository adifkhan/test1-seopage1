import React, { useEffect, useState } from "react";
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
  { id: "no_of_upsell_from_that_project", label: "No. of Upsell From That Project" },
  { id: "value_of_upsale", label: "Value of Upsale" },
  { id: "no_of_cross_sale_from_that_project", label: "No. of Cross Sale From That Project" },
  { id: "value_of_cross_sale", label: "Value of Cross Sale" },
];

const UpAndCrossSales = ({ data }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [visibleCol, setVisibleCol] = useState([...headCells]);
  const [columns, setColumns] = useState([...visibleCol]);
  const [searchData, setSearchData] = useState({ id: "", text: "" });
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [density, setDensity] = useState("md");

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

  const swapColumns = (fromIndex, toIndex) => {
    const updatedHeaders = [...columns];

    // Swap headers
    const [movedHeader] = updatedHeaders.splice(fromIndex, 1);
    updatedHeaders.splice(toIndex, 0, movedHeader);

    setColumns(updatedHeaders);
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
        />
      </div>
      <Table bordered hover style={{ margin: "176px 5px 5px" }}>
        <thead align="center" className="sticky_top">
          <tr className="table_head">
            {columns.map((col, index) => (
              <th
                key={index}
                className="fw-medium bg-info p-1"
                style={{ fontSize: "14px", cursor: "pointer" }}
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

export default UpAndCrossSales;
