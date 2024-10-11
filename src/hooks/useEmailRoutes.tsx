import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchEmails = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(`http://localhost:8080/emails`);
  return data;
};

export const UseEmailRoutes = () => {
  return useQuery<string[]>({
    queryKey: ['fetchEmails'],
    queryFn: fetchEmails,
  });
};
