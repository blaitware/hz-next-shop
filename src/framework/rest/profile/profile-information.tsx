import { useUpdateCustomerMutation } from '@framework/customer/customer.query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import ProfileForm from '@components/profile/profile-form';
import useUser from '@framework/auth/use-user';

const ProfileInformation = () => {
  const { t } = useTranslation('common');
  const { me } = useUser();
  const { mutate: updateProfile, isLoading: updating } =
    useUpdateCustomerMutation();

  function onSubmit(values: any) {
    if (!me) {
      return false;
    }
    updateProfile(
      {
        _id: me._id,
        name: values.name,
        profile: {
          _id: me?.profile?._id,
          ...values.profile,
          avatar: values.profile.avatar?.[0],
        },
      },
      {
        onSuccess: () => {
          toast.success(t('profile-update-successful'));
        },
      }
    );
  }

  return <ProfileForm loading={updating} onSubmit={onSubmit} user={me} />;
};

export default ProfileInformation;
