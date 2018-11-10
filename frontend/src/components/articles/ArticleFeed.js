import React, { Component } from "react";
import PropTypes from "prop-types";

import { Container, Row } from "mdbreact";
import Article from "./Article";

class ArticleFeed extends Component {
  render() {
    const { posts } = this.props;

    const postlist = posts.map(post => <Article key={post._id} post={post} />);

    return (
      <Container>
        <h2 className="h1-responsive font-weight-bold text-center my-5 pt-5">
          Recent posts
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <Row>{postlist}</Row>
      </Container>
    );
  }
}

ArticleFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default ArticleFeed;
