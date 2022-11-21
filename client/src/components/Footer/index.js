import React from 'react'
import './footer.scss'
import logo from '../../assets/images/profile/logoE-commerce.png';
import FooterCol from "./FooterColAboutUs";
import FooterColIcons from './FooterColIcons';
import { LogoSocials, LogoPayments } from '../../Helpers/LogoFooterData';

function Footer() {
  return (
    <div className='main-footer'>
      <div className='container container-footer'>
        <div className='row row-footer'>
          <img src={logo} className='logo' alt='notre logo'/>
          <FooterCol
            col={'col-md-3'}
            p={'Question ?'}
            route1={'/à-propos'}
            route2={'/nos-services'}
            route3={'/nous-contacter'}
            un={'Qui sommes-nous ?'}
            deux={'Nos services'}
            trois={'Nous contacter'}
          />
          <FooterCol
            col={'col-md-3'}
            p={'Sur nos produits'}
            route1={'/retour-de-produit'}
            route2={'/Paiement-livraison'}
            route3={'/guide-achat'}
            un={'SAV, demande de retour'}
            deux={'Paiement & livraison'}
            trois={'Guide d\'achat'}
          />
          <FooterColIcons 
            img1={'#'}
            img2={'#'}
            img3={'#'}
            img4={'#'}

            src1={LogoPayments[0].img}
            src2={LogoPayments[1].img}
            src3={LogoPayments[2].img}
            src4={LogoPayments[3].img}

            p={'Paiement'}
            col={'col-md-2'}
            w={25}
            h={25}
          />
          <FooterColIcons 
            img1={'#'}
            img2={'#'}
            img3={'#'}
            img4={'#'}
            src1={LogoSocials[0].img}
            src2={LogoSocials[1].img}
            src3={LogoSocials[2].img}
            src4={LogoSocials[3].img}
            p={'Réseaux'}
            col={'col-md-2'}
            w={25}
            h={25}
          />
        </div>
        <div className='footer-bottom'>
          <p className='text-xs-center'>
            &copy;{new Date().getFullYear()} Vin diesel - Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer;