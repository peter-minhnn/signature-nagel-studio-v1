'use client'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter, usePathname  } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useState } from 'react';
import { checkAuth } from '@/api/auth';
import Image from 'next/image';
import Logo from '@/app/assets/images/logo.png'
import FlagENImage from '@/app/assets/images/en.png';
import FlagNLImage from '@/app/assets/images/nl.png';
import useLanguage from '@/lib/hooks/useLanguage';

const MenuLink = () => {
    const pathname = usePathname();
    const { getItem, setItem } = useLocalStorage('token');
    const { getItem: getTokenAdmin } = useLocalStorage('tokenAdmin');
    const { setItem: setLang } = useLocalStorage('lang');
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isAdminPage, setIsAdminPage ] = useState(false);
    const { currentLang } = useLanguage();

   useEffect(() => {
    if(currentLang == 'en'){
      setIsEN(true);      
    }else{
      setIsEN(false);
    }
   }, [currentLang]);

    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
    const [isEN, setIsEN] = useState(true);

    useEffect(() => {        
        if(pathname.includes('myadmin')){
            setIsAdminPage(true);
        }
    }, []);

    useEffect(() => {        
      checkLogin();
  }, [isAdminPage, getTokenAdmin, getItem]);
  
    const checkLogin = async () => {
      const response = await checkAuth({ token: isAdminPage ? getTokenAdmin() : getItem()});
      if (response.code === 'success' && response.data.code == 1){
        setIsLogin(true);
      }else{
        setIsLogin(false);
      };
    }
  
     const ShowMobileMenu = () => {
        setIsShowMobileMenu(true);
     }
     const HideMobileMenu = () => {
        setIsShowMobileMenu(false);
     }
  
     const ChangeLang = (lang: string) =>{
      if(lang == 'en'){
        setIsEN(true);      
      }else{
        setIsEN(false);
      }
      setLang(lang)
      window.location.reload();
     }

     const renderHeaderAdmin = useMemo(() => {
      return isAdminPage ? (
         <>
            <ul className="menu_action d-none d-md-flex">
            <li className="menu_action-item">
               <a href={isLogin ? '/myadmin/account' : '/myadmin/login'} className="menu_action-link menu-link">{isLogin ? 'Account' : 'Login'}</a>            </li>
            <li className="menu_action-item">
               <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/notification'}>
                  Notifications
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">147</span>
               </button>
            </li>
            <li className="menu_action-item">
               <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/booking'}>
                  Booking
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
               </button>
            </li>
         </ul>
         </>
      ) : null
   }, [isAdminPage]);

   const renderHeaderUser = useMemo(() => {
    return !isAdminPage ? (
       <>
          <ul className="menu_action d-none d-md-flex">
                    <li className="menu_action-item">
                      <a href='#' className="menu_action-link"><Image height={25} src={isEN ? FlagNLImage : FlagENImage } onClick={() =>ChangeLang(`${isEN ? 'nl' : 'en'}`)} className="lang-image" alt={''}/></a>
                    </li>
                    <li className="menu_action-item">
                      <a href={isLogin ? '/account' : '/login'} className="menu_action-link menu-link">{isLogin ? 'Account' : 'Login'}</a>                  </li>
                    <li className="menu_action-item vibrate_effect">
                      <a href="/booking" className="menu_action-link booking">{isEN ? 'Booking' : 'BOEKING'} <span>Now!</span></a>
                    </li>
                </ul>
       </>
    ) : null
 }, [isAdminPage]);

 const renderHeaderOption = useMemo(() => {
  if (isAdminPage) {
     return (isLogin ? (<>{renderHeaderAdmin}</>) : null);
  }
  return (<>{renderHeaderUser}</>);
}, [isAdminPage])

const renderMobileHeaderUser = useMemo(() => {
  return !isAdminPage ? (
     <>
        <ul className="mobile_menu">
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/customer' : '/'} className="mobile_menu-link active">{isAdminPage ? 'Customer' : 'Home'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/member' : '/#services'} className="mobile_menu-link active">{isAdminPage ? 'Member' : 'Services'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/service' : '/#about'} className="mobile_menu-link active">{isAdminPage ? 'Service' : 'Over'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/gallery' : '/#contact'} className="mobile_menu-link active">{isAdminPage ? 'Gallery' : 'Contact'}</a>
          </li>
          <hr></hr>
          <li className="mobile_menu-item">
            <a className="menu_action-link" ><Image height={25} src={isEN ? FlagNLImage : FlagENImage} className="lang-image" alt={''} onClick={() =>ChangeLang(`${isEN ? 'nl' : 'en'}`)}/></a>
          </li>
          <li className="mobile_menu-item">
            <a href={isLogin ? isAdminPage ? '/myadmin/account' : '/account' : isAdminPage ? '/myadmin/login' : '/login'} className="mobile_menu-link">{isLogin ? 'Account' : 'Login'}</a>                  </li>
          <li className="mobile_menu-item">
            <a href="/booking" className="mobile_menu-link booking">{isEN ? 'Booking' : 'BOEKING'} <span>Now!</span></a>
          </li>
        </ul>
     </>
  ) : null
}, [isAdminPage]);

