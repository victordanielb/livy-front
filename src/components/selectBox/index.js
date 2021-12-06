import React, { Component } from 'react'
import { ArrowDropDown } from "@material-ui/icons";
import './style.css'
export default class SelectBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            values: []
        }
    }
    componentDidMount(){
        this.setState({
            values: this.props.options
        });
    }
  render() {
    return (
      <div className="selectBox">
            <div className="selectedBox">
                <div className="selectedItem">
                    
                </div>
                <ArrowDropDown></ArrowDropDown>
            </div>
            <div className="optionsSelect">
                Item1
            </div>
            <div className="optionsSelect">
                Item2
            </div>
            <div className="optionsSelect">
                Item3
            </div>
      </div>
    )
  }
}
