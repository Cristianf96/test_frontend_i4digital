import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { error404, home, login, newCar, register, tableCars } from './Pages'
import Nav from './Components/Nav'

function App() {



  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/test_frontend_i4digital" element={login} />
          <Route path="/test_frontend_i4digital/register" element={register} />
          <Route path="/test_frontend_i4digital/inicio" element={home} />
          <Route path="/test_frontend_i4digital/nuevo_auto" element={newCar} />
          <Route path="/test_frontend_i4digital/listar_autos" element={tableCars} />
          {/* <Route path="/test_frontend_i4digital/cerrar_sesion" element={register} /> */}
          <Route path="/*" element={error404} />
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default App
