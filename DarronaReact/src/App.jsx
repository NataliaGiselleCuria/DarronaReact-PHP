
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/home/Home';
import ListaDePrecios from './Components/listaDePrecios/ListaDePrecios';
// import React, { useEffect, useState } from 'react';


const  App = () => {
      
  const [tableType, setTableType] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home setTableType={setTableType} />} />
        <Route path="/lista-de-precios" element={<ListaDePrecios tableType={tableType} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App


 // const [resultado, setResultado] = useState([]);

    
    // useEffect(() => {
    //     fetch('http://localhost:80/darronaReact/DarronaPhp/index.php')
    //       .then(response => response.json())
    //       .then(data => {
    //         setResultado(data);
    //         console.log(resultado)
          
    // });
           
    //   }, []);