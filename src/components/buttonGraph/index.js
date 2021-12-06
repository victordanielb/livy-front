import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

export default class ButtonGraph extends Component {
    render() {
        return (
            <div className="grapContainer">
                <Link>
                    <div className="grapTxtItem">
                        <b>{this.props.label}</b>
                    </div>
                    <div className="grapTxtVal">
                        <b>{this.props.val}</b>
                    </div>
                </Link>
            </div>
        )
    }
}
