/** @format */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const QuestionOption = ({ answers, setAnswers, selected, setSelected, option }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (selected === option) {
      setChecked(true);
      setAnswers(prevState => [...prevState, option]);
      localStorage.setItem('@ANSWERS', answers);
    } else {
      setChecked(false);
    }
  }, [selected]);

  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="radio"
        checked={checked}
        onChange={() => {
          setSelected(option);
          setChecked(true);
        }}
      />
      <label className="form-check-label" htmlFor="flexRadioDefault">
        {option}
      </label>
    </div>
  );
};
QuestionOption.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer: PropTypes.string,
    })
  ),
  setAnswers: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  setSelected: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
};

const QuestionGroup = ({ answers, setAnswers, group }) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h4>{group.content}</h4>
      {group.answers.map((option, idx) => (
        <QuestionOption
          answers={answers}
          setAnswers={setAnswers}
          selected={selected}
          setSelected={setSelected}
          option={option}
          key={idx}
        />
      ))}
    </>
  );
};
QuestionGroup.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      answer: PropTypes.string,
    })
  ),
  setAnswers: PropTypes.func.isRequired,
  group: PropTypes.shape({
    content: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default QuestionGroup;
