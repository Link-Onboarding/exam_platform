export default [
    {
        "pathname": "/table-users",
        "api": "users/all",
        "table": true,
        "insert": true,
        "linking": {
            "show": false
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
    }
]