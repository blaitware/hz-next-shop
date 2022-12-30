import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { CustomerService } from '@framework/customer/customer.service';

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (input: any) => CustomerService.deleteAddress(input),
    {
      onSuccess: () => {
        toast.success('Address deleted successfully!');
      },
      onSettled: () => {
        queryClient.invalidateQueries('me');
      },
    }
  );
};

export const useAddCustomerAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: any) => CustomerService.addAddress(input),
    {
      onSuccess: () => {
        toast.success('Address added successfully!');
      },
      // onError: (error) => {
      //   console.log(error.message);
      // },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('me')
    }
  )

}

export const useUpdateCustomerAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (input: any) => CustomerService.updateAddress(input),
    {
      onSuccess: () => {
        toast.success('Address updated successfully!');
      },
      onError: (error) => {
        toast.error('An Error occured!')
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('me')
    }
  )
}
