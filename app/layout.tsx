'use client'
import { Inter } from 'next/font/google';
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Logo from './assets/images/logo.png'
import FlagENImage from './assets/images/en.png';
import FlagNLImage from './assets/images/nl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { checkAuth } from '@/api/auth';
import Provider from './provider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'sweetalert2/src/sweetalert2.scss'
import MenuLink from '@/components/header/menu-link';

const inter = Inter({ subsets: ['latin'] });
// export const metadata: Metadata = {
//   title: 'HomePage',
//   description: '',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { getItem, setItem } = useLocalStorage('token');
  const { getItem: getLang, setItem: setLang } = useLocalStorage('lang');
  const [isLogin, setIsLogin] = useState(false);
  const [currentLang, setCurrentLang] = useState(getLang);
  const setLanguage = setLang;
  // const token = getItem();
  // console.log(token)
  // if (!token) return <LoginPage />

  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const [isEN, setIsEN] = useState(true);

  useEffect(() => {
    if (!getLang()) {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [setItem]);

  const checkLogin = async () => {
    const response = await checkAuth({ token: getItem() });
    if (response.code === 'success' && response.data.code == 1) {
      setIsLogin(true);
    };
  }

  const ShowMobileMenu = () => {
    setIsShowMobileMenu(true);
  }
  const HideMobileMenu = () => {
    setIsShowMobileMenu(false);
  }

  const ChangeLang = (lang: string) => {
    if (lang == 'en') {
      setIsEN(true);
    } else {
      setIsEN(false);
    }
    setLanguage(lang);
    setCurrentLang(lang);
  }

  return (

    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col items-center justify-between content-wrapper`}>
        <Provider>
          <MenuLink></MenuLink>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      </body>
    </html>
  )
}
