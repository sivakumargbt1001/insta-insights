import React from "react";
import "./SearchField.css";

const SearchField = ({ change, term, submit }) => {
  return (
    <input
      type="text"
      placeholder="Enter any username"
      value={term}
      onKeyDown={submit}
      onChange={(e) => change(e.target.value)}
    />
  );
};

export default SearchField;
