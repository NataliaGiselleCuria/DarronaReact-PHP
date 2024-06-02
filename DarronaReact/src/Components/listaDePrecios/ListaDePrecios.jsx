import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../../Context/OrderProvider';
import './listaDePrecio.css';
import Table from './Table';
import logo from '../../assets/Darrona.png'
import wp from '../../assets/whatsapp.png'
import arrow from '../../assets/arrow.png'
import arrowBack from '../../assets/arrow-back.png'
import Categories from './Categories';
import ProductSearch from './ProductSearch';


const ListaDePrecios = ({ tableType }) => {

  // !! esto debería traerse de la base de datos, y que se pueda modificar desde vista adm
  const minimumPurchaseContent = () => {
    switch (tableType) {
      case 'minorista':
        return <p className='minimum-purchase'>MÁXIMO COMPRA MINORISTA $100.000</p>
      case 'mayorista':
        return <p className='minimum-purchase'>MÍNIMO COMPRA MAYORISTA $100.000</p>
      case 'distribuidor':
        return <p className='minimum-purchase'>MÍNIMO COMPRA DISTRIBUIDOR $500.000</p>
      default:
        return <p className='minimum-purchase'>Por favor selecciona una tabla desde la página de inicio.</p>
    }
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  const { totalOrderFormat } = useContext(OrderContext)
  const [showOrder, setShowOrder] = useState(false);

  const handleVerPedidoClick = () => {
    setShowOrder(prevShowOrder => !prevShowOrder);
  };

  return (
    <div className='lista-precios'>
      <div className='nav'>
        <span><a>ZONAS Y FECHAS DE ENTREGA</a><p>|</p><a>AYUDA</a><p>|</p><a>CONTACTO</a></span>
      </div>
      <section className="cont">
        <div className='nav-lis'>
          <div className='logo'>
            <div className="img-cont"><img src={logo} alt="Logo Distribuidora Darrona - Alimentos Naturales."></img></div>
            <h1><span>LISTA DE PRECIOS </span><span> DISTRIBUIDORA DARRONA</span></h1>
          </div>
          <div className='summary-cont'>
            <div className='ml'><p className='summary'>RESUMEN DE PEDIDO</p><p className='price-summary'>${totalOrderFormat}</p></div>
            {minimumPurchaseContent()}
          </div>
        </div>
        <div className='nav2'>
          <div className='name-type-of-buyer'>
            <img src={arrowBack} alt="flecha para volver a la pagina de eleccion de consumidor." onClick={handleBackClick}></img>
            <h3>{tableType.toUpperCase()}</h3>
          </div>
          <div className='buttons-list'> 
            <button className='button-list' onClick={handleVerPedidoClick}>
              {showOrder ? "Volver" : "Ver pedido"}
            </button>
            <button className='button-list'> FINALIZAR </button>
          </div>
        </div>
        <div className='cont-products'>
         
          <div className='categories-cont'>
            <h2>CATEGORIAS</h2>
            <ProductSearch></ProductSearch>
            <Categories></Categories>
          </div>
         
          <div className='cont-table'>
            <Table showOrder={showOrder} />
          </div>
        </div>
        <a href="#inicio" className="inicio"><img src={arrow} alt="icono de flecha hacia arriba para volver a la parte superior de la página"></img></a>
        <a href="https://wa.me/+5492214970274?text=Hola%20Darrona!%20" className="whatsapp" target="_blank"><img src={wp} alt="icono de whatsapp"></img></a>
      </section>
    </div>
  );
};

export default ListaDePrecios;