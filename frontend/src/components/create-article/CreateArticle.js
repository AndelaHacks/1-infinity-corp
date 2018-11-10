import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import EOSIOClient from "../../utils/eosio-client";
import IOClient from "../../utils/io-client";

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      content: "",
      tags: ""
    };

    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;
    this.eosio = new EOSIOClient(contractAccount);
    this.io = new IOClient();

    this.createPost = this.createPost.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const { user } = this.props.auth;

    console.log(user);

    const post = { ...this.state, user: user.id };

    this.createPost(post);
  };

  createPost = async post => {
    console.log(post);
    try {
      const newPost = {
        ...post,
        _id: {
          timestamp: Math.floor(Date.now() / 1000),
          author: process.env.REACT_APP_EOSIO_ACCOUNT
        },
        author: process.env.REACT_APP_EOSIO_ACCOUNT
      };
      console.log("next make transaction");
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "newarticle",
        {
          timestamp: newPost._id.timestamp,
          author: newPost._id.author,
          ...post
        }
      );
      console.log("next set state");

      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="login pt-5" style={{ height: "75vh" }}>
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-8 m-auto">
              {" "}
              <h2 class="text-center">Create Article</h2>
              <p className="lead text-center">Whats your story</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Category"
                  name="category"
                  type="text"
                  value={this.state.category}
                  onChange={this.onChange}
                  info="Enter the category name that best suites your content."
                />

                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                />

                <TextAreaFieldGroup
                  placeholder="Content"
                  name="content"
                  value={this.state.content}
                  onChange={this.onChange}
                  info="Write your story"
                />
                <TextFieldGroup
                  placeholder="Tags (eg. media,hosptality,travel...)"
                  name="tags"
                  type="text"
                  value={this.state.tags}
                  onChange={this.onChange}
                  info="tags (up to 5 tags), seperate tags using ','"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(CreateArticle);
