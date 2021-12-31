/** @format */

import axios from 'axios';

const postRequest = (api, payload) =>
  new Promise((resolve, reject) => {
    axios
      .post(`https://api-ana.atlink-official.com/api/${api}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
    })

export default postRequest;
