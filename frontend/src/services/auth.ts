import axios from 'axios';

const API_URL = '/api/v1';

export async function login(email: string, password: string) {
  const data = new URLSearchParams();
  data.append('username', email);
  data.append('password', password);
  const response = await axios.post(`${API_URL}/auth/token`, data, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data as { access_token: string; token_type: string };
}

export async function register(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const params = {
    email,
    password,
    first_name: firstName,
    last_name: lastName
  };
  const response = await axios.post(`${API_URL}/auth/register`, null, { params });
  return response.data as { message: string };
}
