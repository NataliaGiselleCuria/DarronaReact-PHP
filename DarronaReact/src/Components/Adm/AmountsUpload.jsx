import React, { useEffect, useState } from 'react'
import { useApi } from '../../Context/ApiProvider';

const AmountsUpload = () => {

    const { amounts, isLoading } = useApi();

    const [newMinorista, setNewMinorista] = useState('');
    const [newMayorista, setNewMayorista] = useState('');
    const [newDistribuidor, setNewDistribuidor] = useState('');

    const [uploadStatus, setUploadStatus] = useState('');

    const getCategoryMessage = (category) => {
        const categoryData = amounts.find((item) => item.categoría === category);
        return categoryData ? categoryData.mensaje : '';
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedAmounts = {
            minorista: newMinorista || getCategoryMessage('minorista'),
            mayorista: newMayorista || getCategoryMessage('mayorista'),
            distribuidor: newDistribuidor || getCategoryMessage('distribuidor')
        };

        try {
            const response = await fetch('http://localhost:80/darronaReact/DarronaPhp/actualizar.php?action=amounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAmounts)
            });

            const data = await response.json();

            if (data.success) {
                setUploadStatus(`Mensajes actualizados correctamente. \n\nMinorista: ${updatedAmounts.minorista}. \nMayorista: ${updatedAmounts.mayorista}. \nDistribuidor: ${updatedAmounts.distribuidor}.`);
            } else {
                setUploadStatus(`Error al actualizar los mensajes: ${data.error}`);
            }
        } catch (error) {
            setUploadStatus('Ocurrió un error al actualizar los mensajes.');
        }

    };

    return (
        <div className='content'>
            <h5>Actualizar montos mínimos.</h5>
            <div className='txt-amountsUpload'>
                <div>
                    <p>Complete el mensaje que se verá en la pagina de productos para cada categoía.</p>
                </div>
                <div className='summary-cont'>
                    <div className='ml'><p className='summary'>RESUMEN DE PEDIDO</p><p className='price-summary'>$0.00</p></div>
                    <p className='minimum-purchase'>MINIMO DE COMPRA...</p>
                </div>
            </div>

            <form onSubmit={handleUpdate}>
                <div>
                    <h6>Minorista</h6>
                    <span className='row'>
                        <p>Mensaje actual:</p>
                        {isLoading ? <p>Cargando mensaje...</p> : <p className='current-msg'>"{getCategoryMessage('minorista')}"</p>}
                    </span>
                    <span className='row'>
                        <label>Nuevo mensaje:</label>
                        <input
                            type="text"
                            value={newMinorista}
                            onChange={(e) => {setNewMinorista(e.target.value); uploadStatus('')}}
                        />
                    </span>
                </div>
                <div>
                    <h6>Mayorista</h6>
                    <span className='row'>
                        <p>Mensaje actual:</p>
                        {isLoading ? <p>Cargando mensaje...</p> : <p className='current-msg'>"{getCategoryMessage('mayorista')}"</p>}
                    </span>
                    <span className='row'>
                        <label>Nuevo mensaje:</label>
                        <input
                            type="text"
                            value={newMayorista}
                            onChange={(e) =>{setNewMayorista(e.target.value); uploadStatus('')}}
                        />
                    </span>
                </div>
                <div>
                    <h6>Distribuidor</h6>
                    <span className='row'>
                        <p>Mensaje actual:</p>
                        {isLoading ? <p>Cargando mensaje...</p> : <p className='current-msg'>"{getCategoryMessage('distribuidor')}"</p>}
                    </span>
                    <span className='row'>
                        <label>Nuevo mensaje:</label>
                        <input
                            type="text"
                            value={newDistribuidor}
                            onChange={(e) => {setNewDistribuidor(e.target.value); uploadStatus('')}}
                        />
                    </span>
                </div>
                <button className="submit" type="submit">Actualizar</button>
            </form>
            <textarea readOnly value={uploadStatus} rows={4} cols={50} />
        </div>
    )
}

export default AmountsUpload
