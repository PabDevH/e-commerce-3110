import { FormControl, Button, Container, Form, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import CartIcon from "../icon/CartIcon";



const NavBar = () => {
  
  return (
  <Navbar bg="dark" variant="dark">
    <Container fluid>
      <Navbar.Brand href="#">Outloander NFT</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Stats</Nav.Link>
          <Nav.Link href="#action3">Create</Nav.Link>
          <NavDropdown title="Explore" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action/3.1">Art</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Collectibls </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Music</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Sport</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.5">Trading Cards</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.6">Photography</NavDropdown.Item>
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
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
</Navbar>

  );
};

export default NavBar;