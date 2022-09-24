import React from 'react'
import { remove } from '../../../utils/messages'

const Categoria = () => {

  return (
    <div className={'grow flex justify-center items-start pt-5'}>

      <input type="checkbox" id="modalAgregar" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <form>
              <div>
                <label className={"block text-start"} htmlFor="nombre">nombre</label>
                <input name='nombre' type="text" placeholder="nombre" className="input w-full border-gray-200 my-1" />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <label onClick={null} htmlFor="modalAgregar" className="btn border-0 btn-prim">save</label>
            <label htmlFor="modalAgregar" className="btn border-0 btn-dang">close</label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="modalEditar" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <form>
              <div>
                <label className={"block text-start"} htmlFor="nombre">nombre</label>
                <input name='nombre' type="text" placeholder="nombre" className="input w-full border-gray-200 my-1" />
              </div>
            </form>
          </div>
          <div className="modal-action">
            <label onClick={null} htmlFor="modalEditar" className="btn border-0 btn-prim">update</label>
            <label htmlFor="modalEditar" className="btn border-0 btn-dang">close</label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="modalEliminar" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <h1>{remove}</h1>
          </div>
          <div className="modal-action">
            <label onClick={null} htmlFor="modalEliminar" className="btn border-0 btn-prim">yes</label>
            <label htmlFor="modalEliminar" className="btn border-0 btn-dang">no</label>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">

        <button className="p-0 my-3">
          <label className='btn-prim p-2 cursor-pointer rounded-md' htmlFor="modalAgregar">agregar</label>
        </button>

        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th className={"bg-theme-primary text-white"}>Nombre</th>
              <th className={"bg-theme-primary text-white"}>Editar</th>
              <th className={"bg-theme-primary text-white"}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tax Accountant</td>
              <td>
                <button className="p-0">
                  <label onClick={null} className='btn-prim p-2 cursor-pointer' htmlFor="modalEditar">editar</label>
                </button>
              </td>
              <td>
                <button className="p-0">
                  <label onClick={null} className='btn-dang p-2 cursor-pointer' htmlFor="modalEliminar">eliminar</label>
                </button>
              </td>
            </tr>
            <tr>
              <td>Tax Accountant2</td>
              <td>
                <button className="p-0">
                  <label onClick={null} className='btn-prim p-2 cursor-pointer' htmlFor="modalEditar">editar</label>
                </button>
              </td>
              <td>
                <button className="p-0">
                  <label onClick={null} className='btn-dang p-2 cursor-pointer' htmlFor="modalEliminar">eliminar</label>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Categoria