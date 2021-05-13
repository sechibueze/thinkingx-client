import { FaThinkPeaks } from "react-icons/fa";
import { PROJECT_NAME } from "../../constants";

const Logo = ({ showProjectName, ...props }) => (
  <>
    <span>
      <FaThinkPeaks {...props} />{" "}
      {showProjectName && (
        <span style={{ fontWeight: "bolder" }}> {PROJECT_NAME} </span>
      )}
    </span>
  </>
);

export default Logo;
