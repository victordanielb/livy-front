import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

export default class ItensAnuncios extends Component {


  render() {
    const classNormal = `align-icon_text ${this.props.className}`
    return (
      <div className="containerItensAnuncios" onClick={ this.props.onClick === undefined ? null : () => { this.props.onClick() } }> 
        
        <Link to={this.props.route} >
          <div className="itensAnunciosImg">
            {
              this.props.image === null 
              ?
                <img src={require("../../image/defaultImg.png")}></img>
              :
                <img src={this.props.image}></img>
            }
          </div>
          <div className="itensAnunciosTxt">
            <b>{this.props.user_name}</b><br />
            { this.props.type === undefined ? null : `Tipo: ${this.props.type}` }
            { this.props.type === undefined ? null : <br /> }
            Especialidade: {this.props.specialization}<br />
            Idade: {this.props.age}<br />
            Tipo Cobranca: {this.props.price_type}<br />
            Valor: {this.props.price}<br />
          </div>
          <div className="icons_notification">
              { 
                this.props.pending 
                ?
                  <div className={ classNormal }>
                    {this.props.icon}
                  </div>
                :
                  null
              }
          </div>
        </Link>
      </div>
    )
  }
}