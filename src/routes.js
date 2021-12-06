import  React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginScreen from './components/loginScreen'
import LateralMenu from './components/lateralMenu/index';
import ViewServicos from './components/viewServicos/index';
import ViewAnuncios from './components/viewAnuncios/index'
import PerfilAnuncio from './components/perfilAnuncio/index';
import Chat from './components/chat/index';
import WorkComent from './components/lastWork/index';
import ViewCadAnuncio from './components/viewCadAnuncio/index';
import ViewCadUser from './components/viewCadUser/index';
import ViewPerfil from './components/viewPerfil/index';
import ViewAwait from './components/viewAwait/index';
import ViewPendencias from './components/viewPendencias/index';
import ViewMiServices from './components/viewMiServices/index'
import ViewEditService from './components/viewEditService/index'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LoginScreen}/>
            <Route exact path="/:userId" component={ViewServicos} />
            <Route exact path="/:userId/anuncio" component={ViewCadAnuncio} />
            <Route exact path="/:userId/menu" component={LateralMenu} />
            <Route exact path="/:userId/servicos/:categoria" component={ViewAnuncios}></Route>
            <Route exact path="/:userId/servicos/:categoria/:perfil" component={PerfilAnuncio}></Route>
            <Route exact path="/:userId/servicos/:categoria/:perfil/:work" component={WorkComent}></Route>
            <Route exact path="/:userId/:anuncioId/chat" component={Chat}></Route>
            <Route exact path="/signup/user" component={ViewCadUser}></Route>
            <Route exact path="/:userId/perfil/" component={ViewPerfil}></Route>
            <Route exact path="/:userId/:anuncioId/await" component={ViewAwait}></Route>
            <Route exact path="/:userId/pendencias/" component={ViewPendencias} />
            <Route exact path="/:userId/miServices/" component={ViewMiServices}></Route>
            <Route exact path="/:userId/miServices/edit/:serviceId" component={ViewEditService}></Route>
        </Switch>
    </BrowserRouter>
)
export default Routes;