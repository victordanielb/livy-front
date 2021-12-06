import React, { Component } from "react";

import "./style.css";

import Data from "../auxFiles/work.json";
import Header from "./../header/index";
import ItensServico from "./../itensServicos/index";
import { Search } from "@material-ui/icons";

import { findServices } from '../requests/request'

let works = Data.works;

export default class ViewServicos extends Component {

  constructor(props){
    super(props);
    this.state = {
      pesquisa: ""
    }

    this.searchType = this.searchType.bind(this);
  }

  removerAcentos( newStringComAcento ) {
    var string = newStringComAcento;
    var mapaAcentosHex 	= {
      a : /[\xE0-\xE6]/g,
      e : /[\xE8-\xEB]/g,
      i : /[\xEC-\xEF]/g,
      o : /[\xF2-\xF6]/g,
      u : /[\xF9-\xFC]/g,
      c : /\xE7/g,
      n : /\xF1/g
    };
  
    for ( var letra in mapaAcentosHex ) {
      var expressaoRegular = mapaAcentosHex[letra];
      string = string.replace( expressaoRegular, letra );
    }
  
    return string;
  }

  searchType() {
    const search = this.state.pesquisa
    const userId = this.props.match.params.userId
    findServices().then( response => {
      const val = response.filter( v => {
        return this.removerAcentos(v.specialization.toLowerCase()).indexOf(this.removerAcentos(search.toLocaleLowerCase())) > -1
      })
      if(val.length > 0) {
        window.location.href = `${userId}/servicos/${val[0].type}`
      }
    })
  }

  render() {
    return (
      <div className="container">
        <Header userId={`${this.props.match.params.userId}`} route={`${this.props.match.params.userId}`}></Header>
        <div className="content">
          <div className="inputWithIcon">
            <input type="text" id="inputSearch" onChange={e => this.setState({ pesquisa: e.target.value })}></input>
            <div className="buttonIcon" onClick={ () => this.searchType()}>
            <Search></Search>
            </div>
          </div>

          <div className="rowContent">
            {works.map((v, i) => {
              return (
                <ItensServico
                  key={i}
                  itenName={v.name}
                  itenImg={v.img}
                  route={v.name}
                  description={v.description}
                  userId={this.props.match.params.userId}
                ></ItensServico>
              );
            })}
          </div>
        </div>
        <footer></footer>
      </div>
    );
  }
}
