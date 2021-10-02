import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { createStore, applyMiddleware } from "redux";
import { Provider, useDispatch } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './redux/root';
import thunk from "redux-thunk";

import { authSuccess } from './redux/actions/account';
import { getUserData } from './redux/actions/user';

import Header from './components/Header/index';
import Landing from './components/Landing/index';
import Checkout from './components/Checkout/index';
import Layout from './components/Layout/index';
import Account from './components/Account/index';
import Products from './components/Products/index';
import Product from './components/Product/index';
import Command from './components/Command/index';
import Footer from './components/Footer/index';

import "./sass/index.css";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const Application = () => {
    const dispatch = useDispatch();

    let storageAuthToken = localStorage.getItem('authToken');

    useEffect(
        () => {
            if ( storageAuthToken && storageAuthToken !== undefined) {
                dispatch(authSuccess(storageAuthToken));
                dispatch(getUserData());
            }
        },[]
    );

    return (
        <React.Fragment>
            <Header />

            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/account' exact component={Account} />
                <Route path='/checkout' exact component={Checkout} />
                <Route path='/products/:filter' exact component={Products} />
                <Route path='/product/:id' exact component={Product} />
                <Route path='/command/:id' exact component={Command} />
                <Route path='/contact'>
                    <Layout title="Contacteaza-ne!">
                        <p>
                            IN LUCRU!
                        </p>    
                    </Layout>
                </Route>
                <Route path='/about'>
                    <Layout title="Despre noi!">
                        <p>
                            IN LUCRU!
                        </p>
                    </Layout>
                </Route>
                <Route path='/returns'>
                    <Layout title="Informatii retur!">
                        <p>
                            IN LUCRU!
                        </p>
                    </Layout>
                </Route>
                <Route path='/transport'>
                    <Layout title="Informatii transport!">
                        <p>
                            IN LUCRU!
                        </p>
                    </Layout>
                </Route>
                <Route path='/privacy'>
                    <Layout title="Prelucrarea datelor cu caracter personal!">
                        <div>
                            Considerăm asigurarea dreptului la protecția datelor cu caracter personal ca un angajament fundamental,
                            prin urmare vom dedica toate resursele și eforturile necesare pentru a prelucra datele dumneavoastră în deplină concordanță cu Regulamentul (UE) 2016/679 
                            (“Regulamentul general privind protecția datelor” sau “GDPR”), precum și cu orice altă legislație aplicabilă pe teritoriul Romaniei. 
                            <br></br>
                            <br></br>
                            În general, colectăm datele dvs. cu caracter personal direct de la dumneavoastră, astfel încât aveți controlul asupra tipului de informație pe care ne-o oferiți. 
                            <br></br>
                            <br></br>
                            Cu titlul de exemplu, primim informații de la dvs. astfel:
                            <br></br>
                            Când vă creați un cont in platforma noastra, ne transmiteți: adresa de e-mail, numele, prenumele si numarul de telefon;
                            <br></br>
                            Când plasați o comandă, ne furnizați informații precum: produsul dorit, numele si prenumele, adresa de livrare, detalii de facturare, metoda de plată, număr de telefon.
                            <br></br>
                            <br></br>
                            Datele dvs. sunt pastrate pana la solicitarea stergerii contului de pe platforma.
                            <br></br>
                            <br></br>
                            Datele dvs. nu sunt trasmise, ele sunt pastrate doar pentru uzul platformei Velane, dar in numar restrans pot fi accesate de depanatorii platformei!
                            <br></br>
                            <br></br>
                            Datele dvs. sunt securizate prin metode sigure de encriptie, precum metoda de HASH SHA2-256, care nu permite decriptarea acestora, astfel nici noi nu putem recupera datele pierdute aflate in platforma!
                            <br></br>
                            <br></br>
                            Datele dvs. sunt stocate pe servere securizate, astfel restrangem sansele de coruptie sau furt ale acestora!
                            <br></br>
                            <br></br>
                            Drepturile dvs. asupra datelor cu caracter personale este total, avand puterea de a solicita orice modificare asupra acestora!
                            <br></br>
                            <br></br>
                            Pentru ajutor sau nedumeriri ne puteti contacta folosind datele furnizate in cadrul paginii de contact!
                        </div>
                    </Layout>
                </Route><Route path='/tos'>
                    <Layout title="Termenii si Conditiile de utilizare!">
                        <div>
                            Accesand si navigand pe acest site, acceptati termenii de utilizare descrisi in continuare.
                            <br></br>
                            <br></br>
                            Informatiile prezente pe acest website sunt strict legate de produsele si serviciile noastre!
                            <br></br>
                            <br></br>
                            S.C. Velane STORE S.R.L. nu acorda garantie pentru:
                            <br></br>
                            <br></br>
                            <ul>
                                <li>evitarea utilizarii anevoioase sau intreruperii in utilizare a site-ului;</li>
                                <li>neafectarea in sens negativ a altor sisteme prin utilizarea site-ului.</li>
                            </ul>

                            Astfel Velane STORE nu poate fi responsabil pentru nici un fel de daune directe sau indirecte produse prin utilizarea acestui website!
                            <br></br>
                            <br></br>
                            Toate informatiile si produsele continute de website sunt proprietatea S.C. Velane STORE S.R.L., care isi rezerva dreptul de a modifica continutul si/sau structura site-ului in orice moment si fara nici o informare prealabila.
                            <br></br>
                            <br></br>
                            Unele imagini prezentate pot fi doar cu scop informativ, fiind preluate de pe website-uri specializate precum <a href="https://unsplash.com/">Unsplash</a>.
                            <br></br>
                            <br></br>
                            Pentru a contacta S.C. Velane STORE S.R.L., utilizatorii website-ului sunt obligati sa foloseasca doar informatiile oferite in pagina de Contact.
                        </div>
                    </Layout>
                </Route>
            </Switch>

            <Footer />
        </React.Fragment>
    );
};

ReactDOM.render(
    <Provider store = {store}>
        <BrowserRouter>
            <Application />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
