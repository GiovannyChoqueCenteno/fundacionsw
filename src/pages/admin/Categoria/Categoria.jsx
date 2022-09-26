import React from 'react'
import Modal from '../../../components/elements/Modal'
import { remove } from '../../../utils/messages'
import { categorias } from '../../../utils/mocks/categoria'

const Categoria = () => {

  return (
    <div className={'grow flex justify-center items-start pt-5'}>

      <div className="overflow-x-auto">

        <Modal title={"Crear"} openModalText={"agregar"} modalId={"modalAdd"} btnStyle={"btn-prim"} contentStyle={"my-3"} >
          <form className='my-5'>
            <div>
              <label>Nombre</label>
              <input type="text" placeholder="name..." className="input input-bordered w-full" />
            </div>
            <div className='mt-4'>
              <a href="#" className='btn-custom btn-prim no-underline'>
                crear
              </a>
            </div>
          </form>
        </Modal>

        <table className="table table-zebra w-full text-center">

          <thead>
            <tr>
              <th className={"bg-theme-primary text-white"}>Nombre</th>
              <th className={"bg-theme-primary text-white"}>Editar</th>
              <th className={"bg-theme-primary text-white"}>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {
              categorias.map((categoria) => (
                <tr key={categoria.id.toString()}>
                  <td>{categoria.nombre}</td>
                  <td>
                    <Modal title={"Editar"} openModalText={"editar"} modalId={"modalEdit"} btnStyle={"btn-prim"}>
                      <form className='my-5'>
                        <div>
                          <label>Nombre</label>
                          <input type="text" placeholder="name..." className="input input-bordered w-full" />
                        </div>
                        <div className='mt-4'>
                          <a href="#" className='btn-custom btn-prim no-underline'>
                            actualizar
                          </a>
                        </div>
                      </form>
                    </Modal>
                  </td>
                  <td>
                    <Modal title={"Eliminar"} openModalText={"eliminar"} modalId={"modalDelete"} btnStyle={"btn-dang"}>
                      <div className='mt-4'>
                        <div className={"my-4"}>
                          <h3>{remove}</h3>
                        </div>
                        <div>
                          <a href="#" className='btn-custom btn-prim no-underline'>
                            confirmar
                          </a>
                          <a href="#" className='btn-custom btn-dang no-underline ml-2'>
                            cerrar
                          </a>
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Categoria