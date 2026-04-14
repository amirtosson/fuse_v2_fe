import axios from 'axios';

export const api = axios.create({
  //baseURL: 'http://localhost:3005',

  baseURL: 'https://gutt-ag-dev-e9f7exevd5g9babp.westeurope-01.azurewebsites.net',
});
