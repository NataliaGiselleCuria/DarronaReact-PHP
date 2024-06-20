import { useState, useEffect, createContext, useContext, useMemo } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loginCred, setLoginCred] = useState({ usuario: '', clave: '' });
  const [contact, setContact] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=productos')
     .then(response => response.json())
     .then(data => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=montominimo')      
    .then(response => response.json())
     .then(data => {
        setAmounts(data);
        setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=login')      
    .then(response => response.json())
     .then(data => {
      setLoginCred(data);
    });
  }, [])
  
  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=contact')      
    .then(response => response.json())
     .then(data => {
      setContact(data);
    });
  }, [])

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=shipments')      
    .then(response => response.json())
     .then(data => {
      setShipments(data);
    });
  }, [])

  useEffect(() => {
    fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=orders')      
    .then(response => response.json())
     .then(data => {
      setListOrders(data);
    });
  }, [])


  const updateSeenStatus = async (orderId, seen) => {

    
    const dataSend = {
      id_pedido: orderId,
      seen: seen
    }

    console.log(dataSend)

    try {
        const response = await fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=update-seen-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });

         if (response.ok) {
            const updatedOrders = listOrders.map(order =>
                order.id_pedido === orderId ? { ...order, visto: seen } : order
            );
            setListOrders(updatedOrders);
        } else {
            const errorData = await response.json();
            console.error('Failed to update seen status:', errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  const value = useMemo(() => ({
    products,
    amounts,
    isLoading,
    loginCred,
    contact,
    shipments,
    listOrders,
    updateSeenStatus
  }), 
  [
    products,
    amounts,
    isLoading,
    loginCred,
    contact,
    shipments,
    listOrders,
    updateSeenStatus
  ]);

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
    return useContext(ApiContext);
};