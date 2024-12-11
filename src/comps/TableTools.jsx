import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImMenu } from "react-icons/im";
import CustomizeColumn from "../modals/CustomizeColumn";
import Modal from "../modals/Modal";
import FilteringModal from "../modals/FilteringModal";

const TableTools = ({
  density,
  setDensity,
  visibleCol,
  setVisibleCol,
  columns,
  setColumns,
  applyFilters,
}) => {
  const [openCustomizeModal, setOpenCustomizeModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [hiddenCol, setHiddenCol] = useState([]);

  return (
    <div className="d-flex justify-content-between gap-3 p-2">
      <div>
        <button type="button" className="btn btn-info" onClick={() => setOpenFilterModal(true)}>
          Filter Columns
        </button>
      </div>
      <div className="d-flex align-items-center gap-3 ">
        <div className="d-flex align-items-center gap-2">
          <span
            className="dense_button border px-2 py-1 rounded"
            style={{ cursor: "pointer", color: density === "lg" ? "black" : "lightgray" }}
            onClick={() => setDensity("lg")}
          >
            <AiOutlineMenu size={24} />
          </span>
          <span
            className="dense_button border px-2 py-1 rounded"
            style={{ cursor: "pointer", color: density === "md" ? "black" : "lightgray" }}
            onClick={() => setDensity("md")}
          >
            <GiHamburgerMenu size={24} />
          </span>
          <span
            className="dense_button border px-2 py-1 rounded"
            style={{ cursor: "pointer", color: density === "sm" ? "black" : "lightgray" }}
            onClick={() => setDensity("sm")}
          >
            <ImMenu size={24} />
          </span>
        </div>
        <button type="button" className="btn btn-dark" onClick={() => setOpenCustomizeModal(true)}>
          Customize
        </button>
      </div>

      {openFilterModal && (
        <Modal setOpen={setOpenFilterModal}>
          <FilteringModal
            setOpen={setOpenFilterModal}
            columns={columns}
            applyFilters={applyFilters}
          />
        </Modal>
      )}
      {openCustomizeModal && (
        <Modal setOpen={setOpenCustomizeModal}>
          <CustomizeColumn
            setOpen={setOpenCustomizeModal}
            visibleCol={visibleCol}
            setVisibleCol={setVisibleCol}
            hiddenCol={hiddenCol}
            setHiddenCol={setHiddenCol}
            columns={columns}
            setColumns={setColumns}
          />
        </Modal>
      )}
    </div>
  );
};

export default TableTools;
