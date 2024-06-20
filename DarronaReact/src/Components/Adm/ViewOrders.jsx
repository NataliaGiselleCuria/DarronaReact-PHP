import React, { useState } from 'react'
import { useApi } from '../../Context/ApiProvider'
import * as XLSX from 'xlsx';

const ViewOrders = () => {

    const { listOrders, updateSeenStatus } = useApi();
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleExpand = async (index, orderId) => {
        if (expandedOrder !== index) {
            await updateSeenStatus(orderId, 1); // Marcar como visto al expandir
        }
        setExpandedOrder(expandedOrder === index ? null : index);
    };

    // const handleClick = () => {
    //     setIsOpen(!isOpen);
    //     onClick(); // Llamar a la función onClick pasada como props
    // };

    const sortedOrders = listOrders?.slice().sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido));

    const downloadOrderAsExcel = (order) => {
        const wb = XLSX.utils.book_new();
        const wsData = [
            ['Código', 'Producto', 'Presentación', 'Peso', 'Cantidad x Pres.', 'Cantidad', 'Total']
        ];

        JSON.parse(order.detalle || '[]').forEach(item => {
            wsData.push([
                item.product?.Código,
                item.product?.Producto,
                item.product?.Presentación,
                item.product?.Peso,
                item.product?.['Cantidad x pres.'],
                item.quantity,
                item.totalProduct?.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            ]);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Pedido');

        XLSX.writeFile(wb, `Pedido_${order.id_pedido}.xlsx`);
    };

  return (
    <div>
       <h3>Lista de Pedidos</h3>
           <ul>
           <li className="list-orders-head">
                        <div className='order-cont'>
                            <span className='order-head'>
                                <p> FECHA</p>
                                <p> CLIENTE</p>
                                <p> TOTAL</p>
                            </span>
                        </div>
                    </li>
                {sortedOrders?.map((order, index) => (
                     <li key={index} className={`order-item ${expandedOrder === index ? 'expanded' : ''} ${!order?.visto ? 'new-order' : ''}`}>
                        <div className='order-cont'>
                            <span className='order-head'>
                                <p> {order?.fecha_pedido}</p>
                                <p> {order?.nombre_cliente}</p>
                                <p> ${order?.total}</p>
                                <p>{order?.tipo_comprador}</p>
                                <div className='new-order-alert'><p>NUEVO</p></div>
                                <div 
                                    className={`toggle-btn clearfix ${expandedOrder === index ? 'hide-toggle' : ''}`} 
                                    onClick={() => toggleExpand(index, order?.id_pedido)}
                                >
                                    <div className="arrow-open-close"></div>
                                </div>
                            </span>
                            {expandedOrder === index && (
                                <>
                                    <span>
                                        <p><strong>Teléfono:</strong> {order?.telefono_cliente}</p>
                                        <p><strong>Email:</strong> {order?.email_cliente}</p>
                                        <p><strong>Dirección:</strong> {order?.direccion_cliente}</p>
                                    </span>
                                    <span className='order-detail'>
                                        <p><strong>Detalle del Pedido:</strong></p>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Código</th>
                                                    <th>Producto</th>
                                                    <th>Presentación</th>
                                                    <th>Peso</th>
                                                    <th>Cantidad x Pres.</th>
                                                    <th>Cantidad</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {JSON.parse(order?.detalle || '[]')?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item?.product?.Código}</td>
                                                        <td>{item?.product?.Producto}</td>
                                                        <td>{item?.product?.Presentación}</td>
                                                        <td>{item?.product?.Peso}</td>
                                                        <td>{item?.product?.['Cantidad x pres.']}</td>
                                                        <td>{item?.quantity}</td>
                                                        <td>${item?.totalProduct?.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </span>
                                    <button onClick={() => downloadOrderAsExcel(order)}>Download as Excel</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default ViewOrders
