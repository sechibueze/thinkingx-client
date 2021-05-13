import { FaThinkPeaks } from "react-icons/fa";
import { PROJECT_NAME } from "../../constants";

const Logo = ({ showProjectName, ...props }) => (
  <>
    {" "}
    <FaThinkPeaks {...props} />{" "}
    {showProjectName && <span> {PROJECT_NAME} </span>}{" "}
  </>
);

export default Logo;
