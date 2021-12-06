import React, { Component } from "react";
import Messages from "./messages/index";
import "./style.css";
import ReturnHeader from '../returnHeader';
import { CheckCircle, NotInterested } from '@material-ui/icons';
import socketIOClient from "socket.io-client";

// import auxMessage from '../auxFiles/messages.json'

const socket = socketIOClient('http://localhost:3001');

export default class Chat extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      sendMessage: false,
      message: "",
      messages: []
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    socket.on('receivedMessage', function(message){
      console.log('react recebeu');
      this.renderMessage(message);
    }.bind(this));
  }

  handleChangeText(e) {
    if(e.target.value.length > 0){
      this.setState(
        {
          sendMessage: true,
          message: e.target.value
        }
      )
    }else {
      this.setState(
        {
          sendMessage: false,
          message: e.target.value
        }
      )
    }
  }

  renderMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });

  }

  sendMessage() {
    // var contentMessage = document.getElementsByClassName('contentMessages')[0];

    // var messages = this.state.messages;
    // var objectMessage = {
    //   "id": this.props.match.params.userId,
    //   "type": "none",
    //   "anuncio": "363",
    //   "message": this.state.message
    // }

    // messages.push(objectMessage);

    // this.setState({
    //   messages: messages,
    //   message: "",
    //   sendMessage: false
    // }) 
    // setTimeout(() => {
    //   contentMessage.scrollTo(0, contentMessage.scrollHeight);
    // }, 100)
    
    var message = this.state.message || '';

    if (message.length) {
        var messageObject = {
          "id": Number(this.props.match.params.userId),
          "type": "none",
          "anuncio": "363",
          "message": message
        };
        
        this.renderMessage(messageObject);
        
        console.log('react enviou');
        socket.emit('sendMessage', messageObject);
    };
  }
  
  render() {
    const { messages } = this.state;

    console.log(messages);

    return (
      <div className="container">
        <ReturnHeader lastRoute={`/${this.props.match.params.userId}`}></ReturnHeader>
        <div className="contentMessages">
        {
          messages.map((v , i) => {
            return(
              <Messages key={i} index={i+1} user={v.type} userId={v.id} mensagem={v.message}></Messages>
            )
          })
        }
        </div>
        <div className="send-messages">
          <textarea onChange={this.handleChangeText} id="messageBox" value={this.state.message}></textarea>
          {
            this.state.sendMessage 
            ? 
              <CheckCircle onClick={this.sendMessage}></CheckCircle>
            :
              <NotInterested id="notInteress"></NotInterested>
          }
          
        </div>
      </div>
    );
  }
}
