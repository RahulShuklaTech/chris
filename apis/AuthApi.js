import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const loginPOST = (Constants, { loginEmail, loginPassword }) =>
  fetch(
    `https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        apikey: Constants['SUPABASE_API_KEY_HEADER'],
      },
      method: 'POST',
    }
  )
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});

export const signupPOST = (Constants, { signupEmail, signupPassword }) =>
  fetch(`https://ztxhuiezsnrwnupwzimc.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: Constants['SUPABASE_API_KEY_HEADER'],
    },
    method: 'POST',
  })
    .then(res => {
      if (!res.ok) {
        console.error('Fetch error: ' + res.status + ' ' + res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .catch(() => {});
