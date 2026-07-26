import { useQuery } from '@tanstack/react-query';
import { apiGetCabins } from '../../services/apiCabins';

export function useCabins() {
  const {
    isPending: isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: apiGetCabins,
  });

  return { cabins, isLoading, error };
}
