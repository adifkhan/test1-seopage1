import React from "react";

const Tabbar = ({ tableTitles, activeTab, setActiveTab }) => {
  return (
    <div className="tab_bar pt-1 bg-light">
      <div className="d-flex border-top border-bottom p-2">
        <div
          className="no_scrollbar d-flex flex-wrap justify-content-center gap-1"
          style={{ height: "100px", overflowY: "scroll" }}
        >
          {tableTitles?.map((table) => (
            <span
              key={table.id}
              className={`table_title_btn  ${
                activeTab.id === table.id && "bg-info border-dark-subtle text-white"
              }`}
              id={table.id}
              onClick={() => setActiveTab(table)}
            >
              {table.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
