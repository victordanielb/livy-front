import React, { Component, Form } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import { login } from '../requests/request'
import axios from 'axios';
import { url } from '../requests/url';

// import io from 'socket.io-client';
// const socket = io('http://localhost:3002');

// socket.on('connect', function(){});

// socket.on('newUser', (user) => console.log(user))


export default class LoginScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        login(this.state)
    }

    render() {
        return (

            <form onSubmit={ e => {
                e.preventDefault() 
                this.handleSubmit()
                }}>
                <div className="container">
                    <div clxwassName="contentTituloAnalitics">
                        <div className="title">
                            <b>Livy!</b>
                        </div>
                    </div>
                    <div className="contentOrange">
                        <input
                            type="email"
                            placeholder="Endereço de e-mail"
                            onChange={ e => this.setState({ email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Insira sua senha"
                            onChange={ e => this.setState({ password: e.target.value })}
                        />
                        <button type="submit">Clique aqui</button>
                        <Link to="/signup/user">Criar conta grátis</Link>
                    </div>
                </div>
            </form>
        )
    }
}
