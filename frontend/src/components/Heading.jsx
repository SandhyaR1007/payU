import PropTypes from "prop-types";
const Heading = ({ heading }) => {
  return <p className="text-3xl font-semibold pb-2">{heading}</p>;
};

export default Heading;

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
};
