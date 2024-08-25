import PropTypes from "prop-types";

const InputBox = ({ label, name, handleChange, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type={type}
        placeholder={label}
        name={name}
        className="border border-slate-200 rounded-md p-2 outline-none"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default InputBox;

InputBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.string,
};
