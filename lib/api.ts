import axios from 'axios';
import { Teacher } from '@/types/teacher';

axios.defaults.baseURL =
  'https://learn-lingo-5cfeb-default-rtdb.europe-west1.firebasedatabase.app/';

export const fetchTeachers = async (): Promise<Teacher[]> => {
  const response = await axios.get<Teacher[]>('/teachers.json');
  console.log(response.data);
  return response.data;
};
