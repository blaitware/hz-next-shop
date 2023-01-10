import { getLayout } from '@components/layouts/layout';
import { useModalAction } from '@components/ui/modal/modal.context';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import { useEffect, useState } from 'react';

const ResetPassword = () => {
  const { openModal } = useModalAction();

  useEffect(() => {
    const { code } : any = router.query;
    openModal('FORGOT_VIEW', code)
    router.push("/")
  }, [])

  return (
    <>
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'policy'])),
    },
  };
};
