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
