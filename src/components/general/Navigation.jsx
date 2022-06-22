import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Navbar, Container, Nav } from 'react-bootstrap';
import { useEffect } from 'react';

const Navigation = () => {
  const { info } = useSelector((state) => state.user);
  const navbar = useRef(null);

  useEffect(() => {
    // Add the height of navbar to margin top
    document.body.style.marginTop = navbar.current.clientHeight + 'px';
  }, [navbar]);

  return (
    <Navbar bg='light' expand='lg' fixed='top' ref={navbar}>
      <Container fluid='lg'>
        <Navbar.Brand href='/welcome' className='d-none d-md-block'>
          Sales Prediction using Gradient Boost Model
        </Navbar.Brand>
        <Navbar.Brand href='/welcome' className='d-block d-md-none'>
          SPGBM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        {!info.fname ? (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/welcome'>Home</Nav.Link>
              <Nav.Link href='/authenticate/login'>Login</Nav.Link>
              <Nav.Link href='/authenticate/register'>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/dashboard/products'>Products</Nav.Link>
              <Nav.Link href='/dashboard/account-settings'>
                Account Settings
              </Nav.Link>
              <Nav.Link
                href='/welcome'
                onClick={() => {
                  localStorage.setItem('SPGBMToken', '');
                }}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
