import { useQuery } from '@tanstack/react-query';
import { apiGetSettings } from '../../services/apiSettings';

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['setting'],
    queryFn: apiGetSettings,
  });

  return { isPending, error, settings };
}
