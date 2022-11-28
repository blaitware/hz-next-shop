import { API_ENDPOINTS } from '@framework/utils/endpoints';
import { useMutation, useQueryClient } from 'react-query';
import Attachment from './upload.query';

export const useUploadMutation = (uploadType?: any) => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: any) => {
      return Attachment.upload(
        API_ENDPOINTS.UPLOAD,
        input
      );
    },
    {
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(API_ENDPOINTS.SETTINGS);
      },
    }
  );
};
