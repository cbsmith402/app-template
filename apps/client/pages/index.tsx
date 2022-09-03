import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';
import UserLayout from '../components/userLayout';

const Index: NextPageWithLayout = () => {
  return <div>Welcome</div>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
