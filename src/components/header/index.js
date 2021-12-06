import React, { Component } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import ChatIcon from '@material-ui/icons/Chat';
import "./style.css";
import { Link } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <div className="headerIcon">
          <Link
            to={{
              pathname: `/${this.props.userId}/menu`,
              route: `/${this.props.route}`
            }}
          >
            <MenuIcon fontSize="large"></MenuIcon>
          </Link>
        </div>
        <Link to={`/${this.props.userId}/1/chat`}>
          <ChatIcon fontSize="large" className="icon-chat"></ChatIcon>
        </Link>
      </div>
    );
  }
}
