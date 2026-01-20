import axios from 'axios';
import { Teacher } from '@/types/teacher';

interface TeachersParams {
  limit: number;
}

axios.defaults.baseURL =
  'https://learn-lingo-5cfeb-default-rtdb.europe-west1.firebasedatabase.app/';

export const fetchTeachers = async ({
  limit = 4,
}: TeachersParams): Promise<Teacher[]> => {
  const response = await axios.get<Record<string, Teacher>>('/teachers.json', {
    params: {
      orderBy: '"$key"',
      limitToFirst: limit,
    },
  });

  const data = response.data;

  return Object.keys(data).map((key) => ({
    ...data[key],
    id: key,
  }));
};

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const registerEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const updateProfileEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterProps): Promise<RegisterResponse> {
  const { data } = await axios.post(registerEndpoint, {
    email,
    password,
    returnSecureToken: true,
  });

  if (name) {
    await axios.post(updateProfileEndpoint, {
      idToken: data.idToken,
      displayName: name,
      returnSecureToken: true,
    });
  }

  return data;
}

const loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
  displayName?: string;
}

export async function loginUser({
  email,
  password,
}: LoginProps): Promise<LoginResponse> {
  const { data } = await axios.post(loginEndpoint, {
    email,
    password,
    returnSecureToken: true,
  });

  return data;
}
