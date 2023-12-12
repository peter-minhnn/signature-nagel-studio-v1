'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate } from '@/api/auth';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const LoginPage = () => {
    const { setItem } = useLocalStorage('token');
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowForgetPassword, setIsShowForgetPassword] = useState(false);

    const ShowForgetPassword = () => {
        setIsShowForgetPassword(!isShowForgetPassword);        
    }

    const ShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);        
    }

   //  const handleSignIn = async (values: LoginRequest) => {
   //      const response = await authenticate({ username: values.username, password: values.password });
   //      if (response.code === 'success') {
   //          setItem(response.data.data.token);
   //          router.push('/user');
   //      }
   //      console.log(response)
   //  }

    return (
        <div className="page-content">
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6 col-xl-5">
                     <div id="login_ui" className={`login ${isShowForgetPassword ? 'display-hide' : ''}`}>
                        <div className="page-content-wrapper">
                           <div className="heading">Sign in</div>
                           <form method="post" id="login_form">
                                 <span id="email_error" className="text-danger"></span>
                                 <div className="input-group">
                                    <input type="text" id="email" className="form-control" placeholder="Email"/>
                                 </div>
                                 <span id="password_error" className="text-danger"></span>
                                 <div className="input-group">
                                    <input type={isShowPassword ? 'text' : 'password'} id="password" className="form-control" placeholder="Password"/>
                                    <FontAwesomeIcon icon={faEye} onClick={ShowHidePassword} className="icon-fa"/>
                                 </div>
                                 <button type="submit" className="btn btn-blue btn-login" id="login">Log in</button>
                              </form>
                           <a type="button" id="forget" className="forgot-password" onClick={ShowForgetPassword}>Forget pasword?</a>
                           <p className="sign-up">
                              Not a member, <a href="/signup">SIGN UP</a> now
                           </p>
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