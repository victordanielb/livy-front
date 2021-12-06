import React, { Component } from 'react'
import { Close } from "@material-ui/icons/";
import './style.css'

class Modal extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            realeaseButton: true,
            dateExist: false,
            dateValue: "",
        }
    }

    nowDate() {
        const data = new Date();
    
        const month = data.getMonth() + 1
        const year = month > 12 ? data.getFullYear() + 1 : data.getFullYear()
    
        return `${year}-${month > 12 ? 1 : month}-${data.getDate()}`;
      }

    renderSolic() {
        const { status, alterFunction, date } = this.props
        return (
            <React.Fragment>
                <h3>O que fazer com este serviço ?</h3>
                <input type="date" value={date === null ? null : date.split("T")[0]} disabled />
                <div className="button-beside">
                    {
                        status === "A"
                            ?
                                <React.Fragment>
                                    <button id="cancel-button" onClick={() => alterFunction({ status_contractor: "C", status: "C", finish_service: this.nowDate() })} value="Cancelar">Cancelar</button>
                                    <button id="done-button" disabled>Finalizar</button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <button id="cancel-button" value="Cancelar" disabled>Cancelar</button>
                                    <button id="done-button" onClick={() => alterFunction({ status_contractor: "F", status: "F", finish_service: this.nowDate() })} >Finalizar</button>
                                </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
    renderPend() {
        const { alterFunction, date } = this.props
        return (
            <React.Fragment>
                <h3>O que fazer com este serviço ? </h3>
                <input type="date" value={date === null ? null : date.split("T")[0]} onChange={(e) => this.setState({ dateValue: e.target.value })} disabled={ date === "" ? true : false } />
                <div className="button-beside">
                    {
                        date === null
                            ?
                                <React.Fragment>
                                    <button id="cancel-button" onClick={() => alterFunction({ status_worker: "C", status: "C", finish_service: this.nowDate()  })} value="Cancelar">Cancelar</button>
                                    <button id="done-sbutton" disabled={ this.state.dateValue === "" ? true : false }>Definir</button>
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    <button id="cancel-button" value="Cancelar">Cancelar</button>
                                    <button id="done-button" onClick={() => alterFunction({ status_worker: "F" })} >Finalizar</button>
                                </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }

    render() {

        const className = this.props.showModal ? "modal-container modal--start" : "modal-container modal--end"

        const { showModal, onClose, renderSolic } = this.props;

        return (
            <React.Fragment>
                {
                    showModal
                        ?
                            <div className={className}>
                                <div className="content-modal">
                                    <div className="close-icon" onClick={() => onClose(false)}>
                                        <Close />
                                    </div>
                                    {
                                        renderSolic
                                        ?
                                            this.renderSolic()
                                        :
                                            this.renderPend()
                                    }
                                </div>
                            </div>
                        :
                            null
                }
            </React.Fragment>
        )
    }
}

export default Modal;