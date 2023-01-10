import Button from '@components/ui/button';
import PasswordInput from '@components/ui/forms/password-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
interface Props {
  onSubmit: (values: { password: string }) => void;
  loading: boolean;
}

const EnterNewPasswordView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation('common');
  
  const schema = yup.object().shape({
    password: yup.string().required(t('error-password-required')),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>({ resolver: yupResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <PasswordInput
        label={t("text-password")}
        {...register('password')}
        error={errors.password?.message}
        variant="outline"
        className="mb-5"
      />

      <Button className="w-full h-11" loading={loading} disabled={loading}>
        {t('text-reset-password')}
      </Button>
    </form>
  );
};

export default EnterNewPasswordView;
