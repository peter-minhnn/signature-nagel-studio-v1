'use client'
import Image from 'next/image';
import Gallery1 from './assets/images/gallery1.jpg';
import Gallery2 from './assets/images/gallery2.jpg';
import Gallery3 from './assets/images/gallery3.jpg';
import Gallery4 from './assets/images/gallery4.jpg';
import Gallery5 from './assets/images/gallery5.jpg';
import Gallery6 from './assets/images/gallery6.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarked, faBusinessTime, faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { getService } from '@/api/service';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Service } from '@/types/service-type';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import useLanguage from '@/lib/hooks/useLanguage';

export default function Home() {
   const [services, setServices] = useState<any>([]);
   const { currentLang } = useLanguage();

   useEffect(() => {
      handleGetService();
   }, [currentLang]);

   const handleGetService = async () => {
      const response = await getService();
      if (response.code === 'success' && response.data.code == 1) {
         const result = response.data.data.reduce((acc: any, d: any) => {
            if (currentLang === 'en') {
               const found = acc.find((a: any) => a.GROUPNAMEEN === d.GROUPNAMEEN);
               const value = { name: d.name, val: d.value };
               if (found) {
                  found.data.push(d);
               }
               else {
                  acc.push({ name: d.GROUPNAMEEN, data: [d] });
               }
            } else {
               const found = acc.find((a: any) => a.GROUPNAMENL === d.GROUPNAMENL);
               const value = { name: d.name, val: d.value };
               if (found) {
                  found.data.push(d);
               }
               else {
                  acc.push({ name: d.GROUPNAMENL, data: [d] });
               }
            }

            return acc;
         }, []);

         let result2: any[] = [];
         if (currentLang == 'en') {
            for (let i = 0; i < result.length; i++) {
               let serviceGroupNames = response.data.data.filter((x: Service) => x.GROUPNAMEEN == result[i].name);
               let data = serviceGroupNames.reduce((acc: any, d: any) => {
                  const found = acc.find((a: any) => a.serviceName === d.SERVICENAMEEN);
                  if (found) {
                     found.data.push(d);
                  }
                  else {
                     acc.push({ serviceName: d.SERVICENAMEEN, data: [d] });
                  }
                  return acc;
               }, []);

               if (!result2.find((a: any) => a.serviceGroupName === result[i].name)) {
                  result2.push({ serviceGroupName: result[i].name, services: data });
               }
            }
         } else {
            for (let i = 0; i < result.length; i++) {
               let serviceGroupNames = response.data.data.filter((x: Service) => x.GROUPNAMENL == result[i].name);
               let data = serviceGroupNames.reduce((acc: any, d: any) => {
                  const found = acc.find((a: any) => a.serviceName === d.SERVICENAMENL);
                  if (found) {
                     found.data.push(d);
                  }
                  else {
                     acc.push({ serviceName: d.SERVICENAMENL, data: [d] });
                  }
                  return acc;
               }, []);

               if (!result2.find((a: any) => a.serviceGroupName === result[i].name)) {
                  result2.push({ serviceGroupName: result[i].name, services: data });
               }
            }
         }

         // const result = response.data.data.reduce((acc: any, d: any) => {
         //    if(currentLang == 'en'){
         //       const found = acc.find((a: any) => a.GROUPNAMEEN === d.GROUPNAMEEN);
         //       if (found) {
         //          found.data.push(d);
         //       }
         //       else {
         //          acc.push({ name: d.GROUPNAMENL, data: [d] });
         //       }              
         //    }else{
         //       const found = acc.find((a: any) => a.GROUPNAMEEN === d.GROUPNAMEEN);
         //       if (found) {
         //       found.data.push(d);
         //       }
         //       else {
         //          acc.push({ name: d.GROUPNAMENL, data: [d] });
         //       }
         //    }
         //    return acc;
         //  });


         setServices(result2);
      }
   }

   const renderENContent = useMemo(() => {
      return currentLang === 'en' ? (
         <>
            <h3>Warranty Policy</h3>
            <p>
               We offer a 1-week warranty for treatments of shellac, acryl and BIAB. Therefore, please come back to us within a week if any problem, we are going to fix them free of charge for you.
            </p>
            <p>
               After a week, it is your own risk, even though you can also inform us. If there is anything we can do for you, we will do our best.
            </p>

            <h3>Cancellation Policy</h3>
            <p>
               Your appointment time is valuable to us. We want to make sure that you receive the best service possible during your scheduled appointment.
            </p>
            <p>
               To help us do this, please notify us within 24 hours of your appointment if you need to cancel or adjust the time. We will be happy to help you reschedule.
            </p>
            <p>
               Failure to give at least 24-hour notice will result in being charged full price for your appointment. No-show will also be charged the full amount and may be required to make a deposit when booking a future appointment.
            </p>
            <p>
               We understand that sometimes unexpected delays happen. That is why we allow a 15 minutes grace period for emergency situations. Please understand that if you are repeatedly late, we will charge 50% of the service fee and require that you rebook your appointment for a later date.
            </p>

            <h3>Refund Policy</h3>
            <p>
               Here at SIGNATURE nagelstudio, we do our best on providing you with an exceptional experience and the best possible service.
            </p>
            <p>
               All our manicure and nail services are non-refundable, but if you are not completely happy with our services, please let us know right away. We will be happy to make any adjustments to the initial service and have your nails fixed in no time.
            </p>
            <a className="tbl_bookingnow" href="booking"><span> BOOKING NOW! </span><i></i></a>
         </>
      ) : null
   }, [currentLang])

   const renderHLContent = useMemo(() => {
      return (
         <>
            <h3>Garantie beleid</h3>
            <p>
               Wij bieden 1-week garantie op behandelingen van gellak, acryl en BIAB. Kom daarom binnen een week bij ons terug als er een probleem is, wij gaan het gratis voor u oplossen.
            </p>
            <p>
               Na een week is het uw eigen risico, maar kunt u dit desondanks aan ons doorgeven. Wij kijken dan wat wij kunnen doen.
            </p>

            <h3>Annuleringsvoorwaarden</h3>
            <p>
               Uw afspraaktijd is waardevol voor ons. We willen ervoor zorgen dat u de best mogelijke service krijgt tijdens uw geplande afspraak.
            </p>
            <p>
               Om ons hierbij te helpen, dient u ons binnen 24 uur vóór uw afspraak op de hoogte te stellen van een eventuele annulering of aanpassing. Wij helpen u graag bij het verzetten van uw afspraak als u dat tijdig doorgeeft.
            </p>
            <p>
               Als u ons niet ten minste 24 uur van tevoren op de hoogte stelt, wordt de volledige prijs van uw behandeling in rekening gebracht. Bij no-show wordt ook het volledige bedrag in rekening gebracht en kan er gevraagd worden om een aanbetaling te doen bij het boeken van een toekomstige afspraak.
            </p>
            <p>
               Wij begrijpen dat er soms onverwachte omstandigheden kunnen optreden en dat u later bij ons aankomt. Wij hebben daarom een respijtperiode van 15 minuten voor noodsituaties. Bij herhaaldelijk te laat komen kunt u wel begrijpen dat wij 50% van de servicekosten in rekening moeten brengen. De afspraak boeken wij dan naar een latere datum.
            </p>

            <h3>Terugbetalingsbeleid</h3>
            <p>
               Hier bij SIGNATURE nagelstudio doen wij ons best om u een uitzonderlijke ervaring en de best mogelijke service te bieden.
            </p>
            <p>
               Al onze manicure- en nagelservices zijn niet-restitueerbaar, maar als u niet helemaal tevreden bent met onze services, dan kunt u dat altijd bij ons kenbaar maken. Wij willen u graag helpen om het op te lossen en aan te passen naar uw wens. Reparatie doen wij in een mum van tijd.
            </p>

            <a className="tbl_bookingnow" href="booking"><span> BOEKING NOW! </span><i></i></a>
         </>)
   }, [currentLang])

   const renderContent = useMemo(() => {
      if (!currentLang) return <>Loading content...</>;
      if (currentLang == 'en') {
         return (<>{renderENContent}</>);
      }
      return (<>{renderHLContent}</>);
   }, [currentLang])

   return (
      <main>
         <div className="page-content">
            <div className="box_service">
               <div className="container">
                  <div className="row justify-content-center align-items-center">
                     <div className="col-12 col-md-12 col-lg-8 col-xl-6">
                        <div className="box_servicechild">
                           {renderContent}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="box_prijslijst" id="services">
               <div className="container">
                  <div className="row justify-content-center align-items-center">
                     <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                        <div className="box_prijslijstchild">
                           <h2 className="title_mainprijslijst">PRICE LIST</h2>
                           {
                              services.map((serviceGroup: any, index: number) => {
                                 return (
                                    <>
                                       <div className="box_headtitlemainprijslijst" key={'serviceGroup' + index}>
                                          <div className="row">
                                             <div className="col-6 col-md-6 col-xl-6">
                                                <h3>{serviceGroup.serviceGroupName}</h3>
                                             </div>
                                             <div className="col-3 col-md-3 col-xl-3">
                                             </div>
                                             <div className="col-3 col-md-3 col-xl-3">
                                             </div>
                                          </div>
                                       </div>
                                       <div className="box_cotentmainprijslijst">
                                          {
                                             serviceGroup.services?.map((service: any, i: number) => {
                                                return (
                                                   <>
                                                      <div className="row" key={'service' + i}>
                                                         <div className="col-12">
                                                            <h5>{service.serviceName}</h5>
                                                         </div>
                                                      </div>
                                                      {
                                                         service.data?.map((service: Service, i: number) => {
                                                            return (
                                                               <>
                                                                  <div className="row" key={service.SERVICEID}>
                                                                     <div className="col-6 col-md-6 col-xl-6">
                                                                        <span className="dot_lijst">{currentLang == 'en' ? service.DESCRIPTIONEN : service.DESCRIPTIONNL}</span>
                                                                     </div>
                                                                     <div className="col-3 col-md-3 col-xl-3 text-center">
                                                                        <span>{service.PRICE} €</span>
                                                                     </div>
                                                                     <div className="col-3 col-md-3 col-xl-3 text-center">
                                                                        <span>{service.DURATION} min</span>
                                                                     </div>
                                                                  </div>
                                                               </>
                                                            )
                                                         })
                                                      }
                                                   </>
                                                )
                                             })
                                          }
                                       </div>
                                    </>
                                 )
                              })
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="box_about" id="about">
               <div className="container">
                  <div className="row justify-content-center align-items-center">
                     <div className="col-12 col-md-12 col-lg-8 col-xl-8">
                        <div className="box_aboutchild">
                           <h2>ABOUT SIGNATURE NAGEL STUDIO</h2>
                           <p>
                              A professional and friendly salon where you receive the finest nails care in the center of Alkmaar. We strive to assure that our customers receive the best-personalized and professional nails care services in a comfortable, cozy atmosphere.
                              <br></br>
                              Our friendly, licensed professionals provide a wide selection of nails enhancements in a carefully maintained hygienic environment.
                           </p>
                           <a className="tbl_bookingnow" href="booking"><span> BOOKING NOW! </span><i></i></a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="box_gallery">
               <div className="container">
                  <div className="row justify-content-center align-items-center">
                     <div className="col-md-12 col-xl-8">
                        <div className="row">
                           <div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery1.jpg?21">
                                 <Image src={Gallery1} className="img_gallery img-fluid" alt="gallery1" />
                              </a>
                           </div><div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery2.jpg?21">
                                 <Image src={Gallery2} className="img_gallery img-fluid" alt="gallery2" />
                              </a>
                           </div><div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery3.jpg?21">
                                 <Image src={Gallery3} className="img_gallery img-fluid" alt="gallery3" />
                              </a>
                           </div><div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery4.jpg?21">
                                 <Image src={Gallery4} className="img_gallery img-fluid" alt="gallery4" />
                              </a>
                           </div><div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery5.jpg?21">
                                 <Image src={Gallery5} className="img_gallery img-fluid" alt="gallery5" />
                              </a>
                           </div><div className="col-4 col-md-4 col-xl-4">
                              <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery6.jpg?21">
                                 <Image src={Gallery6} className="img_gallery img-fluid" alt="gallery6" />
                              </a>
                           </div>                        </div>
                        <a className="tbl_bookingnow" href="gallery"><span>DISCOVER MORE</span><i></i></a>
                     </div>
                  </div>
               </div>

               <div className="container">
                  <div className="box_footer" id="contact">
                     <div className="row">
                        <div className="col-12 col-md-12 col-lg-4">
                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faPhone} className="icon-fa" />
                              <div className="noidung_lhfooter">
                                 <span>Tell</span>
                                 <a href="tel:0613655935">06136 55 935</a>
                              </div>
                           </div>

                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faMapMarked} className="icon-fa" />
                              <div className="noidung_lhfooter">
                                 <span>Address</span>
                                 <a href="#">Dijk 27, 1811MB, Alkmaar, The Netherlands</a>
                              </div>
                           </div>

                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faBusinessTime} className="icon-fa" />
                              <div className="noidung_lhfooter">
                                 <span>Opening hours</span>
                                 <a href="#">Mon - Fri: 9:30 AM - 6:00 PM
                                    <br></br>
                                    Sat: 10:00 AM - 6:00 PM
                                    <br></br>
                                    Sunday: closed</a>
                              </div>
                           </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                           <iframe src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJQ9W28eJXz0cRVfQ7aJGw_Ec&amp;key=AIzaSyC28Ag6kiaPM0qcJyD6Jiw5HqCZ9RWdAww" width="100%" height="300" style={{ border: 0 }} loading="lazy"></iframe>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                           <div className="box_contentfooter">
                              <h3>Social Media</h3>
                              <p>Be the first one to know about discounts, offers and events
                              </p>

                              <ul className="social_list">
                                 <li>
                                    <a target="_blank" href="https://www.facebook.com/signature.nagelstudio/?ref=pages_you_manage" className="social_list-link"><FontAwesomeIcon icon={faSquareFacebook} className="icon-fa" /></a>
                                 </li>
                                 <li>
                                    <a target="_blank" href="https://www.instagram.com/signature_nagelstudio/" className="social_list-link"><FontAwesomeIcon icon={faInstagram} className="icon-fa" /></a>
                                 </li>
                                 <li>
                                    <a target="_blank" href="" className="social_list-link"><i className="fab fa-youtube-square"></i></a>
                                 </li>
                                 <li>
                                    <a target="_blank" href="" className="social_list-link"><i className="far fa-basketball-ball"></i></a>
                                 </li>
                                 <li>
                                    <a target="_blank" href="" className="social_list-link"><i className="fal fa-phone-square-alt"></i></a>
                                 </li>
                              </ul>

                              <p className="copyright">
                                 © 2022 by Signature Nagel Studio
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <button id="move_to_top" style={{ display: 'none' }}>
               <i className="far fa-arrow-to-top"></i>
            </button>
         </div>
      </main>
   )
}
