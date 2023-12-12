'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate, checkAuth } from '@/api/auth';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteBooking, getBooking, getBookingDetails } from '@/api/booking';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

const BookingPage = () => {
   const { setItem, getItem } = useLocalStorage('token');
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [bookingList, setBookingList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [ bookingSelected, setBookingSelected ] = useState<any>(null);  

    useEffect(() => {
      checkLogin();
      handleGetBooking();
   }, []);

    const handleGetBooking = async () => {
      const response = await getBooking();
      if(response.code === 'success' && response.data.code == 1){
         setBookingList(response.data.data);
      }      
   }

   const checkLogin = async () => {
      const response = await checkAuth({ token: getItem()});
      console.log(response)
      if (response.code === 'success' && response.data.code == 1) return;
      router.push('/login');
  }

  const handleSelectRow = (booking: any) => {
      handleGetBookingDetails(booking.BOOKINGID);
      setBookingSelected(booking);
      setShow(true);
   }
   const handleClose = () => {
      setShow(false);
   };

   const handleDeleteBooking = async () => {
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
            const response = await deleteBooking({ bookingId: bookingSelected.BOOKINGID });
            if(response.code === 'success' && response.data.code == 1){
               toast.success('Delete booking successfully!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
               setShow(false);
               handleGetBooking();
            }
         }
       })
   }

   const handleEditBooking = () => {
      router.push('/booking_new?bookingId=' + bookingSelected.BOOKINGID);
   }

   const handleGetBookingDetails = async (bookingId: string) => {
      const response = await getBookingDetails({bookingId: bookingId});
      if (response.code === 'success' && response.data.code == 1){
         setServiceList(response.data.data);
         const sumPrice = response.data.data.reduce((accumulator: any, x: any) => {
            return accumulator + Number(x.PRICE);
          }, 0);
         setTotalPrice(sumPrice);
         const sumDuration = response.data.data.reduce((accumulator: any, x: any) => {
            return accumulator + Number(x.DURATION);
          }, 0);
          setTotalDuration(sumDuration);
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
                              <h3 className="panel-title">MY BOOKING LIST</h3>
                        </div>
                        <div className="col-md-4">
                              <a href="/booking_new" className="btn btn-blue">New Booking</a>
                        </div>
                     </div>
                     <div className="services-wrapper">
                        <div className="table-responsive table-responsive-vertical">
                           <span id="success_message"></span>
                           <table className="table table-borderless table-mc-light-blue align-middle w-100">
                              <thead>
                                 <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Created Time</th>
                                    <th scope="col">Total Service</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Total Duration</th>
                                    <th scope="col">Booking Time</th>
                                    <th scope="col">Status</th>
                                 </tr>
                              </thead>
                              <tbody id="data">
                                 {
                                    bookingList.map((booking: any, index: number) => {
                                       return(
                                          <>
                                             <tr className="clickrow" style={{cursor:'pointer', backgroundColor:'#ffffff'}} onClick={e => handleSelectRow(booking)} >
                                                <td data-title="No" className="text-danger fw-bold">{index + 1}</td>
                                                <td data-title="Created Time">{moment(booking.CREATEDDATE).format('MM-DD HH:mm')}</td>
                                                <td data-title="Total Service">{booking.TOTALSERVICE}</td>
                                                <td data-title="Price">{booking.TOTALPRICE}€</td>
                                                <td data-title="Duration">{booking.TOTALDURATION}'</td>
                                                <td data-title="Booking Time"><b>{moment(booking.BOOKINGDATE, 'YYYYMMDDHH:mm').format('MM-DD HH:mm')}</b></td>
                                                <td data-title="Status"><span className={`badge bg-${booking.STATUS == 0 ? 'secondary': 'success'}`}>{booking.STATUS == 0 ? 'Pending' : 'Confirmed'}</span></td>
                                             </tr>
                                          </>
                                       )
                                    })
                                 }
                              
                              </tbody>
                           </table>
                        </div>
                        <nav aria-label="...">
                           <ul className="pagination" id="page"></ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <Modal show={show} onHide={handleClose} centered backdrop="static" size='lg'>
         <Modal.Header closeButton>
         <Modal.Title>My Booking</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div id="booking_time"><div className="alert alert-success" style={{color: '#0f5132'}} role="alert">Booking time: <b>{bookingSelected ? moment(bookingSelected.BOOKINGDATE, 'YYYYMMDDHH:mm').format('MM-DD-YYYY HH:mm') : ''}</b></div></div>
         <Form>
            <div className="container">
            <div className="table-responsive table-responsive-vertical">
            <table className="table table-bordered align-middle w-100">
               <thead className="table-info">
               <tr>
                  <th className="p-2">No.</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Staff</th>
               </tr>
               </thead>
               <tbody id="service">
                  {serviceList.map((service: any, index) =>{
                     return(
                        <>
                           <tr>
                              <td className="p-2" data-title="No.">{index + 1}</td>
                              <td className="p-2" data-title="Service">{service.SERVICENAMEEN} ({service.DESCRIPTIONEN})</td>
                              <td className="p-2" data-title="Price">{service.PRICE}€</td>
                              <td className="p-2" data-title="Duration">{service.DURATION}'</td>
                              <td className="p-2" data-title="Staff"></td>
						         </tr>
                        </>
                     )
                  })}
						
						
                    <tr className="table-info">
                        <td className="p-2" data-title="Total" colSpan={2}>Total</td>
                        <td className="p-2" data-title="Price">{totalPrice}€</td>
                        <td className="p-2" data-title="Duration" colSpan={2}>{totalDuration}'</td>
                    </tr>
                    </tbody>
            </table>
         </div>
            <span id="service_error" className="text-danger"></span>
         </div>
         </Form>
         </Modal.Body>
         <Modal.Footer>
         <Button variant="info" onClick={handleEditBooking}>
            Edit
         </Button>
         <Button variant="danger" onClick={handleDeleteBooking}>
            Delete
         </Button>
         <Button variant="secondary" onClick={handleClose}>
            Close
         </Button>
         
         </Modal.Footer>
      </Modal>
   </div>
//    <form method="post" id="user_form">
//    <div className="modal-content">
//      <div className="modal-header">
//        <h5 className="modal-title" id="staticBackdropLabel">My Booking</h5>
//        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//      </div>
//      <div className="modal-body">
//         <div id="booking_time"><div className="alert alert-success" role="alert">Booking time: <b>12-11-2023 10:06</b></div></div>

//         <div className="table-responsive table-responsive-vertical">
//            <table className="table table-bordered align-middle w-100">
//               <thead className="table-info">
//               <tr>
//                  <th className="p-2">No.</th>
//                  <th className="p-2">Service</th>
//                  <th className="p-2">Price</th>
//                  <th className="p-2">Duration</th>
//                  <th className="p-2">Staff</th>
//               </tr>
//               </thead>
//               <tbody id="service">
//                  <tr>
//                            <td className="p-2" data-title="No.">1</td>
//                            <td className="p-2" data-title="Service">Spa pedicure (feet care)</td>
//                            <td className="p-2" data-title="Price">40€</td>
//                            <td className="p-2" data-title="Duration">40'</td>
//                            <td className="p-2" data-title="Staff"></td>
//                  </tr>
                 
//                    <tr className="table-info">
//                        <td className="p-2" data-title="Total" colspan="2">Total</td>
//                        <td className="p-2" data-title="Price">40€</td>
//                        <td className="p-2" data-title="Duration" colspan="2">40'</td>
//                    </tr>
//                    </tbody>
//            </table>
//         </div>

//      </div>
//      <div className="modal-footer">
//         <input type="hidden" name="booking_grp_id" id="booking_grp_id" value="1015">
//         <a href="booking_new?id=1015" className="btn btn-primary" name="edit" id="edit">Edit</a>
//         <button type="button" className="btn btn-danger" name="delete" id="delete">Delete</button>
//         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//      </div>
//    </div>
//   </form>
    )
}

export default BookingPage;