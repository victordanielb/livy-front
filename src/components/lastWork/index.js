import React, { Component } from 'react'
import ReturnHeader from '../returnHeader';
import './style.css'
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

export default class WorkComent extends Component {
    componentDidMount(){
    }
  render() {
    return (
      <div className="containerMenu">
        <ReturnHeader lastRoute={`/${this.props.match.params.userId}/servicos/${this.props.match.params.categoria}/${this.props.match.params.perfil}`}></ReturnHeader>
        <div className="arrowDiv">
          <ArrowBackIos fontSize="large"></ArrowBackIos>
          <ArrowForwardIos fontSize="large"></ArrowForwardIos>
        </div>
        <div className="perfilAvaliacao">
          <div className="perfilStars">
            <Typography component="legend">Avaliação</Typography>
            <Rating value={5} readOnly></Rating>
          </div>
        </div>
        <div className="lastWorkImage">
          <img src={require("../../image/defaultImg.png")}></img>
        </div>

        <div className="workComment">
          no work
        </div>
        <div className="workUser">
          Vito
        </div>
      </div>
    )
  }
}
