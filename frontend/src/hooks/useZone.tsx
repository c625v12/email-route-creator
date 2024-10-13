import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ZoneResult } from '../models/zone.dto';

const fetchZone = async (): Promise<ZoneResult> => {
  const { data } = await axios.get<ZoneResult>(
    `http://localhost:3000/api/cloudflare/zone`
  );
  return data;
};

export const useZone = () => {
  return useQuery<ZoneResult>({
    queryKey: ['fetchZone'],
    queryFn: fetchZone,
  });
};
