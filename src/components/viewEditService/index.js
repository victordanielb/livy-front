import React, { Component } from 'react'
import ReturnHeader from '../returnHeader/index'
import { findServicesById, deleteServiceById, updateService } from '../requests/request'
import { Done, Close } from "@material-ui/icons";
import Data from '../auxFiles/work'
import { Link } from "react-router-dom";
import './style.css'

let work = Data.works;

export default class ViewEditFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: parseInt(this.props.match.params.userId),
            type: "",
            specialization: "",
            price_type: "",
            price: 0.0,
            description: "",
            created_at: this.nowDate(),
            updated_at: "",
        }

        this.handleSubmitForm = this.handleSubmitForm.bind(this)
        this.deleteService = this.deleteService.bind(this)
    }

    componentDidMount() {
        findServicesById(this.props.match.params.serviceId).then(data => {
            this.setState({
                type: data.type,
                description: data.description,
                specialization: data.specialization,
                price_type: data.price_type,
                price: data.price,
                updated_at: this.nowDate()
            })
        })
    }

    nowDate() {
        const data = new Date();

        const month = data.getMonth() + 1
        const year = month > 12 ? data.getFullYear() + 1 : data.getFullYear()

        return `${year}-${month > 12 ? 1 : month}-${data.getDate()}`;
    }

    deleteService() {
        deleteServiceById(this.props.match.params)
    }

    handleSubmitForm() {
        updateService(this.state, this.props.match.params.serviceId);
    }

    render() {
        const { specialization, description, type, price_type, price } = this.state
        return (
            <div className="container">
                <ReturnHeader lastRoute={`/${this.props.match.params.userId}/miServices`}></ReturnHeader>
                <div className="contentTituloAnalitics">
                    <div className="title">
                        <b>{type}</b>
                    </div>
                </div>
                <form onSubmit={this.handleSubmitForm}>
                    <div className="rowLine">
                        <div className="contentLeft">
                            <label for="select">Tipo de serviço</label>
                            <select id="select" value={type} onChange={e => this.setState({ type: e.target.value })} required>
                                <option></option>
                                {work.map((v, i) => {
                                    return (
                                        <option key={i}>
                                            {v.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="rowLine">
                        <div className="column">
                            <label for="esp">Especializado em?</label>
                            <input id="esp" type="text" size="35" placeholder="Ex: Motor" value={specialization} onChange={e => this.setState({ specialization: e.target.value })} required></input>
                        </div>
                    </div>
                    <div className="rowLine">
                        <div className="contentLeft">
                            <label for="select">Tipo de Cobrança</label>
                            <select id="select" value={price_type} onChange={e => this.setState({ price_type: e.target.value })} required>
                                <option></option>
                                <option value="aEstimar">A combinar</option>
                                <option value="pHora">Por Hora</option>
                                <option value="fixo"> Fixo</option>
                            </select>
                        </div>
                    </div>
                    <div className="rowLine">
                        <div className="column">
                            <label for="val">Valor</label>
                            <input id="val" value={price} type="text" size="10" onChange={e => this.setState({ price: parseFloat(e.target.value) })} ></input>
                        </div>
                    </div>
                    <div className="rowLine">
                        <div className="column">
                            <label for="descAnuncio">Fale sobre o serviço</label>
                            <textarea rows="5" cols="25" value={description} onChange={e => this.setState({ description: e.target.value })}></textarea>
                        </div>
                    </div>
                    <div className="buttonsGroup-one">
                        <div className="customButtom-two" onClick={this.handleSubmitForm}>
                            <Link>
                                <b>Salvar</b>
                                <Done fontSize="large"></Done>
                            </Link>
                        </div>
                        <div className="customButtom-exclude" onClick={this.deleteService}>
                            <b>Excluir</b>
                            <Close fontSize="large"></Close>
                        </div>
                    </div>
                </form>
                <footer></footer>
            </div>
        )
    }
}
