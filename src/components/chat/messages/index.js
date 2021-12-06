import React from 'react'
import PropTypes from 'prop-types';
import './style.css'

const classNameRigth = 'boxMessage align--start'
const classNameLeft = 'boxMessage align--end'
const classNameMessage = 'messageBox'

const Messages = ({ index, user, mensagem, userId }) =>
    <div className="rowMessage">
        <div className={index % 2 === 0 ? classNameRigth : classNameLeft} key={userId}>
            <div className={classNameMessage}>
                {mensagem}
            </div>
        </div>
    </div>

Messages.propTypes = {
    user: PropTypes.string.isRequired,
    mensagem: PropTypes.string,
    userId: PropTypes.number.isRequired
}

Messages.defaultProps = {
    mensagem: "Problemas ao carregar mensagem"
}

export default Messages;