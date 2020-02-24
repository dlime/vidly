import React from "react";
import _ from "lodash";

const InputForm = ({ label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{_.startCase(label)}</label>
      <input
        value={value}
        onChange={onChange}
        name={label}
        type={label === "password" ? "password" : "text"}
        className="form-control"
        id={label}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputForm;
