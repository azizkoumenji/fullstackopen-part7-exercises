import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavBar = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Link to={"/"}>Blogs</Link> <Link to={"/users"}>Users</Link>
      <p>{user.name} is logged in.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
