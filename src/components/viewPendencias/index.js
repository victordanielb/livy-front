import React, { Component } from 'react'
import Header from './../header/index';
import ItensAnuncios from '../itensAnuncios'
import { findWorks, findFile, updateWork} from '../requests/request'
import Modal from '../modal/index';

export default class ViewPendencias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pending: [],
            solic: [],
            image: "",
            showModal: false,
            serviceInModal: "",
            status: "",
            renderSolic: "",
            date: ""
        }

        this.showModal = this.showModal.bind(this);
        this.alterDoneWork = this.alterDoneWork.bind(this);
    }

    componentDidMount() {
        const userId = parseInt(this.props.match.params.userId)
        findWorks().then( res => {
            this.setState({
                pending: res.data.filter( v => {
                    return v.userworker.id === userId && ( v.status_worker === "A" || v.status_worker == null ) && v.status_contractor !== "C"
                }),
                solic: res.data.filter( v => {
                    return v.usercontractor.id === userId && ( v.status_contractor === "A" || v.status_contractor == null )
                })
            })
            debugger;
        });
    }

    calcAge(birthDate) {
        var data = birthDate.split("T")[0];
    
        var dd = data.split("-")[2];
        var mm = data.split("-")[1];
        var yyyy = data.split("-")[0];
    
        var dataInDate = new Date(`${yyyy},${mm},${dd}`);
        var timeDate = new Date() - dataInDate.getTime();
        var newDate = new Date(timeDate);
    
        return Math.abs(newDate.getUTCFullYear() - 1970);
      }

    handleFindFile (user_id) {
        findFile(user_id).then( res => {
            debugger;
        })
    }
    
    showModal(param, renderSolic, status, serviceId, date) {

        console.log(status)
        this.setState({
            showModal: param,
            serviceInModal: serviceId,
            status,
            renderSolic,
            date
        })
    }

    alterDoneWork (content){
        updateWork( content, this.state.serviceInModal)
    }

    render() {
        return (
            <React.Fragment>
            <div className="container">
            
                <Header userId={`${this.props.match.params.userId}`} route={`${this.props.match.params.userId}/pendencias`}></Header>
                <div className="contentTituloAnalitics">
                    <div className="title">
                        <b>Pendencias</b>
                    </div>
                    <div className="subTitle">
                        <a>Gerencie suas pendencias e solicitações</a>
                    </div>
                </div>
                <div className="contentComponents">
                    <div className="txtLabel">
                        Pendencias
                    </div>
                    
                    <div className="buttonGrapsContent">
                        <div className="dataBox">
                            {
                                this.state.pending.map(( v, i ) => {
                                    return(
                                        <ItensAnuncios 
                                            key={i} 
                                            image={null}
                                            userId={v.userworker.id}
                                            specialization={v.service.specialization}
                                            age={this.calcAge(v.userworker.birth_date)}
                                            user_name={v.userworker.name}
                                            price_type={v.service.price_type}
                                            price={v.service.price}
                                            categoria={this.props.match.params.categoria} 
                                            anuncio={v.service.id} 
                                            onClick={ () => this.showModal(true, false, "", v.id, v.start_service)}
                                        />
                                    )
                                })
                            }
                            
                        </div>
                    </div>

                    <div className="txtLabel">
                        Solicitações
                    </div>

                    <div className="buttonGrapsContent">
                        <div className="dataBox">
                        {
                            this.state.solic.map(( v, i ) => {
                                return(
                                    <ItensAnuncios 
                                        key={i} 
                                        image={null}
                                        userId={v.userworker.id}
                                        specialization={v.service.specialization}
                                        age={this.calcAge(v.userworker.birth_date)}
                                        user_name={v.userworker.name}
                                        price_type={v.service.price_type}
                                        price={v.service.price}
                                        categoria={this.props.match.params.categoria} 
                                        anuncio={v.service.id} 
                                        onClick={() => this.showModal(true, true, v.status_worker === null ? v.status : v.status_worker, v.id, v.start_service)}
                                    />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                showModal={this.state.showModal}
                onClose={this.showModal}
                renderSolic={this.state.renderSolic}
                alterFunction={this.alterDoneWork}
                status={this.state.status}
                date={this.state.date}
            />
            </React.Fragment>
        )
    }
}
