import Login from './Auth/Login'
import Register from './Auth/Register'
import Error404 from './Error404'
import Home from './Home'
import NuevoAuto from './Cars/NewCar'
import TableCars from './Cars/TableCars'
import EditEncuesta from './Cars/EditCar'

export const error404 = <Error404 />
export const login = <Login />
export const register = <Register />
export const home = <Home />
export const newCar = <NuevoAuto />
export const tableCars = <TableCars />
export const editCar = <EditEncuesta />