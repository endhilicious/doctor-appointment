import { NextPage } from 'next';

declare module 'next' {
  type NextPageWithLayout = NextPage & {
    layout?: React.FC;
  };
}
