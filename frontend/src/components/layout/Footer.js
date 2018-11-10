import React from "react";
import { Col, Container, Row, Footer } from "mdbreact";

export default () => {
  return (
    <Footer color="indigo" className="font-small pt-4 mt-4">
      <Container className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">Your voice is worth something</h5>
            <p>
              Get paid for good content. Post and upvote articles on Steemit to
              get your share of the daily rewards pool.
            </p>
          </Col>
          <Col md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Features</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Register</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Login</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright:
          <a href="/">1infinitycOrp</a>
        </Container>
      </div>
    </Footer>
  );
};
