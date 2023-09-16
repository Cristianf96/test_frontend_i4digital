import React, { useState, useEffect } from 'react';
import './TableCars.scss'
import { Auto } from '../../utils/Interfaces/Interfaces';
import { mockData } from '../../utils/Constants/Constants';
import Login from '../Auth/Login';

const TableCars: React.FC = () => {
    const [autos, setAutos] = useState<Auto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Simula la obtención de datos de la base de datos
        setAutos(mockData);
    }, []);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, autos.length);

    const handleDelete = (id: number) => {
        // Aquí puedes agregar la lógica para eliminar la encuesta con el ID proporcionado
        // Esto podría implicar una llamada a la API o una manipulación de datos local
        console.log(`Eliminando encuesta con ID: ${id}`);
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
                            <td>{auto.identificacion}</td>
                            <td>{auto.modelo}</td>
                            <td>{auto.factoresCompra}</td>
                            <td>{auto.calificacionPrueba}</td>
                            <td>{auto.calificacionSatisfaccion}</td>
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
