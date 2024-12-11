import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const FilteringModal = ({ setOpen, columns, applyFilters }) => {
  const [error, setError] = useState("");
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState({
    label: "",
    option: "",
    value: "",
  });

  const handleAddFilter = () => {
    if (!filter.label || !filter.option || !filter.value) {
      setError("All fields are required");
      return;
    } else {
      setFilters([...filters, filter]);
      setFilter({ label: "", option: "", value: "" });
      setError("");
    }
  };

  const handleApplyFilter = () => {
    if (!filters.length && (!filter.label || !filter.option || !filter.value)) {
      setError("At least one filter required");
      return;
    }
    if (!filter.label || !filter.option || !filter.value) {
      applyFilters(filters);
      setError("");
      return;
    } else {
      applyFilters([...filters, filter]);
      setError("");
    }
  };

  return (
    <div style={{ width: "min(80vw, 600px)" }}>
      <div className="d-flex align-items-center justify-content-between border-bottom pb-1">
        <h4 className="fw-medium fs-5">Filter Columns</h4>
        <button type="button" className="btn btn-light" onClick={() => setOpen(false)}>
          <RxCross1 size={20} />
        </button>
      </div>
      {/* filter data  */}
      <div>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
          <div style={{ width: "100%" }}>
            <label>Column Name</label>
          </div>
          <div style={{ width: "100%" }}>
            <label>Filter</label>
          </div>
          <div style={{ width: "100%" }}>
            <label>Value</label>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          {filters?.map((fltr, i) => (
            <div key={i} className="d-flex align-items-center justify-content-between gap-2">
              <div style={{ width: "100%" }}>
                <select className="form-select form-select-sm" disabled>
                  <option value={fltr?.label}>{fltr?.label?.split("<")[0]}</option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <select className="form-select form-select-sm" disabled>
                  <option value="">{fltr.option}</option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="search_input mt-0"
                  placeholder="value"
                  value={fltr.value}
                  disabled
                />
              </div>
            </div>
          ))}
          <div className="d-flex align-items-center justify-content-between gap-2">
            <div style={{ width: "100%" }}>
              <select
                className="form-select form-select-sm"
                value={filter.label}
                onChange={(e) => setFilter({ ...filter, label: e.target.value })}
              >
                <option value=""></option>
                {columns?.map((col, i) => (
                  <option key={col.label} value={col.id}>
                    {col.label?.split("<")[0]}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: "100%" }}>
              <select
                className="form-select form-select-sm"
                value={filter.option}
                onChange={(e) => setFilter({ ...filter, option: e.target.value })}
              >
                <option value=""></option>
                {filterOptions?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: "100%" }}>
              <input
                type="text"
                className="search_input mt-0"
                value={filter.value}
                placeholder=""
                onChange={(e) => setFilter({ ...filter, value: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* add new filter  */}
      <div className="py-2">
        {error && (
          <div className="text-danger" style={{ fontSize: "12px" }}>
            {error}
          </div>
        )}
        <button
          type="button"
          className="btn btn-link btn-sm text-decoration-none px-0"
          onClick={handleAddFilter}
        >
          + Add Filter
        </button>
      </div>

      {/* apply filter */}
      <div className="d-flex gap-2">
        <button type="button" className="btn btn-info btn-sm" onClick={handleApplyFilter}>
          Apply Filter
        </button>
        <button type="button" className="btn btn-light btn-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FilteringModal;

const filterOptions = [
  "Greater Than",
  "Less Than",
  "Equal To",
  "Not Equal To",
  "Contains",
  "Begins With",
];
