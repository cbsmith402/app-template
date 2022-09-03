import { useFileUpload } from '@nhost/nextjs';
import { ReactElement } from 'react';
import UserLayout from '../components/userLayout';
import { NextPageWithLayout } from './_app';

const Upload: NextPageWithLayout = () => {
  return <div>Welcome</div>;
};

Upload.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Upload;
