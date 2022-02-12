import { FormControl, Button, Container, Form, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import CartIcon from "../icon/CartIcon";
import { Link, NavLink } from "react-router-dom";
import './NavLink.css';

const NavBar = () => {
  const activeStyle = {
    color: "red",
  };
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
          Outloander NFT
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link >
              <NavLink 
              to="/" 
              style={{ textDecoration: 'none' }}
              >
                Home
              </NavLink>
            </Nav.Link>
           
            <NavDropdown title="Explore" id="navbarScrollingDropdown" >
            <NavDropdown.Item>
              <NavLink 
              to="/categories/Music" 
              style={{ textDecoration: 'none' }}
              >
                Music
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
            <NavLink 
            to="/categories/Sport" 
            style={{ textDecoration: 'none' }}
            >
              Sport
            </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
            <NavLink 
            to="/categories/Trading%20Cards" 
            style={{ textDecoration: 'none' }}
            >
              Trading Cards
            </NavLink>
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
          
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Items, Collections..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" >Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
  </Navbar>
</div>
  );
};

export default NavBar;