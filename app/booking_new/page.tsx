'use client'
import { LoginRequest } from '@/types/login-type';
import { createBooking, deleteBooking, getBookingDetails, updateBooking } from '@/api/booking';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getService } from '@/api/service';
import { Service } from '@/types/service-type';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import moment from 'moment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const BookingNewPage = () => {
   const searchParams = useSearchParams();
   const bookingId = searchParams.get('bookingId');
   const defaultDate = new Date();
   const defaultTime = moment(defaultDate).format('HH:mm');
   const [bookingDate, setBookingDate] = useState(defaultDate);
   const [bookingTime, setBookingTime] = useState(defaultTime);
   const [show, setShow] = useState(false);
   const handleClose = () => {
      setShow(false);
      setServices([]);      
      setSelectedService('');
   };
   const handleShow = () => setShow(true);
   
   const [showDuplicateService, setShowDuplicateService] = useState(false);
   const [selectedService, setSelectedService] = useState("");
   const [showDeleteService, setShowDeleteService] = useState(false);   
   const [ serviceGroupList, setServiceGroupList ] = useState([]);
   const [ serviceGroups, setServiceGroups ] = useState<any[]>([]);
   const [ services, setServices ] = useState([]);
   const [ serviceActive, setServiceActive ] = useState('');
   const [ bookingList, setBookingList ] = useState([]);
   const [ serviceDeleteID, setServiceDeleteID ] = useState('');
   const [showSuccessDialog, setShowSuccessDialog] = useState(false);  
   const [totalPrice, setTotalPrice] = useState(0);
   
   const { setItem } = useLocalStorage('token');
   const router = useRouter();
   const [isShowPassword, setIsShowPassword] = useState(false);
   const [isShowForgetPassword, setIsShowForgetPassword] = useState(false);
   // const handleSignIn = async (values: LoginRequest) => {
   //      const response = await authenticate({ username: values.username, password: values.password });
   //      if (response.code === 'success') {
   //          setItem(response.data.data.token);
   //          router.push('/user');
   //      }
   //      console.log(response)
   //  }

   useEffect(() => {
      handleGetService();
   }, []);

   useEffect(() => {
      if(bookingId){
         handleGetBookingDetails(bookingId);
      }
   }, [serviceGroupList]);

    const onSetBookingDate = (event: any) => {
      setBookingDate(new Date(event.target.value))
    }

    const onSetBookingTime = (event: any) => {
      console.log(event.target.value);
      setBookingTime(event.target.value);
    }

    const handleGetBookingDetails = async (bookingId: string) => {
      const response = await getBookingDetails({bookingId: bookingId});
      if (response.code === 'success' && response.data.code == 1 && response.data.data.length){
         const firstService = response.data.data[0];
         if(firstService){
            setBookingDate(moment(firstService.BOOKINGDATE,'YYYYMMDDHH:mm').toDate());
            setBookingTime(moment(firstService.BOOKINGDATE,'YYYYMMDDHH:mm').format('HH:mm'));
         }

         for(let i = 0; i < response.data.data.length; i++){
            handleAddService(response.data.data[i].SERVICEID);
         }
      }
   }

    const handleAddBooking = () => {
      let message = '';
      if(bookingTime < '09:30'){
         message = 'Please book later than 09:30 AM';
      }else if(bookingTime > '18:00'){
         message = 'Please book earlier than 06:00 PM';
      }else if(moment(bookingDate).format('YYYYMMDD') == moment().format('YYYYMMDD')
               && moment().add(60, 'minutes').format('HH:mm') > bookingTime ){
                  message = 'Please book at least 1 hour earlier.';
      }

      if(message){
         toast.warning(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }else{
         setShow(true);
      }
    }

    const handleGetService = async () => {
      const response = await getService();
       if (response.code === 'success' && response.data.code == 1) {
         setServiceGroupList(response.data.data);
         const arrayUniqueByKey: any[] = [];
         for(let i = 0; i < response.data.data.length; i++){
            if(!arrayUniqueByKey.find((x: any) => x.name == response.data.data[i].GROUPNAMEEN)){
               arrayUniqueByKey.push({value: response.data.data[i].GROUPID, name: response.data.data[i].GROUPNAMEEN})
            }
         }
         // const arrayUniqueByKey = [...new Map(response.data.data.map((item: any) =>
         //    [item['GROUPID'], item['SERVICENAMEEN']])).values()];
         setServiceGroups(arrayUniqueByKey);
       }
   }

   const onChangeServiceGroup = (event: any) => {      
      const serviceList = serviceGroupList.filter( (x: any) => x.GROUPID == event.target.value);
      setServices(serviceList);      
      setSelectedService(event.target.value);
   }

   const handleSelectRow = (serviceId: string) => {
      setServiceActive(serviceId);
   }

   const handleAddService = (serviceID: string = '') => {
      const curBookingList = bookingList;
      if(curBookingList.find((x: any) => x.SERVICEID == (serviceID ? serviceID : serviceActive))){
         toast.warning('This service already added in your booking list.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }else{
         const service = serviceGroupList.filter( (x: any) => x.SERVICEID == (serviceID ? serviceID : serviceActive));
         if(service.length){
            curBookingList.push(service[0]);
         }
         setBookingList(curBookingList);
      }
      const sum = curBookingList.reduce((accumulator, x: any) => {
         return accumulator + Number(x.PRICE);
       }, 0);
      setTotalPrice(sum);
   }

   const handleShowConfirmDeleteDialog = (serviceId: string) => {
      setServiceDeleteID(serviceId);
      setShowDeleteService(true);
   }

   const handleDeleteService = () => {
      let curBookingList = bookingList;
      curBookingList = curBookingList.filter((x: any) => x.SERVICEID != serviceDeleteID);
      setBookingList(curBookingList);
      setShowDeleteService(false);
      const sum = curBookingList.reduce((accumulator, x: any) => {
         return accumulator + Number(x.PRICE);
       }, 0);
      setTotalPrice(sum);
   }

   const handleBook = async () => {
      if(!bookingList.length){
         toast.warning('Please add service!', {
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
      const services = bookingList.map((x: any) => x.SERVICEID).join(',');
      if(bookingId){
         const response = await updateBooking({ bookingId: bookingId, bookingDate: moment(bookingDate).format('YYYYMMDD') + bookingTime, services: services });
         if(response.code === 'success' && response.data.code == 1){
            Swal.fire(
               'Sweet!',
               'Thank you for your booking. You will receive our confirmation for your booking as soon as possible!',
               'success');
            router.push('/booking');
         }
      }else{
         const response = await createBooking({ bookingDate: moment(bookingDate).format('YYYYMMDD') + bookingTime, services: services });
         if(response.code === 'success' && response.data.code == 1){
            Swal.fire(
               'Sweet!',
               'Thank you for your booking. You will receive our confirmation for your booking as soon as possible!',
               'success');
            router.push('/booking');
         }
      }
            
   }

    return (
      <div className="page-content">
            <div className="container">
               <div className="row justify-content-center align-items-center">
                  <div className="col-lg-11">
                     <div className="page-content-wrapper">
                        <div className="services">
                           <div className="row heading">
                              <div className="col-md-8">
                                 <h3 className="panel-title">MY BOOKING</h3>
                              </div>
                              <div className="col-md-4">
                              </div>
                           </div>
                           <div className="services-wrapper">
                           <form method="post" id="booking_form">
                              <div className="row p-2">
                                 <div className="col-md-3 mb-3 mb-md-0">
                                    Booking time:
                                 </div>
                                 <div className="col-md-5 mb-3 mb-md-0">
                                    <span id="date_error" className="text-danger"></span>
                                    <div className="input-group">
                                       <input type="date" value={bookingDate.toISOString().slice(0,10)} onChange={onSetBookingDate}  id="booking_date" name="booking_date" className="form-control" placeholder="Date"/>
                                    </div>
                                 </div>
                                 <div className="col-md-4">
                                    <span id="time_error" className="text-danger"></span>
                                    <div className="input-group">
                                       <input type="time" value={bookingTime} onChange={onSetBookingTime} id="booking_time" name="booking_time" className="form-control" placeholder="Time"/>
                                    </div>
                                 </div>
                              </div>
                              <div className="table-responsive table-responsive-vertical">
                                 <table className="table table-borderless table-mc-light-blue align-middle w-100">
                                 <thead className="table-info">
                                    <tr>
                                       <th className="col">No.</th>
                                       <th className="col">Service</th>
                                       <th className="col">Description</th>
                                       <th className="col">Price</th>
                                       <th className="col">Duraration</th>
                                       <th className="col">Staff</th>
                                       <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody id="data">
                                       {
                                          bookingList.map((booking: Service, index: number) => {
                                             return(
                                                <>
                                                   <tr>
                                                      <td data-title="No" className="text-danger fw-bold">{index + 1}</td>
                                                      <td data-title="Service">{booking.GROUPNAMEEN}</td>
                                                      <td data-title="Description">{booking.SERVICENAMEEN} ({booking.DESCRIPTIONEN})</td>
                                                      <td data-title="Price">{booking.PRICE}€</td>
                                                      <td data-title="Duraration">{booking.DURATION}</td>
                                                      <td data-title="Staff"></td>
                                                      <td data-title="Action">
                                                         <input type="hidden" id="service-1" name="service-1" className="booking_string" value="0|2|0|70"/>
                                                         <a href="#" className="btn btnIcon-danger delete" id="0"><FontAwesomeIcon className='btnIcon-danger' icon={faTrashCan} onClick={() => handleShowConfirmDeleteDialog(booking.SERVICEID)}/></a>
                                                      </td>
                                                   </tr>
                                                </>
                                             )
                                          })
                                       }
                                       <tr>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                          <td></td>
                                       </tr>
                                       <tr className="table-info">
                                             <td className="p-2" data-title="Total" colSpan={3}>Total</td>
                                             <td className="p-2" data-title="Price" colSpan={4}>{totalPrice}€</td>
                                       </tr>
                                    </tbody>
                                 </table>
                                 <span id="success_message"></span>
                              </div>
                              <div className="d-grid gap-2 col-4 mx-auto p-2">
                                 <button type="button" onClick={handleAddBooking} className="btn btn-info btn-sm" id="add_button">ADD</button>
                              </div>
                              <input type="hidden" id="booking_grp_id" name="booking_grp_id" value="0"/>
                              <button type="button" name="book" id="book" className="btn btn btn-blue btn-login" onClick={handleBook}>BOOK</button>
                           </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Control
                as="select"
                value={selectedService}
                onChange={onChangeServiceGroup}
                autoFocus
              >               
              <option value="">--Please Choose Service --</option>
               {serviceGroups.map((opt: any) => (
                  <option value={opt.value}>{opt.name}</option>
               ))}
               </Form.Control>
            </Form.Group>
            <div className="container">
            <table id="infoTable" className="table table-fixed table-condensed">
               <thead>
                  <tr>
                  <th className="col-xs-6"><b>Description</b></th>
                  <th className="col-xs-3"><b>Price</b></th>
                  <th className="col-xs-3"><b>Duration</b></th>
                  </tr>
               </thead>
               <tbody id="service">
                  {
                     services.map((service: Service) => {
                        return(
                           <>
                              <tr style={{cursor:'pointer'}} className={`${serviceActive == service.SERVICEID ? 'clickableRow' : ''}`} onClick={e => handleSelectRow(service.SERVICEID)}>
                                    <td className="col-xs-6">{service.SERVICENAMEEN} ({service.DESCRIPTIONEN})</td>
                                    <td className="col-xs-3">{service.PRICE}€</td>
                                    <td className="col-xs-3">{service.DURATION}'</td>
                              </tr>
                           </>
                        )
                     })
                  }                
                </tbody>
            </table>
            <span id="service_error" className="text-danger"></span>
         </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => handleAddService()}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteService} onHide={() => setShowDeleteService(false)} centered backdrop="static">
        <Modal.Header closeButton>
         <Modal.Title>
            Are you sure?
         </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h2 className="swal2-title" id="swal2-title">You won't be able to revert this!</h2>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={handleDeleteService}>
            Yes, delete it!
          </Button>
          <Button variant="danger" onClick={() => setShowDeleteService(false)}>
            Cancel
          </Button>       
        </Modal.Footer>
      </Modal>
         </div>
    )
}

export default BookingNewPage;