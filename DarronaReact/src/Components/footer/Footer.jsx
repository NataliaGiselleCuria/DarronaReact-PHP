import React from 'react'
import email from '../../assets/email.png'
import wp from '../../assets/whatsapp.png'
import lc from '../../assets/location.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className='footer-cont'>
        <div className='column'>
          <h4>INFO</h4>
          <span><img src={lc}></img><p>Arregui 6559 - CABA (Depósito)</p></span>
          <span><img src={wp}></img><p>+54 9 2214 97-0274</p></span>
          <span><img src={email}></img><p>ad.darrona@gmail.com</p></span>
        </div>
        <div className='column'>
          <h4>ZONAS Y DIAS DE ENTREGA</h4>
          <div className="col">
            <div>
              <p>LA PLATA / CITY BELL - Miercoles</p>
              <p>AMBA SUR -Jueves</p>
              <p>AMBA NORTE - Viernes</p>
            </div>
            <div>
              <p>CABA -Viernes</p>
              <p>AMBA OESTE - Viernes / Sabados</p>
              <p>DESPACHOS A TODO EL PAIS - Viernes</p>
            </div>
          </div>
        </div>
        <div className='column'>
          <h4>HORARIOS DE ENTREGA</h4>
          <p>Lunes a Viernes - 9 a 16hs</p>
          <h4>SEGUINOS</h4>
          <p>@distribuidoradarrona</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