const renderMobileHeaderAdmin = useMemo(() => {
  return !isAdminPage ? (
     <>
        <ul className="mobile_menu">
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/customer' : '/'} className="mobile_menu-link active">{isAdminPage ? 'Customer' : 'Home'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/member' : '/#services'} className="mobile_menu-link active">{isAdminPage ? 'Member' : 'Services'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/service' : '/#about'} className="mobile_menu-link active">{isAdminPage ? 'Service' : 'Over'}</a>
          </li>
          <li className="mobile_menu-item">
            <a href={isAdminPage ? '/myadmin/gallery' : '/#contact'} className="mobile_menu-link active">{isAdminPage ? 'Gallery' : 'Contact'}</a>
          </li>
          <hr></hr>
          <li className="mobile_menu-item">
            <a className="menu_action-link" ><Image height={25} src={isEN ? FlagNLImage : FlagENImage} className="lang-image" alt={''} onClick={() =>ChangeLang(`${isEN ? 'nl' : 'en'}`)}/></a>
          </li>
          <li className="mobile_menu-item">
            <a href={isLogin ? isAdminPage ? '/myadmin/account' : '/account' : isAdminPage ? '/myadmin/login' : '/login'} className="mobile_menu-link">{isLogin ? 'Account' : 'Login'}</a>                  </li>
            <li className="menu_action-item mb-3">
               <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/notification'}>
                  Notifications
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">147</span>
               </button>
            </li>
            <li className="menu_action-item">
               <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/booking'}>
                  Booking
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
               </button>
            </li>
        </ul>
     </>
  ) : null
}, [isAdminPage]);

const renderMobileHeaderOption = useMemo(() => {
  if (isAdminPage) {
     return (<>{renderMobileHeaderAdmin}</>);
  }
  return (<>{renderMobileHeaderUser}</>);
}, [isAdminPage])

    return (<>
            <div className="header">
          <div className="container">
              <div className="navbar" >
                <button className="navbar-btn order-1 order-md-0" onClick={ShowMobileMenu}>
                    <FontAwesomeIcon icon={faBars} className="icon-fa"/>
                </button>
                <a href="/" className="logo">
                    <Image width={230} height={130} src={Logo} className="logo-image" alt="Signaturenagel Studio"/>
                </a>
                <div className="menu-wrapper" hidden={!isLogin && isAdminPage ? true : false}>
                    <div className={`menu-wrapper--overlay ${isShowMobileMenu ? 'show' : ''}`} onClick={HideMobileMenu}></div>
                    <div className={`mobile_menu-wrapper ${isShowMobileMenu ? 'show' : ''}`}>
                      <button className="btn_mobile_menu-close">
                          <i className="fas fa-times"></i>
                      </button>
                      <ul className="mobile_menu">
                      <li className="mobile_menu-item">
                        <a href={isAdminPage ? '/myadmin/customer' : '/'} className="mobile_menu-link active">{isAdminPage ? 'Customer' : 'Home'}</a>
                      </li>
                      <li className="mobile_menu-item">
                        <a href={isAdminPage ? '/myadmin/member' : '/#services'} className="mobile_menu-link active">{isAdminPage ? 'Member' : 'Services'}</a>
                      </li>
                      <li className="mobile_menu-item">
                        <a href={isAdminPage ? '/myadmin/service' : '/#about'} className="mobile_menu-link active">{isAdminPage ? 'Service' : 'Over'}</a>
                      </li>
                      <li className="mobile_menu-item">
                        <a href={isAdminPage ? '/myadmin/gallery' : '/#contact'} className="mobile_menu-link active">{isAdminPage ? 'Gallery' : 'Contact'}</a>
                      </li>
                      <hr></hr>
                      <li className="mobile_menu-item">
                        <a className="menu_action-link" ><Image height={25} src={isEN ? FlagNLImage : FlagENImage} className="lang-image" alt={''} onClick={() =>ChangeLang(`${isEN ? 'nl' : 'en'}`)}/></a>
                      </li>
                      <li className="mobile_menu-item">
                        <a href={isLogin ? isAdminPage ? '/myadmin/account' : '/account' : isAdminPage ? '/myadmin/login' : '/login'} className="mobile_menu-link">{isLogin ? 'Account' : 'Login'}</a>                  </li>
                        <li className="menu_action-item mb-3">
                          <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/notification'}>
                              Notifications
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">147</span>
                          </button>
                        </li>
                        <li className="menu_action-item">
                          <button type="button" className="btn btn-primary position-relative" onClick={() => location.href='/myadmin/booking'}>
                              Booking
                              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
                          </button>
                        </li>
                    </ul>
                    </div>
                    <ul className="menu d-none d-lg-flex">
                      <li className="menu-item">
                          <a href={isAdminPage ? '/myadmin/customer' : '/'} className="menu-link active">{isAdminPage ? 'Customer' : 'Home'}</a>
                      </li>
                      <li className="menu-item">
                          <a href={isAdminPage ? '/myadmin/member' : '/#services'} className="menu-link active">{isAdminPage ? 'Member' : 'Services'}</a>
                      </li>
                      <li className="menu-item">
                          <a href={isAdminPage ? '/myadmin/service' : '/#about'} className="menu-link active">{isAdminPage ? 'Service' : 'Over'}</a>
                      </li>
                      <li className="menu-item">
                          <a href={isAdminPage ? '/myadmin/gallery' : '/#contact'} className="menu-link active">{isAdminPage ? 'Gallery' : 'Contact'}</a>
                      </li>
                    </ul>
                </div>
                {renderHeaderOption}
              </div>
          </div>
        </div>
        </>
    )
}

export default MenuLink;