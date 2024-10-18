import React, { useState } from "react";
import "./FilterDropdown.css";

function FilterDropdown({ options, onFilterChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onFilterChange(value);
  };

  return (
    <div className="dropdown-container">
        <select value={selectedValue} onChange={handleFilterChange}>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
    </div>
  );
}

export default FilterDropdown;
