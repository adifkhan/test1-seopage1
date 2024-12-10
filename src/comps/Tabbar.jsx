import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Tabbar = () => {
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState("tab-1");

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + 400,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - 400,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mb-1 mx-1">
      <div className="d-flex border-top border-bottom">
        <div className="d-flex overflow-hidden" ref={scrollRef}>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-1" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-1"
            onClick={() => setActiveTab("tab-1")}
          >
            Predefined Cycle
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-2" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-2"
            onClick={() => setActiveTab("tab-2")}
          >
            No. of Projects
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-3" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-3"
            onClick={() => setActiveTab("tab-3")}
          >
            Total Project Value
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-4" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-4"
            onClick={() => setActiveTab("tab-4")}
          >
            Total Released Amount
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-5" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-5"
            onClick={() => setActiveTab("tab-5")}
          >
            No. of Fully Completed Project
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-6" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-6"
            onClick={() => setActiveTab("tab-6")}
          >
            Project Completion Rate
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-7" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-7"
            onClick={() => setActiveTab("tab-7")}
          >
            Milestone Completion Rate
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-8" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-8"
            onClick={() => setActiveTab("tab-8")}
          >
            Task Completion Rate
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-9" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-9"
            onClick={() => setActiveTab("tab-9")}
          >
            Average Project Completion Time
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-10" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-10 "
            onClick={() => setActiveTab("tab-10")}
          >
            No of Upsale/Cross Sales
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-11" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-11"
            onClick={() => setActiveTab("tab-11")}
          >
            Value of Upsale/Crosssale
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-12" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-12"
            onClick={() => setActiveTab("tab-12")}
          >
            Canceled Projects
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-13" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-13"
            onClick={() => setActiveTab("tab-13")}
          >
            Delayed Projects
          </span>
          <span
            className={`px-3 py-2 d-block text-nowrap ${
              activeTab === "tab-14" && "bg-info-subtle fw-medium"
            }`}
            style={{ cursor: "pointer" }}
            id="tab-14"
            onClick={() => setActiveTab("tab-14")}
          >
            Delayed Completed
          </span>
        </div>
        <div
          className="d-flex align-items-center gap-3 ps-3 pe-6 border-start"
          style={{ width: "200px" }}
        >
          <span
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={scrollLeft}
          >
            <IoIosArrowBack />
          </span>
          <span
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={scrollRight}
          >
            <IoIosArrowForward />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
