import React, { useState } from "react";
import "./style.css";
import ReturnHeader from "../returnHeader";
import InputMask from "react-input-mask";

import { createUser, sendFile } from "../requests/request";

const Register = () => {

    const [objValues, setObjValues] = useState({});

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(objValues)
      createUser(objValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <ReturnHeader lastRoute="/"></ReturnHeader>
        <div className="cadUser">
          <div className="rowLine">
            <div className="column">
              <label for="foto">Foto do perfil</label>
              <input name="foto" type="file" size="30" onChange={e => setObjValues({ ...objValues, file: e.target.files})}></input>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <input
                name="name"
                type="text"
                size="30"
                placeholder="Nome Completo"
                onChange={e => setObjValues({ ...objValues, name: e.target.value})}
                required
              ></input>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <input
                name="cpf"
                type="email"
                size="30"
                placeholder="Email"
                onChange={e => setObjValues({ ...objValues, email: e.target.value})}
                required
              ></input>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <input
                name="password"
                type="password"
                size="30"
                placeholder="Senha"
                onChange={e => setObjValues({ ...objValues, password: e.target.value})}
                required
              ></input>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <label for="uf">Estado</label>
              <input type="text" name="uf" onChange={e => setObjValues({ ...objValues, user_uf: e.target.value})}/>
            </div>
            <div className="column">
              <label for="cidade">Cidade</label>
              <input type="text" name="cidade" onChange={e => setObjValues({ ...objValues, user_city: e.target.value})}/>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <label for="dtNasc">Data de Nascimento</label>
              <input
                name="dtNasc"
                type="date"
                size="30"
                placeholder="Data de Nascimento"
                onChange={e => setObjValues({ ...objValues, date: e.target.value})}
                required
              ></input>
            </div>
          </div>
          <div className="rowLine">
            <div className="column">
              <label for="cel">Num Celular</label>
              <InputMask
                name="Celular"
                mask="(99) 99999-9999"
                onChange={e => setObjValues({ ...objValues, cel: e.target.value})}
              ></InputMask>
            </div>
          </div>
          <button type="submit" className="buttonSubmit">
            Realizar Cadastro
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
