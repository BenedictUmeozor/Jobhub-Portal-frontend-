import Select from "react-select";

const options = [
  { value: "full-time", label: "full-time" },
  { value: "permanent", label: "permanent" },
  { value: "contract", label: "contract" },
  { value: "internship", label: "internship" },
  { value: "part-time", label: "part-time" },
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

const TypeSelect = ({ value, onChange }) => {
  return (
    <Select
      options={options}
      styles={customStyles}
      defaultValue={value}
      onChange={(e) => onChange(e.value)}
    />
  );
};

export default TypeSelect;
