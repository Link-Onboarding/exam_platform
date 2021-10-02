import { sha256 } from 'js-sha256';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../redux/actions/user';
import { setUserData } from '../../redux/actions/user';
import { authInProcess } from '../../redux/actions/account';

const Index = () => {
    let storageAuthToken = localStorage.getItem('authToken');
    const dispatch = useDispatch();
    const onAuth = (payload, hasAccount) => dispatch(authInProcess(payload, hasAccount));

    window.addEventListener('storage', () => {
        storageAuthToken = localStorage.getItem('authToken');
    });

    useEffect(
        () => {
            if ( storageAuthToken && storageAuthToken !== undefined ) {
                dispatch(getUserData());
            }
        },[]
    );
    
    const _userData = useSelector(state => state.user.data);
    const _auth = useSelector(state => state.auth);

    const [logState, setLogState] = useState(false);
    const [errorMessage, setError] = useState(null);

    useEffect(() => {
        setError(_auth.error);
    }, [_auth]);

    const [password, setPassword] = useState(null);
    const [cPassword, setConfirmedPassword] = useState(null);

    const [userState, setUserState] = useState({
        email: null,
        first_name: null,
        last_name: null,
        phone: null
    });

    const updateDataField = (field, value) => {
        let cpy_userData = userState;
        
        cpy_userData[field] = value;

        setUserState(cpy_userData);
    };

    const SwitchToRegister = (bool) => {
        updateDataField("email", null);
        updateDataField("first_name", null);
        updateDataField("last_name", null);
        updateDataField("phone", null);

        setPassword(null);
        setConfirmedPassword(null);

        setLogState(bool);
    };

    return (
        <React.Fragment>
            {
                storageAuthToken === null?
                <React.Fragment>
                <div className="text__block text__block--sm">
                    <h1>Nu esti conectat!</h1>
                    <br></br>
                    {
                        logState?
                        <React.Fragment>
                            <h2>
                                Creaza un cont pentru a putea accesa platforma noastra!
                            </h2>
                            <p className="error">{errorMessage}</p>
                            <React.Fragment>
                                <input type="text" placeholder="Nume" onChange={text => updateDataField("first_name", text.target.value)}/>
                                <input type="text" placeholder="Prenume" onChange={text => updateDataField("last_name", text.target.value)}/>
                                <input type="text" placeholder="Email" onChange={text => updateDataField("email", text.target.value)}/>
                                <input type="text" placeholder="Numar telefon" onChange={text => updateDataField("phone", text.target.value)}/>
                                <input type="password" placeholder="Parola" onChange={text => setPassword(text.target.value)}/>
                                <input type="password" placeholder="Confirma parola" onChange={text => setConfirmedPassword(text.target.value)}/>
                                
                                <div className="button" onClick={() => {
                                    if (password === cPassword) {
                                        onAuth({
                                            first_name: userState.first_name,
                                            last_name: userState.last_name,
                                            phone: userState.phone,
                                            email: userState.email,
                                            password: sha256(password)
                                        }, false);
                                    }
                                }
                                }>Creaza cont! 
                                </div>
                            </React.Fragment>
                            <h2>
                                sau 
                                <br></br>
                                Apasa <a onClick={() => SwitchToRegister(false)}>aici</a> pentru a intra in cont!
                            </h2>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <h2>
                            Intra in cont pentru a putea folosi platforma noastra!
                            </h2>
                            <p className="error">{errorMessage}</p>
                            <React.Fragment>
                                <input type="text" placeholder="Email" onChange={text => updateDataField("email", text.target.value)}/>
                                <input type="password" placeholder="Parola" onChange={text => setPassword(text.target.value)}/>
                                <div className="button" onClick={() => {
                                    onAuth({
                                        email: userState.email,
                                        password: sha256(password)
                                    }, true)
                            }
                            }>Intra in cont!
                                </div>    
                            </React.Fragment>
                            <h2>
                                sau
                                <br></br>
                                Apasa <a onClick={() => SwitchToRegister(true)}>aici</a> pentru a crea un cont!
                            </h2>
                        </React.Fragment>
                    }
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                <div className="text__block">
                    <h2>
                        <b>Esti conectat!</b>
                    </h2>
                    <ul>
                        <li><b>EMAIL</b><br />{_userData?.email}</li>
                        <li><b>NUMELE DE FAMILIE</b><br />{_userData?.first_name}</li>
                        <li><b>PRENUMELE</b><br />{_userData?.last_name}</li>
                        <li><b>NUMAR DE TELEFON</b><br />{_userData?.phone}</li>
                    </ul>
                    <h2>
                        Aici iti modifica datele contului!
                    </h2>
                    <center><p className="error">{errorMessage}</p></center>
                    <React.Fragment>
                        <input type="text" placeholder="Nume" onChange={text => updateDataField("first_name", text.target.value)}/>
                        <input type="text" placeholder="Prenume" onChange={text => updateDataField("last_name", text.target.value)}/>
                        <input type="text" placeholder="Email" onChange={text => updateDataField("email", text.target.value)}/>
                        <input type="text" placeholder="Numar telefon" onChange={text => updateDataField("phone", text.target.value)}/>
                    </React.Fragment>
                    <div className="button" onClick={() => {
                        if (userState.email && userState.first_name && userState.last_name && userState.phone) 
                            dispatch(setUserData(userState));
                        else
                            setError("Trebuiesc completate toate campurile!");
                    }
                    }>Salvare</div>    
                </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default Index;