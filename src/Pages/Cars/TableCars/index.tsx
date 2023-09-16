import React, { useState, useEffect } from 'react';
import './TableCars.scss'
import { Auto } from '../../../utils/Interfaces/Interfaces';
import Login from '../../Auth/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchFilesComponent from '../../../Components/Animations/Lists';
import { Player } from '@lottiefiles/react-lottie-player';
import emptyData from '../../../assets/Animations/JSONs/emptyData.json'
import toast, { Toaster } from 'react-hot-toast';

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
    const navigate = useNavigate()
    const [autos, setAutos] = useState<Auto[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');
    const [Loading, setLoading] = useState<boolean>(true)
    const [empty, setEmpty] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const response = await fecthData()
            if (response.length > 0) {
                setAutos(response)
            } else {
                setEmpty(true)
            }
            setLoading(false)
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
            toast.success('Elimiada.', {
                duration: 4000,
                position: 'top-center'
            });
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/test_frontend_i4digital/editar_encuesta/${id}`)
    };

    if (!token) {
        return <Login />;
    }

    return !Loading ? (
        <>
            <Toaster />
            {empty || autos.length === 0 ? (
                <>
                    <Player
                        autoplay
                        loop
                        src={emptyData}
                        style={{ width: '600px' }}
                    >
                    </Player>
                </>
            ) : (
                <div className="listar-encuestas">
                    <h2>Listar Encuestas</h2>
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
            )}
        </>
    ) : (
        <div className="listar-encuestas-animation">
            <SearchFilesComponent />
        </div>
    );
}

export default TableCars;
