import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Col,
  Mask,
  Fa,
  View,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Popover,
  PopoverBody,
  PopoverHeader,
  Tooltip
} from "mdbreact";
import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs"; // https://github.com/EOSIO/eosjs
import { TextDecoder, TextEncoder } from "text-encoding";

import { getCurrentProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import isEmpty from "../../validation/is-empty";

const accounts = [
  {
    name: "bobross",
    privateKey: "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5",
    publicKey: "EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"
  },
  {
    name: "janesmith",
    privateKey: "5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg",
    publicKey: "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"
  },
  {
    name: "sampeters",
    privateKey: "5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7",
    publicKey: "EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"
  },
  {
    name: "willthompson",
    privateKey: "5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx",
    publicKey: "EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"
  },
  {
    name: "sarabrown",
    privateKey: "5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg",
    publicKey: "EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"
  },
  {
    name: "lisawalters",
    privateKey: "5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK",
    publicKey: "EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"
  }
];

// eosio endpoint
const endpoint = "http://localhost:8888";
class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal15: false,
      accountname: "",
      privateKey: "",
      review: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, user } = this.props.auth;
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      profile.accountname = !isEmpty(profile.accountname)
        ? profile.accountname
        : "";
      profile.privateKey = !isEmpty(profile.privateKey)
        ? profile.privateKey
        : "";

      this.setState({
        privateKey: profile.privateKey,
        accountname: profile.accountname
      });
    }
  }

  async onSubmit(e) {
    e.preventDefault();

    const { post } = this.props;

    const privateKey = this.state.privateKey;

    let actionData = {
      _id: {
        timestamp: post._id.timestamp,
        author: process.env.REACT_APP_EOSIO_ACCOUNT
      },
      author: process.env.REACT_APP_EOSIO_ACCOUNT,
      timestamp: post._id.timestamp,
      reviewer: this.state.accountname,
      review: this.state.review
    };

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    console.log(actionData);
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "newsaccount",
              name: "review",
              authorization: [
                {
                  actor: actionData.reviewer,
                  permission: "active"
                }
              ],
              data: actionData
            }
          ]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        }
      );
      console.log(result);
      window.location.reload();
    } catch (e) {
      console.log("Caught exception: " + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle(nr) {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  render() {
    const { post, auth } = this.props;
    const { isAuthenticated, user } = auth;

    return (
      <Col lg="4" md="12" className="mb-lg-0 mb-4">
        <View hover className="rounded z-depth-2 mb-4" waves>
          <img
            className="img-fluid"
            src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg"
          />
          <Mask overlay="white-slight" />
        </View>
        <a className="pink-text d-flex justify-content-between">
          <h6 className="font-weight-bold mb-3">
            <Fa icon="map" className="pr-2" />
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </h6>
          <h6 className=" mb-3">
            <Fa icon="users" className="pr-2" />
            Total no. of reviews
            <p style={{ color: "gray" }}>{post.reviews.length}</p>
          </h6>
        </a>
        <h4 className="font-weight-bold mb-3">
          <strong>{post.title}</strong>
        </h4>
        <p>
          by <a className="font-weight-bold">{post.user.name}</a>,{" "}
          {new Date(post._id.timestamp * 1000).toString()}
        </p>
        <p className="dark-grey-text">{post.review}</p>
        <Button color="pink" rounded size="md">
          Read more
        </Button>
        {user.role === "verifier" ? (
          <Button
            color="indigo"
            rounded
            size="md"
            onClick={() => this.toggle(15)}
          >
            Verify Content
          </Button>
        ) : (
          ""
        )}

        <Modal isOpen={this.state.modal15} toggle={() => this.toggle(15)}>
          <ModalHeader toggle={() => this.toggle(15)}>Review</ModalHeader>
          <ModalBody>
            <Tooltip
              placement="top"
              tag="a"
              component="span"
              tooltipContent="Tooltip"
            >
              Verify that this news is authentic
            </Tooltip>{" "}
            <hr />
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Account Name"
                name="accountname"
                type="text"
                disabled="disabled"
                value={this.state.accountname}
                info="Account Name"
              />

              <TextAreaFieldGroup
                placeholder="review"
                name="review"
                value={this.state.review}
                onChange={this.onChange}
                info="Whats your view concerning this post?"
              />
              <hr />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            <hr />
          </ModalBody>
        </Modal>
      </Col>
    );
  }
}

Article.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(Article));
