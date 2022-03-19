import React from "react";
import { Layout } from "antd";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import Books from "../views/Books";
import CreateBook from "../views/books/CreateBook";
import EditBook from "../views/books/EditBook";
import About from "../views/About";
// const { Header, Footer, Sider, Content } = Layout;

function Main() {
  return (
    <div className="text-left mt-20">
      <h1 className="text-2xl">Sample website</h1>
      <div className="mt-2">
        This is a sample website that is written with REACT JS.I also use react
        hooks.
      </div>
      <div className="mt-1">
        The backend of this website is nodejs express api server. I have used
        typescript for better programming.
      </div>
      <div>
        You can read books and also create new book, update existing book and
        delete book.
      </div>
      <div className="mt-1">
        I implement jwt authentication but I have no enough time to complete
        that.
      </div>
    </div>
  );
}

function Home(props) {
  const { pathname } = useLocation();

  return (
    // <div>
    <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SAMPLE SITE</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/books">
                Books
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/about">
                  More deets
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Main></Main>} />
              <Route path="/books" element={<Books></Books>} />
              <Route path="/books/create" element={<CreateBook></CreateBook>} />
              <Route path="/books/edit/:id" element={<EditBook></EditBook>} />
              <Route path="/about" element={<About></About>} />
            </Routes>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="footer-copyright text-center py-3 mt-20">
              © 2022 Copyright:
              <a href="/"> sampleWebsite.com</a>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>

    // </div>
  );
}

export default Home;
