import { TUTOR_AUTH_TOKEN } from '../constants';

export const isAuthenticated = !(localStorage.getItem(TUTOR_AUTH_TOKEN) === ''
  || localStorage.getItem(TUTOR_AUTH_TOKEN) === null
  || localStorage.getItem(TUTOR_AUTH_TOKEN) === undefined);