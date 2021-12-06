import React, { Component } from 'react'
import './style.css'
import Header from './../header/index';
import InputMask from 'react-input-mask';
import { findUserById, updateUser } from '../requests/request'
import { Link } from "react-router-dom";
import { Done } from "@material-ui/icons";

export default class ViewPerfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: "",
      name: "",
      email: "",
      password: "",
      birth_date: "",
      phone: ""
    }
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  componentDidMount() {
    findUserById(parseInt(this.props.match.params.userId)).then(data => {
      this.setState({
        image: data.file.length > 0 ? data.file[0].path.replace("localhost", "ec2-3-142-150-245.us-east-2.compute.amazonaws.com") : null,
        name: data.name,
        email: data.email,
        password: data.password,
        birth_date: data.birth_date,
        phone: data.phone,
      })
    });
  }

  handleSubmitForm() {
    updateUser(this.state, this.props.match.params.userId)
  }

  render() {
    const { image, name, email, password, birth_date, phone } = this.state
    return (
      <form>
        <div className="container">
          <Header userId={`${this.props.match.params.userId}`} route={`${this.props.match.params.userId}/perfil`}></Header>
          <div className="perfilImage">
          {
          
              !image
              ?
                <img src={require("../../image/defaultImg.png")}></img>
              :
                <img src={image}></img>
            }
          </div>
          <div className="cadUser">
            <div className="rowLine">
              <div className="column">
                <input name="name" type="text" size="20" value={name}  onChange={e => this.setState({ name: e.target.value })} placeholder="Nome Completo" required></input>
              </div>
            </div>
            <div className="rowLine">
              <div className="column">
                <input name="cpf" type="email" size="30" placeholder="Email" value={email} onChange={e => this.setState({ email: e.target.value })} required></input>
              </div>
            </div>
            <div className="rowLine">
              <div className="column">
                <input name="password" type="password" size="30" value={password} placeholder="Senha" onChange={e => this.setState({ password: e.target.value })} required></input>
              </div>
            </div>
            <div className="rowLine">
              <div className="column">
                <label for="dtNasc">Data de Nascimento</label>
                <input name="dtNasc" type="date" size="30" placeholder="Data de Nascimento" value={birth_date.split("T")[0]} onChange={e => this.setState({ birth_date: e.target.value })} required></input>
              </div>
            </div>
            <div className="rowLine">
              <div className="column">
                <label for="cel">Num Celular</label>
                <InputMask name="Celular" mask="(99) 99999-9999" onChange={e => this.setState({ phone: e.target.value })} value={phone} ></InputMask>
              </div>
            </div>
          </div>
          <div className="buttonsGroup-one">
            <div className="customButtom-two" onClick={this.handleSubmitForm}>
              <Link>
                <b>Salvar</b>
                <Done fontSize="large"></Done>
              </Link>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
