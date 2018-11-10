import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import ArticleFeed from "../articles/ArticleFeed";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

import Jumbotron from "./Jumbotron";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  async componentDidMount() {
    this.props.getPosts();
    if (this.props.auth.isAuthenticated) {
      this.setState({
        isAuthenticated: !this.state.isAuthenticated
      });
    }
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <ArticleFeed posts={posts} />;
    }

    return (
      <div>
        {this.state.isAuthenticated ? "" : <Jumbotron />}
        {postContent}
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Landing);
