import Image from 'next/image';
import Gallery1 from './../assets/images/gallery1.jpg';
import Gallery2 from './../assets/images/gallery2.jpg';
import Gallery3 from './../assets/images/gallery3.jpg';
import Gallery4 from './../assets/images/gallery4.jpg';
import Gallery5 from './../assets/images/gallery5.jpg';
import Gallery6 from './../assets/images/gallery6.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarked, faBusinessTime, faBars } from '@fortawesome/free-solid-svg-icons';
import { faSquareFacebook, faInstagram  } from '@fortawesome/free-brands-svg-icons';

export default async function Home() {
  return (
    <main>
         <div className="page-content">
            <div className="box_service">
               <div className="container">
                  <div className="row justify-content-center align-items-center">
                     <div className="col-12 col-md-12 col-lg-8 col-xl-6">
                     <div className="box_servicechild">
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
                           <h2 className="title_mainprijslijst">PRIJSLIJST</h2>

                           <div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>Acryl versteviging</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Nieuwe set acryl met nagelverlenging</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">in gekleurd acryl</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/babyboom</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>55 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>70 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Nieuwe set acryl zonder nagelverlenging</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">in gekleurd acryl</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/babyboom</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Bijwerken acryl (tussen 3 weken)</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met dezelfde kleur</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Bijwerken acryl (tussen 3 weken)</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/babyboom/andere kleur</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>55 min</span>
                                    </div>
                                 </div> </div><div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>BIAB versteviging</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Nieuwe set BIAB met nagelverlenging</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">in gekleurd BIAB</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>55 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>70 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Nieuwe set BIAB zonder nagelverlenging</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">in gekleurd BIAB</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Bijwerken BIAB (tussen 3 weken)</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met dezelfde kleur</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/andere kleur</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>55 min</span>
                                    </div>
                                 </div> </div><div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>Manicure</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Manicure</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">nagels en nagelriemverzorging (knippen, vijlen en vormen)</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>15 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>25 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/nagellak</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 min</span>
                                    </div>
                                 </div> </div><div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>Pedicure</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Spa pedicure</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">voetverzorging </span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>40 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">met gellak/nagellak</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>55 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">en manicure</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>60 min</span>
                                    </div>
                                 </div> </div><div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>Gellak</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Gellak</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">handen/voeten</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>25 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>30 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">handen + voeten</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>45 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>50 min</span>
                                    </div>
                                 </div> </div><div className="box_headtitlemainprijslijst">
                                 <div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <h3>Extra kosten +++</h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3">
                                       <h3></h3>
                                    </div>
                                 </div>
                              </div><div className="box_cotentmainprijslijst">
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Glitter/marble/cat-eye effect</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">per nagel</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>1 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>3 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Nail art</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">per nagel</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>3 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>5 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">handen/voeten met French style</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>10 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>20 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Verwijderen (zonder nabehandeling)</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">gellak handen/voeten</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>10 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>15 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">gel/BIAB/acryl</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>15 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>30 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Verwijderen (met nabehandeling)</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">gellak handen/voeten</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>5 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>15 min</span>
                                    </div>
                                 </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">gel/BIAB/acryl</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>8 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>30 min</span>
                                    </div>
                                 </div>
                                    <div className="row">
                                       <div className="col-12">
                                          <h5>Reparatie</h5>
                                       </div>
                                    </div><div className="row">
                                    <div className="col-6 col-md-6 col-xl-6">
                                       <span className="dot_lijst">per nagel</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>5 €</span>
                                    </div>
                                    <div className="col-3 col-md-3 col-xl-3 text-center">
                                       <span>7 min</span>
                                    </div>
                                 </div> </div>
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
                                       <Image src={Gallery1} className="img_gallery img-fluid" alt="gallery1"/>
                                    </a>
                                 </div><div className="col-4 col-md-4 col-xl-4">
                                    <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery2.jpg?21">
                                    <Image src={Gallery2} className="img_gallery img-fluid" alt="gallery2"/>
                                    </a>
                                 </div><div className="col-4 col-md-4 col-xl-4">
                                    <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery3.jpg?21">
                                       <Image src={Gallery3} className="img_gallery img-fluid" alt="gallery3"/>
                                    </a>
                                 </div><div className="col-4 col-md-4 col-xl-4">
                                    <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery4.jpg?21">
                                       <Image src={Gallery4} className="img_gallery img-fluid" alt="gallery4"/>
                                    </a>
                                 </div><div className="col-4 col-md-4 col-xl-4">
                                    <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery5.jpg?21">
                                       <Image src={Gallery5} className="img_gallery img-fluid" alt="gallery5"/>
                                    </a>
                                 </div><div className="col-4 col-md-4 col-xl-4">
                                    <a className="spotlight" data-fancybox="gallery" data-src="./assets/images/gallery6.jpg?21">
                                       <Image src={Gallery6} className="img_gallery img-fluid" alt="gallery6"/>
                                    </a>
                                 </div>                        </div>
                        <a className="tbl_bookingnow" href="gallery"><span>ONTDEK MEER</span><i></i></a>
                     </div>
                  </div>
               </div>

               <div className="container">
                  <div className="box_footer" id="contact">
                     <div className="row">
                        <div className="col-12 col-md-12 col-lg-4">
                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faPhone} className="icon-fa"/>
                              <div className="noidung_lhfooter">
                                 <span>Tell</span>
                                 <a href="tel:0613655935">06136 55 935</a>
                              </div>
                           </div>

                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faMapMarked} className="icon-fa"/>
                              <div className="noidung_lhfooter">
                                 <span>Address</span>
                                 <a href="#">Dijk 27, 1811MB, Alkmaar, The Netherlands</a>
                              </div>
                           </div>

                           <div className="boxnoidung_lhfooter">
                              <FontAwesomeIcon icon={faBusinessTime} className="icon-fa"/>
                              <div className="noidung_lhfooter">
                                                                     <span>Openingstijden</span>
                                    <a href="#">Maandag - Vrijdag: 9:30 AM - 6:00 PM
                                    <br></br>
                                    Zaterdag: 10:00 AM - 6:00 PM
                                    <br></br>
                                    Zondag: gesloten</a>
                                                               </div>
                           </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                           <iframe src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJQ9W28eJXz0cRVfQ7aJGw_Ec&amp;key=AIzaSyC28Ag6kiaPM0qcJyD6Jiw5HqCZ9RWdAww" width="100%" height="300" style={{border: 0}} loading="lazy"></iframe>
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                           <div className="box_contentfooter">
                              <h3>Social Media</h3>
                              <p>Be the first one to know about discounts, offers and events
                              </p>

                              <ul className="social_list">
                                 <li>
                                    <a target="_blank" href="https://www.facebook.com/signature.nagelstudio/?ref=pages_you_manage" className="social_list-link"><FontAwesomeIcon icon={faSquareFacebook} className="icon-fa"/></a>
                                 </li>
                                 <li>
                                    <a target="_blank" href="https://www.instagram.com/signature_nagelstudio/" className="social_list-link"><FontAwesomeIcon icon={faInstagram} className="icon-fa"/></a>
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

            <button id="move_to_top" style={{display: 'none'}}>
               <i className="far fa-arrow-to-top"></i>
            </button>
         </div>
    </main>
  )
}
