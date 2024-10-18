import React from "react";
import "./InsightItem.css";
import { FaArrowRight } from "react-icons/fa";

const InsightItem = ({title, count, toggle}) => {
  return (
    <div className="insight-item">
      <p className="title">{title}</p>
      <div className="count-icon" onClick={toggle}>
        <p>{count || undefined}</p>
        <FaArrowRight size={14} />
      </div>
    </div>
  );
};

export default InsightItem;
