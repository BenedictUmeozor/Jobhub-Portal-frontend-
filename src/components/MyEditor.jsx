import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = ({ content, handleChange }) => {
  return (
    <ReactQuill
      value={content}
      onChange={(newValue) => handleChange(newValue)}
    />
  );
};

export default MyEditor;
