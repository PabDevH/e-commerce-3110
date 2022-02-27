import {Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import CartIcon from "../icon/CartIcon";
import { Link, NavLink } from "react-router-dom";
import "../css/NavLink.css"
const NavBar = () => {
 
  
  return (
    <div>
   <Navbar bg="dark" variant="dark" >
      <Container fluid>
        <Navbar.Brand >
          <NavLink 
            to="/"
            className="Nav_link"
            activeclassname="activeRoute"
            activestyle={{ color: 'teal' }}
          >
          Outlander NFT
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} 
              to="/" 
              style={{ textDecoration: 'none' }}
            >
              Home
            </Nav.Link>
           
            <NavDropdown title="Explore" id="navbarScrollingDropdown" >
            <NavDropdown.Item as={Link}
              to="/categories/Music" 
              style={{ textDecoration: 'none' }}
            >
             Music
            </NavDropdown.Item>
            <NavDropdown.Item as={Link}
              to="/categories/Sport" 
              style={{ textDecoration: 'none' }}
            >
              Sport
            </NavDropdown.Item>
            <NavDropdown.Item as={Link}
              to="/categories/Trading%20Cards" 
              style={{ textDecoration: 'none' }}
            >
              Trading Cards
            </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <CartIcon />
            
          </Nav>
          
          
        </Navbar.Collapse>
      </Container>
  </Navbar>
</div>
  );
};

export default NavBar;