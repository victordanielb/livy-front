import React, { Component } from 'react'
import Header from '../header/index'
import ItensAnuncios from '../itensAnuncios/index'
import { findServicesByUserId } from '../requests/request'

export default class ViewMiServices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      worksList: [],
      button1: "",
      button2: "",
      button3: "",
      button4: "",
    }
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    findServicesByUserId(this.props.match.params.userId).then(data => {
      this.setState({ worksList: data });
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

  adInformation(ad_id) {
    return this.state.worksList.find(v => {
      return v.id === ad_id
    })
  }

  filterList(option) {
    const worksList = this.state.worksList

    if (this.state.lastOrder === option) {
      this.setState({
        worksList: worksList.reverse(),
      })
    } else {
      this.setState({
        button1: "",
        button2: "",
        button3: "",
        button4: "",
      });

      switch (option) {
        case "button1":
          this.setState({
            button1: "click-option",
            worksList: worksList.sort((x, y) => {
              return x.user.specialization < y.user.specialization ? -1 : x.user.specialization > y.user.specialization ? 1 : 0;
            }),
            lastOrder: option
          })
          break;

        case "button2":
          this.setState({
            button2: "click-option",
            worksList: worksList.sort((x, y) => {
              return x.price - y.price
            }),
            lastOrder: option
          })
          break;

        case "button3":
          this.setState({
            button3: "click-option",
            lastOrder: option
          })
          break;

        case "button4":
          this.setState({
            button4: "click-option",
            worksList: worksList.sort((x, y) => {
              return x.specialization < y.specialization ? -1 : x.specialization > y.specialization ? 1 : 0;
            }),
            lastOrder: option
          })
          break;

        default:
          console.log(null)
      }
    }
  }
  render() {
    return (
      <div className="container">
        <Header userId={`${this.props.match.params.userId}`} route={`${this.props.match.params.userId}/miServices`} />
        <div className="contentTituloAnalitics">
          <div className="title">
            <b>Meus Serviços</b>
          </div>
          <div className="subTitle">
            <a>Gerencie meus servços</a>
          </div>
        </div>
        <div className="content">
          <div className="filter">
            <div className={`option-filter ${this.state.button1}`} onClick={() => this.filterList("button1")}>
              <b>Especialização</b>
            </div>
            <div className={`option-filter ${this.state.button2}`} onClick={() => this.filterList("button2")}>
              <b>Valor</b>
            </div>
            <div className={`option-filter ${this.state.button3}`} onClick={() => this.filterList("button3")}>
              <b>Avaliacao</b>
            </div>
            <div className={`option-filter ${this.state.button4}`} onClick={() => this.filterList("button4")}>
              <b>Especialização</b>
            </div>
          </div>
          <div className="rowContent">
            {
              // /:userId/miServices/edit/:serviceId
              this.state.worksList.length > 0
                ?
                this.state.worksList.map((v, i) => {
                  return (
                    <ItensAnuncios
                      adInformation={this.adInformation(v.id)}
                      key={i}
                      route={`miServices/edit/${v.id}`}
                      image={
                        v.user.file.length > 0
                          ?
                            v.user.file[0].path.replace("localhost", "ec2-3-138-100-12.us-east-2.compute.amazonaws.com")
                          :
                            null
                      }
                      userId={v.user_id}
                      specialization={v.specialization}
                      age={this.calcAge(v.user.birth_date)}
                      user_name={v.user.name}
                      price_type={v.price_type}
                      price={v.price}
                      categoria={this.props.match.params.categoria}
                      anuncio={v.id}
                    />
                  )
                })
                :
                <div className="warning--not_found">
                  <h2>VOCÊ AINDA NÃO ANUNCIOU SEU SERVIÇO</h2>
                </div>
            }

          </div>
        </div>
        <footer></footer>
      </div>
    )
  }
}
