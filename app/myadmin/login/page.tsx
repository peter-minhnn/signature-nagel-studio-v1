'use client'
import { LoginRequest } from '@/types/login-type';
import { authMember } from '@/api/auth';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
    const { setItem } = useLocalStorage('tokenAdmin');
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowForgetPassword, setIsShowForgetPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const ShowForgetPassword = () => {
        setIsShowForgetPassword(!isShowForgetPassword);        
    }

    const ShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);        
    }

    const handleSignIn = async () => {
        const response = await authMember({ email: email, password: password });
        if (response.code === 'success' && response.data?.code == 1) {
            setItem(response.data.data.token);
            router.push('/myadmin/account');
         }else{
            toast.error('Email or password incorrect!', {
               position: "top-center",
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               });
         }
   }

    return (
        <div className="page-content">
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6 col-xl-5">
                     <div id="login_ui" className={`login ${isShowForgetPassword ? 'display-hide' : ''}`}>
                        <div className="page-content-wrapper">
                           <div className="heading">Sign in</div>
                           <form id="login_form">
                                 <span id="email_error" className="text-danger"></span>
                                 <div className="input-group">
                                    <input type="text" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                                 </div>
                                 <span id="password_error" className="text-danger"></span>
                                 <div className="input-group">
                                    <input type={isShowPassword ? 'text' : 'password'} id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                                    <FontAwesomeIcon icon={faEye} onClick={ShowHidePassword} height={18} width={18} className='icon-fa'/>
                                 </div>
                                 <button type="button" className="btn btn-blue btn-login" id="login" onClick={handleSignIn}>Log in</button>
                              </form>
                           <a type="button" id="forget" className="forgot-password" onClick={ShowForgetPassword}>Forget pasword?</a>
                        </div>
                     </div>
                     <div id="forget_ui" className={`login ${!isShowForgetPassword ? 'display-hide' : ''}`}>
                        <div className="page-content-wrapper">
                           <div className="heading">Forget password</div>
                              <form method="post" id="forget_form">
                                 <span id="forget_email_error" className="text-danger"></span>
                                 <div className="input-group">
                                    <input type="text" id="forget_email" className="form-control" placeholder="Email"/>
                                 </div>
                                 <button type="submit" className="btn btn-blue btn-login" id="send">Send</button>
                              </form>
                           <a type="button" id="back" className="forgot-password" onClick={ShowForgetPassword}>Back</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    )
}

export default LoginPage;