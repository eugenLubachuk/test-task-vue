import request from './request';
import response from './response';

export default (axios, store) => {
  request(axios, store);
  response(axios, store);
};
