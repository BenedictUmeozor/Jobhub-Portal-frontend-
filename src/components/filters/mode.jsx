import React from "react";
import Select from "react-select";

const options = [
  { value: "on-site", label: "on-site" },
  { value: "remote", label: "remote" },
  { value: "hybrid", label: "hybrid" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    "&:hover": {
      borderColor: "#transparent", // Border color on hover
    },
    // Outline color on focus
    boxShadow: state.isFocused ? `0 0 0 1px #006064` : "none",
    borderColor: state.isFocused ? "#006064" : provided.borderColor,
    outline: state.isFocused ? 0 : provided.outline,
  }),
};

const ModeSelect = ({ value, onChange }) => {
  return (
    <Select
      options={options}
      styles={customStyles}
      defaultValue={value}
      onChange={(e) => onChange(e.value)}
      placeholder={"Select mode"}
    />
  );
};
export default ModeSelect;
