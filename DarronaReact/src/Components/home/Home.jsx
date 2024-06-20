import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import './home.css';


const Home = ({ setTableType }) => {
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setTableType(type);
    navigate('/lista-de-precios');
  };

  return (
    <div className='home'>
       <div className='nav'></div>
      <section className="cont">
        <div className="img-cont"><img src="\src\assets\Darrona.png" alt="Logo Distribuidora Darrona - Alimentos Naturales."></img></div>
        <h1><span>LISTA DE PRECIOS </span><span> DISTRIBUIDORA DARRONA</span></h1>
        <div className="buttons">
          <button className="b-1" onClick={() => handleButtonClick('minorista')}><p>MINORISTA</p></button>
          <button className="b-2" onClick={() => handleButtonClick('mayorista')}><p>MAYORISTA</p></button>
          <button className="b-3" onClick={() => handleButtonClick('distribuidor')}><p>DISTRIBUIDOR</p></button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
