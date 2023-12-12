'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate } from '@/api/auth';
import { createUser, deleteUser, getAllUser } from '@/api/user';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';


const CustomerPage = () => {
    const { setItem } = useLocalStorage('token');
    const [customerList, setCustomerList] = useState([]);
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const getUsers = async () => {
        const response = await getAllUser();
        if (response.code === 'success') {
            setCustomerList(response.data.data);
        }
        console.log(response);
    }

    // const handleSignIn = async (values: LoginRequest) => {
    //     const response = await authenticate({ username: values.username, password: values.password });
    //     if (response.code === 'success') {
    //         setItem(response.data.data.token);
    //         router.push('/user');
    //     }
    //     console.log(response)
    // }

    useEffect(() => {
        getUsers();
    }, []);

    const handleAddCustomer = async () => {
      const response = await createUser(
        { 
           fullName: fullName, 
           email: email,
           password: password,
           phoneNumber: phoneNumber,
           birthday: birthday
        }
     );
    if (response.code === 'success' && response.data.code == 1) {
      setShow(false);
      getUsers();
      Swal.fire(
        'Successfully!',
        'Add customer success!',
        'success');
    }
    };

    const handleDeleteUser = async(id: string, email: string) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteUser(
            { 
               id: id, 
               email: email
            }
         );
          if (response.code === 'success' && response.data.code == 1) {
            setShow(false);
            getUsers();
            Swal.fire(
              'Successfully!',
              'Delete customer success!',
              'success');
          }
        }
      })
      
    }

    return (
      <div className="page-content">
      <div className="container">
         <div className="row justify-content-center align-items-center">
            <div className="col-lg-12">
               <div className="page-content-wrapper">
                  <div className="services">
                     <div className="row heading">
                        <div className="col-md-10">
                              <h3 className="panel-title">CUSTOMER LIST</h3>
                        </div>
                        <div className="col-md-2">
                              <button type="button" id="add_button" className="btn btn-blue" onClick={handleShow}>Add</button>
                        </div>
                     </div>
                     <div className="services-wrapper">
                        <div className="table-responsive table-responsive-vertical">
                           <span id="success_message"></span>
                           <table className="table table-borderless table-mc-light-blue align-middle w-100">
                              <thead>
                                 <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Birthday</th>
                                    <th scope="col">Login</th>
                                    <th scope="col">Booking</th>
                                    <th scope="col">Action</th>
                                 </tr>
                              </thead>
                              <tbody id="data">          
                                {customerList.map((customer: any, index) => {
                                return (
                                    <tr>
                                        <td data-title="No">{index + 1}</td>
                                        <td data-title="Fullname">{customer.fullName} <a className="badge bg-info" href="tel:0622979022">{customer.phoneNumber}</a></td>
                                        <td data-title="Email"><a href="#" className="text-primary edit" id="68">{customer.email}</a></td>
                                        <td data-title="Birthday"></td>
                                        <td data-title="Login">2022-11-21 11:44:45</td>
                                        <td data-title="Booking">2</td>
                                        <td data-title="Action">
                                            <button className="btn btn-danger delete" onClick={() => handleDeleteUser(customer.ID, customer.email)} id="68"><FontAwesomeIcon icon={faTrashCan} /></button>
                                        </td>
                                    </tr>
                                );
                            })}  
            </tbody>
                           </table>
                        </div>
                        <nav aria-label="...">
                           <ul className="pagination" id="page">
                  <li className="page-item active" aria-current="page">
                      <span className="page-link">1</span>
                  </li>
                  
                  <li className="page-item">
                      <a className="page-link" href="?page=2">2</a>
                  </li>
                  </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                value={fullName} onChange={e => setFullName(e.target.value)}
                type="text"
                placeholder=""
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                type="tel"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
              value={password} onChange={e => setPassword(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
              value={birthday} onChange={e => setBirthday(e.target.value)}
                type="date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleAddCustomer}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
   </div>
    )
}

export default CustomerPage;