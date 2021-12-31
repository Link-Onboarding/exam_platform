/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest, makeRequestLeft } from '../../redux/actions/makeRequest';
import postRequest from '../../redux/actions/postActions';

const AddUser = props => {
  const dispatch = useDispatch();

  const _table = useSelector(state => state.table);

  const [userType, setUserType] = useState('-');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idDep, setIdDep] = useState(0);
  const [classId1, setClassId1] = useState(0);
  const [classId2, setClassId2] = useState(0);
  const [classId3, setClassId3] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(makeRequest("/classes/all"));
    dispatch(makeRequestLeft("/structures/all"));
  }, []);

  return (
    <div className='m-5 d-flex flex-row justify-content-center'>
      <div className='w-50 d-flex flex-column justify-content-center'>
        {
          error ?
          <div className="text-danger">{error}</div>
          :
          null
        }

        
        <h6>Nume:</h6>
        <input
        className="w-50"
        name="quantity"
        value = {firstName}
        onChange={text => {
            setFirstName(text.target.value)
        }}
        />

        <br />
        <h6>Prenume:</h6>
        <input
        className="w-50"
        name="quantity"
        value = {lastName}
        onChange={text => {
            setLastName(text.target.value)
        }}
        />
        
        <br />
        <h6>Tipul de utilizator:</h6>
        <select 
          className="form-select form-select-sm w-50"
          onChange={text => setUserType(text.target.value)}
        >
          <option selected>-</option>
        <option value="admin">Administrator</option>
        <option value="profesor">Profesor</option>
        <option value="student">Student</option>
        </select>

        {
            userType === "student" ?
            <>
                <br />
                <h6>Departament:</h6>
                <select 
                    className="form-select form-select-sm w-50"
                    onChange={text => setIdDep(text.target.value)}
                >
                <option selected>-</option>
                {
                    _table?.dataL?.map((item, idx) => (
                      <option value={item.id} key={idx}>{item.name}</option>
                    ))
                }
                </select>
            </>
            :
            userType === "profesor" ?
            <>
                <br />
                <p>*Un profesor poate preda maximum 3 materii!</p>
                <h6>Materie 1:</h6>
                <select 
                    className="form-select form-select-sm w-50"
                    onChange={text => setClassId1(text.target.value)}
                >
                <option selected>-</option>
                {
                    _table?.data?.map((item, idx) => (
                      <option value={item.id} key={idx}>{item.name}</option>
                    ))
                }
                </select>
                <br />
                <h6>Materie 2:</h6>
                <select 
                    className="form-select form-select-sm w-50"
                    onChange={text => setClassId2(text.target.value)}
                >
                <option selected>-</option>
                {
                    _table?.data?.map((item, idx) => (
                      <option value={item.id} key={idx}>{item.name}</option>
                    ))
                }
                </select>
                <br />
                <h6>Materie 3:</h6>
                <select 
                    className="form-select form-select-sm w-50"
                    onChange={text => setClassId3(text.target.value)}
                >
                <option selected>-</option>
                {
                    _table?.data?.map((item, idx) => (
                      <option value={item.id} key={idx}>{item.name}</option>
                    ))
                }
                </select>
            </>
            :
            null
        }

        <button className="btn btn-dark mt-3 w-100" onClick={async () =>  {
            let isOk = true;

            if ( firstName === "" || lastName === "" || userType === "-" ) {
                setError("Trebuie sa completezi toate campurile.")
                isOk = false;
            }

            if (isOk) {
                setError("")
            }

            if ( isOk ) {
                if ( userType === "student" ) {
                    if ( idDep === 0 && idDep === "" ) {
                      setError("Trebuie sa completezi toate campurile.")
                      isOk = false;
                    }
                }

                if ( userType === "profesor" ) {
                    if (( classId1 === 0 || classId1 === "" ) && (classId2 === 0 || classId2 === "") && ( classId3 === 0 || classId3 === "" )) {
                      setError("Trebuie sa completezi toate campurile.")
                      isOk = false;
                    }
                }

                if (isOk) {
                    const result = await postRequest("users/register", {
                        username: (firstName + "." + lastName).toLowerCase(),
                        first_name: firstName,
                        last_name: lastName,
                        permission: userType
                    });
        
                    if ( userType === "student" ) {
                        if ( idDep !== 0 || idDep !== "" )
                            postRequest("users/link-to-struct", {
                                user_id: result.id,
                                struct_id: idDep
                            });
                    }
        
                    if ( userType === "profesor" ) {
                        if ( classId1 !== 0 || classId1 !== "" )
                            postRequest("users/link-prof-to-class", {
                                user_id: result.id,
                                class_id: classId1
                            });
                        if ( classId2 !== 0 || classId2 !== "" )
                            postRequest("users/link-prof-to-class", {
                                user_id: result.id,
                                class_id: classId2
                            });
                        if ( classId3 !== 0 || classId3 !== "" )
                            postRequest("users/link-prof-to-class", {
                                user_id: result.id,
                                class_id: classId3
                            });
                    }
                }
            }
        }}>
          Adauga utilizator
        </button>
      </div>
    </div>
  );
};

export default AddUser;
