/** @format */

import axios from 'axios';

const postRequest = (api, payload) =>
  axios
    .post(api, payload)
    .then(res => console.log(res))
    .catch(err => {
      throw new Error(err);
    });

export default postRequest;
