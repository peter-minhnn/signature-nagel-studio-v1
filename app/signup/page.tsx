'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate } from '@/api/auth';
import { createUser } from '@/api/user';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SignupPage = () => {
    const { setItem } = useLocalStorage('token');
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const ShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);        
    }

    const handleSignUp = async () => {
      const response = await createUser(
            { 
               fullName: fullName, 
               email: email,
               password: password,
               phoneNumber: phoneNumber,
               birthday: ''
            }
         );
       if (response.code === 'success') {
         //  setItem(response.data.data.token);
          router.push('/account');
      }
    }

    return (
      <div className="page-content">
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-6 col-xl-5">
                     <div className="login">
                        <div className="page-content-wrapper">
                           <div className="heading">Sign up</div>
                           <form method="post" id="signup_form">
                              <span id="fullname_error" className="text-danger"></span>
                              <div className="input-group">
                                 <input type="text" id="fullname" value={fullName} onChange={e => setFullName(e.target.value)} className="form-control" placeholder="Fullname"/>
                              </div>
                              <span id="email_error" className="text-danger"></span>
                              <div className="input-group">
                                 <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email"/>
                              </div>
                              <span id="phone_error" className="text-danger"></span>
                              <div className="input-group">
                                 <input type="phone" id="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control" placeholder="Phone"/>
                              </div>
                              <span id="password_error" className="text-danger"></span>
                              <div className="input-group">
                                 <input type={isShowPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password"/>
                                 <FontAwesomeIcon icon={faEye} onClick={ShowHidePassword} height={18} width={18} className='icon-fa'/>
                              </div>
                              <button className="btn btn-blue btn-login" id="login" onClick={handleSignUp}>Sign up</button>
                           </form>
                           <p className="sign-up">
                              Is a member, <a href="/login">SIGN IN</a> now
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    )
}

export default SignupPage;