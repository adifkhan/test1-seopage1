import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { swapColumns } from "../utils/myFunc";

const CustomizeColumn = ({
  setOpen,
  visibleCol,
  setVisibleCol,
  hiddenCol,
  setHiddenCol,
  columns,
  setColumns,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const updatedColumns = visibleCol.filter(
      (col) => !hiddenCol.some((hidden) => hidden.id === col.id)
    );
    setColumns(updatedColumns);
  }, [visibleCol, hiddenCol, setColumns]);

  // filter columns
  const filterColumn = (event) => {
    const { value, checked } = event.target;
    const columnToAdd = visibleCol.find((col) => col.id === value);

    if (checked) {
      setColumns((prev) => {
        const newColumns = [...prev];
        const indexInVisibleCol = visibleCol.findIndex((col) => col.id === value);
        newColumns.splice(indexInVisibleCol, 0, columnToAdd);
        return newColumns;
      });
      setHiddenCol((prev) => prev.filter((col) => col.id !== value));
    } else {
      setColumns((prev) => prev.filter((col) => col.id !== value));
      setHiddenCol((prev) => [...prev, columnToAdd]);
    }
  };

  return (
    <div style={{ width: "min(80vw, 500px)" }}>
      <div className="d-flex align-items-center justify-content-between border-bottom pb-1">
        <h4 className="fw-medium fs-5">Customize Columns</h4>
        <button type="button" className="btn btn-light" onClick={() => setOpen(false)}>
          <RxCross1 size={20} />
        </button>
      </div>
      <div className="p-3" style={{ maxHeight: "400px", overflowY: "scroll" }}>
        {visibleCol?.map((col, index) => (
          <div
            key={index}
            className="columns_stack"
            style={{ cursor: "pointer" }}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => swapColumns(draggedIndex, index, visibleCol, setVisibleCol)}
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                value={col.id}
                id={col.id}
                checked={columns.some((column) => column.id === col.id)}
                onChange={filterColumn}
              />
              {col.id === "no_of_projects_minimum_ideal_18" ||
              col.id === "total_project_value_minimum_ideal_8000_usd" ||
              col.id === "project_completion_rate_minimum_ideal_85" ? (
                <label
                  htmlFor={col.id}
                  style={{ fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
                  dangerouslySetInnerHTML={{ __html: col.label }}
                />
              ) : (
                <label
                  htmlFor={col.id}
                  style={{ fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
                >
                  {col.label}
                </label>
              )}
            </div>
            <span>
              <AiOutlineMenu />
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex align-items-center justify-content-between pt-2">
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-info btn-sm" onClick={() => setOpen(false)}>
            Customize
          </button>
          <button type="button" className="btn btn-light btn-sm" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
        <div className="d-flex align-items-center gap-2">
          <input type="checkbox" name="" id="preset" />
          <label htmlFor="preset" style={{ fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
            Save as Preset
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomizeColumn;
