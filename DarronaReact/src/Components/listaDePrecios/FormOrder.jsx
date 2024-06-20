import React, { useState, useContext } from 'react';
import { OrderContext } from '../../Context/OrderProvider';
import { useApi } from '../../Context/ApiProvider';
import { DataContext } from '../../Context/DataProvider';

const FormOrder = () => {

    const { tableType } = useContext(DataContext)
    const { order } = useContext(OrderContext)
    const { contact } = useApi();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showOkButton, setShowOkButton] = useState(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);

    const [formData, setFormData] = useState({
        nombre_cliente: '',
        email_cliente: '',
        telefono_cliente: '',
        direccion_cliente: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (order.length === 0) {
            setMessage('No hay productos en el pedido. Por favor, añada productos antes de enviar el pedido.');
            return;
        }

        setLoading(true);
        setMessage('Enviando pedido, por favor espere...');
        setDisableSubmitButton(true);

        const pedido = {
            ...formData,
            fecha_pedido: new Date().toISOString().split('T')[0], // Fecha en formato YYYY-MM-DD
            detalle: JSON.stringify(order),
            total_pedido: order.reduce((acc, item) => acc + item.totalProduct, 0),
            visto: false,
            tipo_comprador: tableType
        };

        const cont = {
            email: contact.find(item => item.nombre === 'email').valor,
            telefono: contact.find(item => item.nombre === 'telefono').valor
        }

        const dataToSend = {
            ...pedido,
            ...cont
        };

        try {
            const response = await fetch('http://localhost:80/darronaReact/DarronaPhp/index.php?action=save-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setMessage('Pedido enviado exitosamente!<br/>Pronto recibirá un email de confirmacion con el detalle del pedido.');
                setShowOkButton(true);
            } else {
                setMessage('Error al enviar el pedido');
                setDisableSubmitButton(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al conectar con el servidor');
            setDisableSubmitButton(false);
        } finally {
            setLoading(false);
        }
    };

    const handleOkClick = () => {
        window.location.reload();
    };

    return (
        <form className='form-order' onSubmit={handleSubmit}>
            <div className='txt'>
                <h5>Ingrese sus datos para finalizar el pedido.</h5>
                <p>Nos comunicaremos a la brevedad para concretar la venta.</p>
            </div>
            <div className="form-order">
                <span>
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="nombre_cliente" value={formData.nombre_cliente} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email_cliente" value={formData.email_cliente} onChange={handleChange} required />
                    </div>
                </span>
                <span>
                    <div>
                        <label>Teléfono:</label>
                        <input type="tel" name="telefono_cliente" value={formData.telefono_cliente} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Dirección:</label>
                        <input type="text" name="direccion_cliente" value={formData.direccion_cliente} onChange={handleChange} required />
                    </div>
                </span>
                <button 
                    className={`button-list add-more-p ${disableSubmitButton ? 'disabled' : ''}`} 
                    type="submit">Enviar Pedido</button>
                <span className='msg-send-order'>
                    {loading && <p>{message}</p>}
                    {!loading && message &&  <p dangerouslySetInnerHTML={{ __html: message }} />}
                    {!loading && showOkButton && (
                        <button className='button-list' onClick={handleOkClick}>OK</button>
                    )}
                </span>
            </div>
        </form>
    );
};

export default FormOrder
