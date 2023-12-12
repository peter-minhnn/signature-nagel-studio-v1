'use client'
import { LoginRequest } from '@/types/login-type';
import { authenticate } from '@/api/auth';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { deleteBookingAdmin, getAllBooking, updateBookingStatus } from '@/api/booking';
import moment from 'moment';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const BookingAdminPage = () => {
    const pageSize = 5;
    const { setItem } = useLocalStorage('token');
    const [bookingList, setBookingList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [selectedPage, setSelectedPage] = useState(0);
    useEffect(() => {
      handleGetBooking();
   }, []);
    const handleGetBooking = async (pageNumber: number = 0) => {
        const pageIndex = pageNumber;        
        const response = await getAllBooking({pageIndex: pageIndex, pageSize: pageSize});
        if (response.code === 'success' && response.data.code == 1) {
            if(response.data.P_TOTAL){
               let totalPage = response.data.P_TOTAL / pageSize;
               if(totalPage % 1 > 0){
                  totalPage = totalPage - totalPage % 1 + 1;
               }
               setTotalPage(totalPage);
               setSelectedPage(pageNumber);
            }
            setBookingList(response.data.data);
        }
    }

    const handleDeleteBooking = async (bookingId: string) => {
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
            const response = await deleteBookingAdmin({ bookingId: bookingId });
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
               handleGetBooking();
            }
         }
       })
    }

    const handleUpdateBookingStatus = async (bookingId: string, status: number) => {
      const response = await updateBookingStatus({ bookingId: bookingId, status: status });
            if(response.code === 'success' && response.data.code == 1){
               toast.success('Update booking status successfully!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  });
               const curBookingList = [...bookingList];
               let booking: any = curBookingList.filter((booking: any) => booking.BOOKINGID ==  bookingId)[0];
               if(booking){
                  booking.STATUS = status;
               }
               setBookingList(curBookingList);
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
                           <h3 className="panel-title">BOOKING LIST</h3>
                        </div>
                        <div className="col-md-4">
                        </div>
                     </div>
                     <div className="services-wrapper">
                        <div className="table-responsive table-responsive-vertical">
                           <span id="success_message"></span>
                           <table className="table table-borderless table-mc-light-blue align-middle w-100">
                              <thead>
                                 <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Booking Time</th>
                                    <th scope="col">Total Service</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Total Duration</th>
                                    <th scope="col">Created Time</th>
                                    <th scope="col">Action</th>
                                 </tr>
                              </thead>
                              <tbody id="data">
                                 {
                                    bookingList.map((bookingItem: any, index: number) =>{
                                       return(
                                          <>
                                             <tr className="clickrow" key={'bookingItem' + index}>
                                               <td data-title="No" className="text-danger fw-bold">{(pageSize * selectedPage) + index + 1}</td>
                                               <td data-title="Customer">{bookingItem.FULLNAME} <a className="badge bg-info" href={`tel:${bookingItem.PHONENUMBER}`}>{bookingItem.PHONENUMBER}</a></td>
                                               <td data-title="Booking Time"><b>{moment(bookingItem.BOOKINGDATE, 'YYYYMMDDHH:mm').format('MM-DD HH:mm')}</b></td>
                                               <td data-title="Total Service">{bookingItem.TOTALSERVICE}</td>
                                               <td data-title="Price">{bookingItem.TOTALPRICE}€</td>
                                               <td data-title="Duration">{bookingItem.TOTALDURATION}'</td>
                                               <td data-title="Created Time">{moment(bookingItem.CREATEDDATE, 'YYYYMMDDHH:mm').format('MM-DD HH:mm')}</td>
                                               <td data-title="Action">
                                                  <button className="btn btn-danger edit" style={{marginRight: '5px'}} onClick={() => handleDeleteBooking(bookingItem.BOOKINGID)}><FontAwesomeIcon icon={faTrashCan} /></button>  
                                                  <button className={`btn btn-${bookingItem.STATUS == 1 ? 'success' : 'secondary'} confirm`} onClick={() => handleUpdateBookingStatus(bookingItem.BOOKINGID, bookingItem.STATUS == 1 ? 0 : 1)}>{bookingItem.STATUS == 0 ? 'Pending' : 'Confirmed'}</button>
                                               </td>
                                             </tr>
                                          </>
                                       )
                                    })
                                 }
            
            </tbody>
                           </table>
                        </div>
                        <nav aria-label="...">
                           <ul className="pagination" id="page">
                              {
                                 totalPage > 0 && [...Array(totalPage)].map((pageNum, index) => {
                                    return (
                                       <>
                                          <li onClick={() => {if(index != selectedPage) handleGetBooking(index)}} style={{cursor: 'pointer'}} className={`page-item ${selectedPage == index ? 'active' : ''}`} key={index} aria-current="page">
                                             <span className="page-link">{index + 1}</span>
                                          </li>
                                       </>
                                    )
                                 })
                              }
                  </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
    )
}

export default BookingAdminPage;