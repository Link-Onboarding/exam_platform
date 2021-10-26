import React, { useState } from "react";
import Table from "../Table/index";
import Insert from "../Insert/index";
import { Logout } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

import "./sass/index.css";

const Choices = [
    {
        name: "Utilizatori",
        choice: "users",
        permissions: ["admin"]
    },
    {
        name: "Facultate",
        choice: "faculty",
        permissions: ["admin"]
    },
    {
        name: "Departamente",
        choice: "departments",
        permissions: ["admin"]
    },
    {
        name: "Examene",
        choice: "exams",
        permissions: ["admin", "profesor", "student"]
    },
    {
        name: "Intrebari",
        choice: "questions",
        permissions: ["admin", "profesor"]
    },
    {
        name: "Raspunsuri",
        choice: "answers",
        permissions: ["admin", "profesor"]
    },
    {
        name: "Cont",
        choice: "account",
        permissions: ["admin", "profesor", "student"]
    }
];

const dummy = [
    {
        title: "Titlu",
        class: "Materie",
        year: "An de studiu",
        day: "Data",
        hour: "Ora",
        grade: "Nota"
    },
    {
        title: "Examen 1",
        class: "Matematici Speciale",
        year: "2",
        day: "11/10/2021",
        hour: "12:00",
        grade: "8.5"
    },
    {
        title: "Examen 2",
        class: "Electronica Digitala",
        year: "2",
        day: "12/10/2021",
        hour: "11:00",
        grade: "6.5"
    },
    {
        title: "Examen 3",
        class: "Analiza Combinatorica",
        year: "2",
        day: "13/10/2021",
        hour: "12:30",
        grade: "8.7"
    },
];

const dummy2 = [
    "Titlu",
    "Materie",
    "An de studiu",
    "Data",
    "Ora",
    "Nota"
];

const Dashboard = props => {
    const [choice, setChoice] = useState(null);
    const dispatch = useDispatch();

    const checkPerm = (permissions, permission) => {
        for (const perm of permissions) {
            if (perm === permission) {
                return true;
            }
        }
        
        return false;
    }

    return (
        <React.Fragment>
            <div className="dashboard">
                <div className="choices">
                    {
                        Choices.map(
                            (value, idx) => {
                                return checkPerm(value.permissions, props.accountType)?
                                <div key = {idx} className = {choice === value.choice ? "choice selected" : "choice"} onClick={() => setChoice(value.choice)}>
                                    {value.name}
                                </div>
                                :
                                null
                            }
                        )
                    }
                    
                    <div className = "choice logout" onClick={() => dispatch(Logout())}>
                        Iesire cont
                    </div>
                </div>
                <div className="content">
                    <Insert fields={dummy2} />
                    <br />
                    <Table values={dummy} />
                </div>
            </div>
        </React.Fragment>
    )
};

export default Dashboard;