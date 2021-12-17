/** @format */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../../redux/actions/makeRequest';
import postRequest from '../../redux/actions/postActions';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';

import "react-datepicker/dist/react-datepicker.css";

const Answer = props => {
  const [checked, setChecked] = useState(false);

  return <div className="form-check m-1">
    <input
      className="form-check-input"
      type="radio"
      checked={checked}
      onClick={() => setChecked(!checked)}
    />
    <label className="form-check-label" htmlFor="flexRadioDefault">
      <input
        className="w-100 rounded-0 mb-2"
        type="text"
        placeholder={"Continut raspuns..."}
      />
    </label>
  </div>
}

const CreateExam = props => {
  const dispatch = useDispatch();

  const _classes = useSelector(state => state.table)

  const [Class, setClassValue] = useState('');
  const [qsCounter, setQsCounter] = useState(0);
  const [newQsCounter, setNewQsCounter] = useState(0);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:00');

  useEffect(() => {
    dispatch(makeRequest("/classes/all"));
  }, []);

  return (
    <div className='m-5 d-flex flex-row justify-content-center'>
      <div className='w-50 d-flex flex-column justify-content-center'>
        <h1>Formular creare examen</h1>
        <br />

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
        <h3>Selecteaza materia:</h3>
        <select 
          className="form-select form-select-sm w-25"
          onChange={text => setClassValue(text.target.value)}
        >
          <option selected>-</option>
          {_classes?.data?.map((item, idx) => (
            <option value={idx} key={idx}>{item.name}</option>
          ))}
        </select>
        
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
        {
          error ?
          <div className="text-danger">{error}</div>
          :
          null
        }
        <div className="form-check form-switch">
          <label className="form-check-label">Sunt folosite inclusiv intrebariile deja existente din baza de date specifice materiei.</label>
        </div>
        
        <br />
        {
          [...Array(newQsCounter)].map((item, idx) => (
            <div key = {idx} className="d-flex h-25 flex-column justify-content-center  mb-2">
              <h4 className="w-100 rounded-0 mt-1">Intrebare noua:</h4>
              <input
                className="w-100 rounded-0 mb-2 p-2"
                type="text"
                placeholder={"Continut intrebare..."}
              />

              <Answer />
              <Answer />
              <Answer />
              <Answer />
            </div>
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
        
        <button className="btn btn-dark mt-3 w-100" onClick={() =>  {
          dispatch(postRequest("/exams/add", {}))
        }}>
          Seteaza examen
        </button>
      </div>
    </div>
  );
};

export default CreateExam;
