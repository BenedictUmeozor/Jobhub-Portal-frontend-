import { XMarkIcon } from "@heroicons/react/24/solid";

const Details = ({ summary, onShow }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <XMarkIcon
          width={30}
          color="crimson"
          className="close-icon"
          onClick={onShow}
        />
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    </div>
  );
};

export default Details;
