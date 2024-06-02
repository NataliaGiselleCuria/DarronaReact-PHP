import React, { createContext, useState, useEffect, useMemo } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  //Productos filtrados por buscador.
  const [filteredProducts, setFilteredProducts] = useState([]);


  //Productos filtrados por categoría. 
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  //Traer productos de la base de datos.
  const [resData, setResData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php')
      .then(response => response.json())
      .then(data => {
        setResData(data);
        console.log(resData)
    });     
  }, []);


  //Tomar las categorias de la base de datos sin que se repitan.
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const extractedCategories = resData.map(item => item.Categoría).filter(Boolean);
    const uniqueCategories = Array.from(new Set(extractedCategories));

    if (uniqueCategories.length > 0) {
      setCategories(uniqueCategories);
    }     
  }, [resData]);


  //Guardar la eleccion de consumidor del Home en LS.
  const [tableType, setTableType] = useState(localStorage.getItem('tableType') || (null));

  useEffect(() => {
    localStorage.setItem('tableType', tableType);
  }, [tableType]);



  const value = useMemo(() => ({
    resData, 
    categories,  
    filteredProducts,
    setFilteredProducts,
    selectedCategory, 
    setSelectedCategory, 
    setCategories,
    tableType, 
    setTableType
  }), 
  [
    resData, 
    categories, 
    filteredProducts,
    setFilteredProducts,
    selectedCategory, 
    setSelectedCategory, 
    setCategories,
    tableType, 
    setTableType
  ]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};