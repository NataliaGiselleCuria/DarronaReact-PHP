import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import './home.css';
import icon1 from './assets/icon-1.png';
import icon2 from './assets/icon-2.png';
import icon3 from './assets/icon-3.png';


const Home = ({ setTableType }) => {
  const navigate = useNavigate();

  const handleButtonClick = (type) => {
    setTableType(type);
    navigate('/lista-de-precios');
  };

  return (
    <>
      <div className="nav"></div>
      <section className="cont">
        <div className="img-cont"><img src="\src\assets\Darrona.png" alt="Logo Distribuidora Darrona - Alimentos Naturales."></img></div>
        <h1><span>LISTA DE PRECIOS </span><span> DISTRIBUIDORA DARRONA</span></h1>
        <div className="buttons">
          <button className="b-1" onClick={() => handleButtonClick('minorista')}><p>MINORISTA</p><img src={icon1} alt=""></img></button>
          <button className="b-3" onClick={() => handleButtonClick('mayorista')}><p>MAYORISTA</p><img src={icon2} alt=""></img></button>
          <button className="b-3" onClick={() => handleButtonClick('distribuidora')}><p>DISTRIBUIDOR</p><img src={icon3} alt=""></img></button>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Home;
