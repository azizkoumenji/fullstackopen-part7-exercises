import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Avatar, NavbarBrand } from "@nextui-org/react";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

const NavBar = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">BLOGS</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="font-semibold hover:text-primary-400" to={"/"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="font-semibold hover:text-primary-400" to={"/users"}>
            Users
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Avatar showFallback />
        <NavbarItem>
          <Link className="font-semibold" to={`/users/${user.id}`}>
            {user.name}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="danger"
            variant="ghost"
            className="font-semibold"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
