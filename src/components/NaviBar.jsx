import { NavLink } from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';

function NaviBar () {
    return (
        <Navbar className="bg-info" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/customers" activeclassname="active">
              Customers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" activeclassname="active">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/orders" activeclassname="active">
              Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  
  export default NaviBar;