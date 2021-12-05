export default [
    {
        "pathname": "/table-users",
        "api": "users/all",
        "table": true,
        "insert": true,
        "linking": {
            "show": true,
            "left": {
                "name": "Studenti",
                "api": "user/all-students"
            },
            "right": {
                "name": "Specializari",
                "api": "structures/all"
            }
        }
    },
    {
        "pathname": "/table-departments",
        "api": "structures/all",
        "table": true,
        "insert": true,
        "linking": {
            "show": false
        }
    },
    {
        "pathname": "/table-classes",
        "api": "classes/all",
        "table": true,
        "insert": true,
        "linking": {
            "show": true,
            "left": {
                "name": "Specializare",
                "api": "structures/all"
            },
            "right": {
                "name": "Materii",
                "api": "classes/all"
            }
        }
    },
    {
        "pathname": "/table-exams",
        "api": "exams/all",
        "table": true,
        "insert": false,
        "linking": {
            "show": false
        }
    }
]