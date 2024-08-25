import PropTypes from "prop-types";
const SubHeading = ({ text }) => {
  return <p className="text-gray-500">{text}</p>;
};

export default SubHeading;

SubHeading.propTypes = {
  text: PropTypes.string.isRequired,
};
