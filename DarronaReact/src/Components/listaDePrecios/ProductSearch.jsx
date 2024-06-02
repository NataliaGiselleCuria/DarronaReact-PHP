import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Context/DataProvider';
import searchIcon from '../../assets/search.png'

const SearchBar = () => {
  const { setFilteredProducts, resData } = useContext(DataContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const filtered = resData.filter(product =>
      product.Producto.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [query, resData, setFilteredProducts]);

  return (
    <div className='search-bar'>
        <img src={searchIcon}></img>
        <input
        className='inputSearch'
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
    </div>
    
  );
};

export default SearchBar;