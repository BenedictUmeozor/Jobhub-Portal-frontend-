import React from "react";
import Select from "react-select";

const options = [
  { value: "technlogy", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "education", label: "Education" },
  { value: "creative and media", label: "Creative and media" },
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

const CategorySelect = ({ value, onChange }) => {
  return (
    <Select
      options={options}
      styles={customStyles}
      defaultvalue={value}
      onChange={(e) => onChange(e.value)}
      placeholder={"Select category"}
    />
  );
};

export default CategorySelect;
