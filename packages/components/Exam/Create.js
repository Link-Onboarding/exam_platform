/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest, makeRequestLeft, makeRequestRight, makeRequestSec } from '../../redux/actions/makeRequest';
import { getUserData } from '../../redux/actions/user';
import postRequest from '../../redux/actions/postActions';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

const Answer = props => {
  const [answer, setAnswer] = useState("");

  return <div className="form-check m-1">
    <input
      className="form-check-input"
      type="radio"
      checked={props.selected}
    />
    <label className="form-check-label" htmlFor="flexRadioDefault">
      <input
        className="w-100 rounded-0 mb-2"
        type="text"
        placeholder={"Continut raspuns..."}
        value={answer}
        onChange={text => {setAnswer(text.target.value);props.setter(props.index, text.target.value)}}
      />
    </label>
  </div>
}

const Question = props => {
  const [error, setError] = useState(null);
  const [show, toggleShow] = useState(true);
  const [content, setContent] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);


  const updateAnswers = (idx, value) => {
    let cpy_answers = answers;

    cpy_answers[idx] = value;
    setAnswers(cpy_answers);
  }

  return <>
  {show ?
    <div className="d-flex h-25 flex-column justify-content-center  mb-2">
      
      {
        error ?
        <div className="text-danger">{error}</div>
        :
        null
      }

      <h4 className="w-100 rounded-0 mt-1">Intrebare noua:</h4>
      <input
        className="w-100 rounded-0 mb-2 p-2"
        type="text"
        placeholder={"Continut intrebare..."}
        value={content}
        onChange={text => setContent(text.target.value)}
      />
      {
        answers.map((value, idx) => <Answer key={idx} index={idx} selected={idx == 0 ? 1 : 0} setter={updateAnswers} />)
      }
      
      <button className="btn btn-dark mt-3" onClick={async () => {
        if ( content !== "" ) {
          let isOk = true;

          for ( const value of answers ) {
              if ( value === "" ) {
                isOk = false;
              }
          }

          if ( isOk ) {
            const result = await postRequest("questions/add", {class_id:props.class_id, content: content, owner: localStorage.getItem("localId")});

            if ( result.length > 0 ){
              for ( const idx in answers ) {
                postRequest("answers/add", {quest_id:result[0].quest_id, content: answers[idx], correct: idx == 0 ? true : false });
              }
    
              toggleShow(false);
            }
          }
          else {
            setError("Nu poti crea o intrebare fara raspunsuri!");
          }
        }
        else {
          setError("Nu poti crea o intrebare fara continut!");
        }
      }}>
        Confirma
      </button>
    </div>
  :
  <div className="d-flex h-25 flex-column justify-content-center  mb-2">
    <h4 className="w-100 rounded-0 mt-1">{content}</h4>
    {
        answers.map((value, idx) => <>
          <div className="form-check m-1" key={idx}>
            <input
              className="form-check-input"
              type="radio"
              checked={idx == 0? true : false}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault">
              {value}
            </label>
          </div>
        </>)
      }
  </div>
  }
  </>
}

