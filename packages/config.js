/** @format */

export default [
  {
    pathname: '/table-users',
    api: 'users/all',
    edit_api: 'users/edit',
    insert_api: 'users/register',
    remove_api: 'users/remove',
    table: true,
    insert: false,
    linking: {
      show: false,
      left: {
        name: 'Studenti',
        api: 'users/all-students',
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
    insert_api: 'structures/add',
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
    insert_api: 'classes/add',
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
    insert_api: 'exams/add',
    remove_api: 'exams/remove',
    table: true,
    insert: false,
    linking: {
      show: false,
    },
  }
];
