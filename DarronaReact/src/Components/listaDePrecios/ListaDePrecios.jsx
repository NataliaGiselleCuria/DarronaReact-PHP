import React from 'react';
import Footer from '../footer/Footer';
import './listaDePrecio.css';
import Table from './Table';
import wp from '../../assets/whatsapp.png'
import arrow from '../../assets/arrow.png'
import Categories from './Categories';

const ListaDePrecios = ({ tableType }) => {

  // !! esto debería traerse de la base de datos, y que se pueda modificar desde vista adm
  const minimumPurchaseContent = {
    minorista: "MÁXIMO COMPRA MINORISTA $100.000",
    mayorista: "MÍNIMO COMPRA MAYORISTA $100.000",
    distribuidora: "MÍNIMO COMPRA DISTRIBUIDOR $500.000",
  };

  const renderTable = () => {
    switch (tableType) {
      case 'minorista':
        return <div><p>Contenido de la Tabla 1</p></div>;
      case 'mayorista':
        return <div><p>Contenido de la Tabla 2</p></div>;
      case 'distribuidora':
        return <div><p>Contenido de la Tabla 3</p></div>;
      default:
        return <div>Por favor selecciona una tabla desde la página de inicio.</div>;
    }
  };

  return (
    <div>
      <div className='nav'>
        <span><a>ZONAS Y FECHAS DE ENTREGA</a><p>|</p><a>AYUDA</a><p>|</p><a>CONTACTO</a></span>
      </div>
      <section className="cont">
        <div className='nav-lis'>
          <div className='logo'>
            <div className="img-cont"><img src="\src\assets\Darrona.png" alt="Logo Distribuidora Darrona - Alimentos Naturales."></img></div>
            <h1><span>LISTA DE PRECIOS </span><span> DISTRIBUIDORA DARRONA</span></h1>
          </div>
          <div className='summary-cont'>
            <div><p className='summary'>RESUMEN DE PEDIDO</p><p className='price-summary'>$</p></div>
            <p className='minimum-purchase'>{minimumPurchaseContent[tableType]}</p>
            <div className='buttons-list'> 
              <button className='button-list'> VER PEDIDO</button>
              <button className='button-list'> FINALIZAR </button>
            </div>
          </div>
        </div>
        
        <div className='cont-products'>
          <Categories></Categories>
          <div className='cont-table'>
            <div className='name-category'><h3></h3></div>
            <Table></Table>
          </div>
        </div>
        <a href="#inicio" class="inicio"><img src={arrow} alt="icono de flecha hacia arriba para volver a la parte superior de la página"></img></a>
        <a href="https://wa.me/+5492214970274?text=Hola%20Darrona!%20" class="whatsapp" target="_blank"><img src={wp} alt="icono de whatsapp"></img></a>
      </section>
    </div>
  );
};

export default ListaDePrecios;

 {/* {renderTable()} */}