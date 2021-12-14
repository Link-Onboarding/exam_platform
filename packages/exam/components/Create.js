/** @format */
import React, { useEffect, useState } from 'react';
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
  const [Class, setClassValue] = useState('');
  const [qsCounter, setQsCounter] = useState(0);
  const [newQsCounter, setNewQsCounter] = useState(0);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [time, onChange] = useState('10:00');

  return (
    <div className='m-5 d-flex flex-row justify-content-center'>
      <div className='w-50 d-flex flex-column justify-content-center'>
        <h1>Formular creare examen</h1>
        <br />

        <h3>Data:</h3>
        <div className='d-flex flex-row justify-content-center'>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <TimePicker
            onChange={onChange}
            value={time}
            disableClock = {true}
          />
        </div>

        <br />
        <h3>Selecteaza materia:</h3>
        <select 
          className="form-select form-select-sm w-25"
          onChange={text => setClassValue(text.target.value)}
        >
          <option selected>-</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
          <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label">Foloseste intrebariile din baza de date specifice materiei.</label>
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
        
        <button className="btn btn-dark mt-3 w-100">
          Seteaza examen
        </button>
      </div>
    </div>
  );
};

export default CreateExam;
