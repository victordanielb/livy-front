import React, { Component } from 'react'
import '../viewAwait/style.css'
import { Done, Chat, Home } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { findUserById } from '../requests/request'

export default class ViewAwait extends Component {

    constructor(props){
        super(props)
        this.state = {
            phone : ""
        }
    }
    
    componentDidMount(){
        
        findUserById(parseInt(this.props.match.params.userId)).then(data => {
            this.setState({
                phone: data.phone
            })
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="content--done_icon">
                    <div className="external_done">
                        <div className="circle-done">
                            <Done/>
                        </div>
                    </div>
                </div>
                <div className="warning--done_request">
                    <h2>Sua solictação foi enviada ao trabalhador, ele ira entrar em contato para confirmar e agendar uma data 
                        <br /><br />Você também pode entrar em contato com ele através do nosso chat ou pelo telefone do trabalhador que esta abaixo!
                    </h2>
                </div>
                <div className="orange--separator_md">
                    <b>Telefone: {this.state.phone}</b>
                </div>
                <div className="buttonsGroup-one">
                    <div className="customButtom-one">
                    <Link to={`/${this.props.match.params.userId}/${this.props.match.params.anuncioId}/chat`}>
                        <b>Chat</b>
                        <Chat fontSize="large"></Chat>
                    </Link>
                    </div>
                    <div className="customButtom-two">
                    <Link to={`/${this.props.match.params.userId}`}>
                        <b>Inicio</b>
                        <Home fontSize="large"></Home>
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
}
