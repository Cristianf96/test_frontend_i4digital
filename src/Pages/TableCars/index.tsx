import React, { useState, useEffect } from 'react';
import './TableCars.scss'
import { Auto } from '../../utils/Interfaces/Interfaces';
import Login from '../Auth/Login';
import axios from 'axios';

const fecthData = async () => {
    const options = {
        method: 'GET',
        url: `${import.meta.env.VITE_BASE_URL}/api/car`,
        headers: {
            Authorization: `bearer ${localStorage.getItem('token') ?? ""}`
        },
    };

    const response = await axios.request(options).then(function (response) {
        return { data: response.data, status: response.status }
    }).catch(function (error) {
        alert('No se pudo traer la informacion.');
        console.error(error);
    });

    if (response?.status === 200) {
        return response?.data
    }
}

const TableCars: React.FC = () => {
    const [autos, setAutos] = useState<Auto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getData = async () => {
            const response = await fecthData()
            if (response.length > 0) return setAutos(response)
            console.log('No hay data en la BD', response)
        }
        getData()
    }, []);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, autos.length);

    const handleDelete = async (id: number) => {
        const options = {
            method: 'DELETE',
            url: `${import.meta.env.VITE_BASE_URL}/api/car/delete/${id}`,
            headers: {
                Authorization: `bearer ${localStorage.getItem('token') ?? ""}`
            },
        };

        const response = await axios.request(options).then(function (response) {
            return { data: response.data, status: response.status }
        }).catch(function (error) {
            alert('No se pudo Eliminar.');
            console.error(error);
        });
        if (response?.data.deleted) {
            const resNewData = await fecthData()
            setAutos(resNewData)
        }
    };

    const handleEdit = (id: number) => {
        // Aquí puedes agregar la lógica para editar la encuesta con el ID proporcionado
        // Esto podría implicar la navegación a una vista de edición
        console.log(`Editando encuesta con ID: ${id}`);
    };

    if (!token) {
        return <Login />;
    }

    return (
        <div className="listar-autos">
            <h2>Listar Autos</h2>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Anterior
                </button>
                <button disabled={endIndex >= autos.length} onClick={() => setCurrentPage(currentPage + 1)}>
                    Siguiente
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Codigo del Cliente</th>
                        <th>Identificación del Cliente</th>
                        <th>Modelo del Automóvil</th>
                        <th>Factores de Compra</th>
                        <th>Calificación de Prueba</th>
                        <th>Calificación de Satisfacción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.slice(startIndex, endIndex).map(auto => (
                        <tr key={auto.id}>
                            <td>{auto.id_customer}</td>
                            <td>{auto.identification_customer}</td>
                            <td>{auto.car_model}</td>
                            <td>{auto.factors}</td>
                            <td>{auto.test_drive_qualification}</td>
                            <td>{auto.satisfaction_rating}</td>
                            <td>
                                <button className='delete' onClick={() => handleDelete(auto.id)}>Eliminar Encuesta</button>
                                <button className='edit' onClick={() => handleEdit(auto.id)}>Editar Encuesta</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Anterior
                </button>
                <button disabled={endIndex >= autos.length} onClick={() => setCurrentPage(currentPage + 1)}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default TableCars;
