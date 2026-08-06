import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUpdateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: apiUpdateSetting,
    onSuccess: () => {
      toast.success('Setting successfully updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdating };
}
