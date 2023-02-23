import Button from '@components/ui/button';
import NotFound from '@components/ui/not-found';
import { Image } from '@components/ui/image';
import noResult from '@assets/no-result.svg';
import DashboardSidebar from '@components/dashboard/sidebar';
import Orders from '@framework/orders/orders';
import { getLayout as getSiteLayout } from '@components/layouts/layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useVerifyOrderMutation } from '@framework/orders/orders.query';
import { toast } from 'react-toastify';
import { ROUTES } from '@lib/routes';
export { getStaticProps } from '@framework/ssr/common';

export default function OrdersPage() {
  const router = useRouter()
  const { mutate: verifyOrder, isLoading: loading } = useVerifyOrderMutation()
  useEffect(() => {
    if (router.query.trxref) {
      verifyOrder(
        router.query.trxref as string,
        {
          onSuccess: (order: any) => {
            toast.success('Payment verified, Order processing')
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message)
          }
        }
      )
      router.push(`${ROUTES.ORDERS}`)
    }
  }, [])
  
  return <Orders />;
}

const getLayout = (page: React.ReactElement) =>
  getSiteLayout(
    <div className="bg-light flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14 min-h-screen">
      <DashboardSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
      {page}
    </div>
  );
OrdersPage.authenticate = true;

OrdersPage.getLayout = getLayout;
