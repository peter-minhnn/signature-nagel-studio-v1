'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate, checkAuth } from '@/api/auth';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter, usePathname  } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const LoginPage = () => {
   const router = useRouter();
   const pathname = usePathname();
    const { getItem } = useLocalStorage('token');
    const { getItem: getTokenAdmin } = useLocalStorage('tokenAdmin');
    const [ isAdminPage, setIsAdminPage ] = useState(false);

    useEffect(() => {
      if(pathname.includes('myadmin')){
         setIsAdminPage(true);
     }
  }, []);

  useEffect(() => {
    checkLogin();
}, [isAdminPage]);

  const checkLogin = async () => {
    const response = await checkAuth({ token: isAdminPage ? getTokenAdmin() : getItem()});
    if (response.code === 'success' && response.data.code == 1){
      router.push('/myadmin/booking');
    }else{
      router.push('/myadmin/login');
    }
  }

    return (<></>
    )
}

export default LoginPage;