import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ZoneResult } from '../models/zone.dto';

const fetchZone = async (): Promise<string> => {
  const { data } = await axios.get<string>(`http://localhost:8080/zone`);
  console.log(data);
  return data;
};

export const useZone = () => {
  return useQuery<string>({
    queryKey: ['fetchZone'],
    queryFn: fetchZone,
  });
};
