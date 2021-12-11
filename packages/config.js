/** @format */

export default [
  {
    pathname: '/table-users',
    api: 'users/all',
    edit_api: 'users/edit',
    remove_api: 'users/remove',
    table: true,
    insert: true,
    linking: {
      show: true,
      left: {
        name: 'Studenti',
        api: 'user/all-students',
      },
      right: {
        name: 'Specializari',
        api: 'structures/all',
      },
    },
  },
  {
    pathname: '/table-departments',
    api: 'structures/all',
    edit_api: 'structures/edit',
    remove_api: 'structures/remove',
    table: true,
    insert: true,
    linking: {
      show: false,
    },
  },
  {
    pathname: '/table-classes',
    api: 'classes/all',
    edit_api: 'classes/edit',
    remove_api: 'classes/remove',
    table: true,
    insert: true,
    linking: {
      show: true,
      left: {
        name: 'Specializare',
        api: 'structures/all',
      },
      right: {
        name: 'Materii',
        api: 'classes/all',
      },
    },
  },
  {
    pathname: '/table-exams',
    api: 'exams/all',
    edit_api: 'exams/edit',
    remove_api: 'exams/remove',
    table: true,
    insert: true,
    linking: {
      show: false,
    },
  },
  {
    pathname: '/table-questions',
    api: 'questions/all',
    edit_api: 'questions/edit',
    remove_api: 'questions/remove',
    table: true,
    insert: true,
    linking: {
      show: false,
    },
  },
];