const CreateExam = props => {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem('authToken');
  const _classes = useSelector(state => state.table);
  const _user = useSelector(state => state.user);

  const [finished, setFinishedValue] = useState(false);
  const [spec, setSpecValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [class_id, setClassValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user_table, updateUserTable] = useState([]);
  const [qsCounter, setQsCounter] = useState(0);
  const [newQsCounter, setNewQsCounter] = useState(0);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:00');

  useEffect(() => {
    if (authToken) dispatch(getUserData());
    dispatch(makeRequest("/classes/all"));
    dispatch(makeRequestLeft("/structures/all"));
    dispatch(makeRequestRight("users/all-students"));
  }, []);

  useEffect(() => {
    dispatch(makeRequestSec(`/users/link-get-classes/user_id=${_user?.data?.id}`));
  }, [_user?.data?.id]);

  useEffect(() => {
    if ( isSubmitting && selectValue != "" && selectValue != "-" ) {
      let ok = true;

      for (const value of user_table) {
        if( typeof value == "object" ) {
          if ( value.id == _classes?.dataR[selectValue].id ) {
            ok = false;
          }
        } 
        
      }

      if (ok) {
        updateUserTable(prevState => [...prevState, _classes?.dataR[selectValue]]);
      }
    }

    setIsSubmitting(false);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <>
      {
        finished ?
        <div className='m-5 d-flex flex-column justify-content-center'>
          <h1>Examenul a fost creat cu succes!</h1>
          <br />
          <Link to="/table-exams">
            <p>Intoarce-te la pagina anterioara...</p>
          </Link>
        </div>
        :
        <div className='m-5 d-flex flex-row justify-content-center'>
          <div className='w-50 d-flex flex-column justify-content-center'>
            <h1>Formular creare examen</h1>
            <br />

            {
              error ?
              <div className="text-danger">{error}</div>
              :
              null
            }

            <h3>Data:</h3>
            <div className='d-flex flex-row justify-content-center'>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
              
              <div className='d-flex flex-column justify-content-center'>
                <div className='d-flex flex-row m-1'>
                  Inceput: <TimePicker
                    onChange={setStartTime}
                    value={startTime}
                    disableClock = {true}
                  />
                </div>
                <div className='d-flex flex-row m-1'>
                  Sfarsit: <TimePicker
                    onChange={setEndTime}
                    value={endTime}
                    disableClock = {true}
                  />
                </div>
              </div>
            </div> 
            <br />

            <h3>Selecteaza specializarea:</h3>
            <select 
              className="form-select form-select-sm w-25"
              onChange={text => setSpecValue(text.target.value)}
            >
              <option selected>-</option>
              {_classes?.dataL?.map((item, idx) => (
                <option value={item.id} key={idx}>{item.name}</option>
              ))}
            </select>

            <br />
            <h3>Selecteaza materia:</h3>
            {
              _user?.data?.permission === "profesor" ?
                <select 
                  className="form-select form-select-sm w-25"
                  onChange={text => setClassValue(text.target.value)}
                >
                  <option selected>-</option>
                  {
                  _classes?.data?.map((item, idx) => (
                    _classes?.dataSec?.map((item2, idx2) => (
                        item2.class_id == item.id ?
                          <option value={item.id} key={idx}>{item.name}</option>
                        :
                          null
                    ))
                  ))
                  }
                </select>
              :
              <select 
                className="form-select form-select-sm w-25"
                onChange={text => setClassValue(text.target.value)}
              >
                <option selected>-</option>
                {_classes?.data?.map((item, idx) => (
                  <option value={item.id} key={idx}>{item.name}</option>
                ))}
              </select>
            }
            
            <br />

            <h3>Selecteaza numarul de intrebari:</h3>
            <input
            type="number"
            className="w-25"
            name="quantity"
            min="1"
            max="100"
            onChange={text => {
              if (newQsCounter > parseInt(text.target.value))
                setNewQsCounter(parseInt(text.target.value));
              setQsCounter(parseInt(text.target.value));
            }}
            />
            
            <br />

            <h3>Intrebari:</h3>
            <p>*Sunt folosite inclusiv intrebariile deja existente din baza de date specifice materiei.</p>

            <br />
            {
              [...Array(newQsCounter)].map((item, idx) => (
                <Question key = {idx} class_id = {class_id} />
              ))
            }
            
            <button className="btn btn-dark mt-3" onClick={() => {
              if ( newQsCounter + 1 <= qsCounter )
                setNewQsCounter(newQsCounter + 1)
              else
                setError("Nu poti crea mai multe intrebari.")
              }}>
              Adauga o intrebare noua.
            </button>
            
            <br />

            <h3>Adauga utilizatori:</h3>

            <div className='w-100 d-flex flex-row flex-lg-wrap bd-highlight mb-3 p-2'>
              {
                user_table?.map((item, idx) => 
                  <div className='ms-1 mb-1 border border-dark p-1 rounded' key={idx} onClick={() => {
                    console.log(user_table.splice(idx, 1));
                    updateUserTable(user_table.splice(idx, 1));
                  }}>{item?.name}</div>
                )
              }
              
              <div className="w-100">
                <select 
                  className="form-select form-select-sm w-100"
                  onChange={text => setSelectValue(text.target.value)}
                >
                  <option selected>-</option>
                  {
                    _classes?.dataR?.map((item, idx) => (
                      <option value={idx} key={idx}>{item.name}</option>
                    ))
                  }
                </select>
                
                <button className="btn btn-dark mt-3 w-100" onClick={() => {
                  setIsSubmitting(true)
                }}>
                  Adauga utilizator
                </button>
              </div>
            </div>
            <br />

            <button className="btn btn-dark mt-3 w-100" onClick={async () =>  {
              let isOk = true;

              if ( spec === "" ) {
                setError("Trebuie sa aloci o specializare.")
                isOk = false;
              }
              if ( isOk && class_id === "" ) {
                setError("Trebuie sa aloci o materie.")
                isOk = false;
              }
              if ( isOk && qsCounter === 0 ) {
                setError("Trebuie sa ai cel putin o intrebare alocata.")
                isOk = false;
              }

              const result = await postRequest("questions/get-by-class-id", {class_id:class_id});
              if ( isOk && (result.length + newQsCounter) - qsCounter > 0 ) {
                setError(`Trebuie sa mai adaugi ${qsCounter - (result.length + newQsCounter)} intrebari.`)
                isOk = false;
              }

              if ( isOk ) {
                const result = await postRequest("exams/add", {
                  class_id: class_id,
                  slots: qsCounter,
                  owner: localStorage.getItem("localId"),
                  start_date: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + startTime + ":00",
                  finish_date: startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + " " + endTime + ":00"
                });

                console.log(result, result.affectedRows);
                if ( result.affectedRows > 0 ) {
                  setFinishedValue(true);
                }

                await postRequest("structures/link-to-exam", {
                  struct_id: spec,
                  exam_id: result.insertId
                });

                for ( const user of user_table ) {
                  await postRequest("users/link-to-exam", {
                    user_id: user.id,
                    exam_id: result.insertId
                  });
                }
              }
            }}>
              Seteaza examen
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CreateExam;
