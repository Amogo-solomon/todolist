// src/utils/jwt.js
import { jwtDecode } from 'jwt-decode';
/* import * as jwtDecode from 'jwt-decode'; */


export const jwt_encode = (payload) => {
  // Example encoding function (using btoa for simplicity)
  const header = { alg: 'HS256', typ: 'JWT' };
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(payload));
  const signature = btoa('secret'); // Use a real signature in production
  return `${base64Header}.${base64Payload}.${signature}`;
};

export const jwt_decode = (token) => {
  return jwtDecode(token);
};
