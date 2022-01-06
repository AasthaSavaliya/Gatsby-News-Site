import * as React from "react"
import {Container, Nav, Navbar} from "react-bootstrap";

// markup
const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/news">News</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header