import  { FC } from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout: FC<{ children: JSX.Element }> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

export default MainLayout;
