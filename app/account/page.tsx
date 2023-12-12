'use client'
import { LoginRequest } from '@/types/login-type';
import { checkAuth } from '@/api/auth';
import { getUser, updateUser, changePasswordUser } from '@/api/user';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

const AccountPage = () => {
    const { setItem, getItem } = useLocalStorage('token');
    const router = useRouter();
    const [userId, setUserId] = useState(0);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    useEffect(() => {
      checkLogin();
      handleGetUser();
   }, [])

    const ShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);        
    }

    const onSetBirthday = (event: any) => {
      setBirthday(event.target.value);
    }

    const handleGetUser = async () => {
      const response = await getUser();
       if (response.code === 'success' && response.data.code == 1) {
         setFullName(response.data.data[0].fullName);
         setEmail(response.data.data[0].email);
         setPhoneNumber(response.data.data[0].phoneNumber);
         setUserId(response.data.data[0].ID);
         if(response.data.data[0].birthday){
            setBirthday(moment(response.data.data[0].birthday, 'YYYYMMDD').toDate().toISOString().slice(0,10));
         }
      }
    }

    const handleUpdateInfo = async () => {
      const response = await updateUser({
         id: userId,
         fullName: fullName,
         phoneNumber: phoneNumber,
         email: email,
         birthday: birthday ? moment(birthday).format('YYYYMMDD') : ''
      });
       if (response.code === 'success' && response.data.code == 1) {
         toast.success('Update info successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
    }

    const handleChangePassword = async () => {
      if(!password || !verifyPassword){
         toast.warning('Please in put password!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
         return;
      }

      if(password != verifyPassword){
         toast.warning('Password and re-type password does not match!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
         return;
      }
      const response = await changePasswordUser({
         id: userId,
         password: password,
         email: email,
      });
       if (response.code === 'success' && response.data.code == 1) {
         toast.success('Change password successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
         setPassword('');
         setVerifyPassword('');
      }
    }

    const handleLogout = () => {
      setItem('');
      router.push('/');
    }

    const checkLogin = async () => {
        const response = await checkAuth({ token: getItem()});
        console.log(response)
        if (response.code === 'success' && response.data.code == 1) return;
        router.push('/login');
    }

    return (
      <div className="page-content">
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-11">
                     <div className="page-content-wrapper">
                        <div className="information">
                           <h2 className="heading">YOUR INFOMATION</h2>
                           <div className="information-wrapper">
                              <form id="info_form">
                                 <div className="row form-group">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                       <span id="fullname_error" className="text-danger"></span>
                                       <div className="input-group">
                                          <input type="text" id="fullname" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name"/>
                                       </div>
                                    </div>
                                    <div className="col-md-6 mb-3 mb-md-0">
                                       <span id="phone_error" className="text-danger"></span>
                                       <div className="input-group">
                                          <input type="text" id="phone" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Your phone"/>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="row form-group">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                       <div className="input-group">
                                          <input type="date" id="birthday" className="form-control" value={birthday} onChange={onSetBirthday} placeholder="Birthday"/>
                                       </div>
                                    </div>
                                    <div className="col-md-6">
                                       <button type='button' onClick={handleUpdateInfo} className="btn btn-blue mt-3 mt-md-0" id="save">Update Your Info</button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                        <div className="information">
                           <h2 className="heading">CHANGE PASSWORD</h2>
                           <div className="information-wrapper">
                              <form method="post" id="password_form">
                                 <div className="row">
                                    <div className="col-md-5 mb-3 mb-md-0">
                                       <span id="password_error" className="text-danger"></span>
                                       <div className="input-group">
                                          <input type="password" id="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                          <i className="fas fa-eye" onClick={ShowHidePassword}></i>
                                       </div>
                                    </div>
                                    <div className="col-md-5 mb-3 mb-md-0">
                                       <div className="input-group">
                                          <input type="password" id="repassword" className="form-control" placeholder="Re-type password" value={verifyPassword} onChange={e => setVerifyPassword(e.target.value)}/>
                                          <i className="fas fa-eye" onClick={ShowHidePassword}></i>
                                       </div>
                                    </div>
                                    <div className="col-md-2 mb-3 mb-md-0">
                                       <button className="btn btn-blue mt-3 mt-md-0" type='button' id="change" onClick={handleChangePassword}>Change</button>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                        <div className="information">
                           <button className="btn btn-blue mt-3 mt-md-0" onClick={handleLogout}>LOGOUT</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
    )
}

export default AccountPage;