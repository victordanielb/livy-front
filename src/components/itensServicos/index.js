import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
export default class ItensServico extends Component {
  render() {
    return (
      <div className="containerServicos">
        <Link  to={`${this.props.userId}/servicos/${this.props.route}`}>
          <div className="imgContent">
            <img src={require(`../../image/${this.props.itenImg}`)}></img>
          </div>
          <div className="txtContent">
            <b>{this.props.itenName}</b>
          </div>
          <p>{this.props.description}</p>
        </Link>
      </div>
    );
  }
}
