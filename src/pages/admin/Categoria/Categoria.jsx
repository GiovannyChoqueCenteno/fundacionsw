import React, { useState, useEffect } from 'react'
import ModalLabel from '../../../components/elements/ModalLabel'
import useForm from '../../../hooks/useForm'
import { deleteCategory, getAllCategories, saveCategory, updateCategory } from '../../../services/categories/categoryDB'
import { remove } from '../../../utils/messages'
import { IoTrashOutline, IoAddCircleOutline, IoPencilOutline } from 'react-icons/io5';

const addIcon = <IoAddCircleOutline size={"2em"} color='white' className={"inline-block"} />
const removeIcon = <IoTrashOutline size={"2em"} color='white' className={"inline-block"} />
const editIcon = <IoPencilOutline size={"2em"} color='white' className={"inline-block"} />

const Categoria = () => {

  const [categories, setcategories] = useState(null);
  const { form: valueAdd, handleChange: handleChangeAdd, clear: clearAdd } = useForm({ nombre: "" });
  const { form: valueEdit, handleChange: handleChangeEdit, clear: clearEdit } = useForm({ nombre: "" });

  const getCategories = async () => {
    try {
      let data = await getAllCategories();
      setcategories(data);
    } catch (e) {
      alert("Error al cargar categories");
      setcategories([]);
    }
  }

  const AddCategorie = async () => {
    try {
      await saveCategory(valueAdd);
      await getCategories();
      clearAdd();
    } catch (e) {
      alert("Error al guardar categories");
    }
  }

  const DeleteCategorie = async (categoriaId) => {
    try {
      await deleteCategory(categoriaId);
      await getCategories();
    } catch (e) {
      alert("Error al eliminar categories");
    }
  }

  const EditCategorie = async (categoriaId) => {
    try {
      await updateCategory(categoriaId, valueEdit);
      await getCategories();
    } catch (e) {
      alert("Error al editar categories");
    }
    clearEdit();
  }

  useEffect(() => {
    getCategories();
  }, []);


  return (
    <div className={'grow flex justify-center items-start pt-5'}>

      <div className='w-1/2'>

        <ModalLabel title={"Crear"} openModalText={addIcon} modalId={"modalAddLabel"} btnStyle={"btn-prim"} contentStyle={"my-3"}>
          <form className='my-5'>
            <div>
              <label>Nombre</label>
              <input
                name={"nombre"}
                value={valueAdd.nombre}
                onChange={handleChangeAdd}
                type="text"
                placeholder="name..."
                className="input input-bordered w-full"
              />
            </div>
            <div className='mt-4'>
              <label htmlFor={"#modalAddLabel"} onClick={AddCategorie} className='btn-custom btn-prim no-underline cursor-pointer'>
                crear
              </label>
            </div>
          </form>
        </ModalLabel>

        <table className="table table-zebra w-full text-center">

          <thead>
            <tr>
              <th className={"bg-theme-primary text-white"}>Nombre</th>
              <th className={"bg-theme-primary text-white"}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
              (categories == null)
                ? (
                  <tr>
                    <td colSpan={3}>
                      <small>loading...</small>
                    </td>
                  </tr>
                )
                : (
                  categories.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.nombre}</td>
                      <td className={"flex space-x-2 justify-center"}>

                        <ModalLabel title={"Editar"} openModalText={editIcon} modalId={`modalEdit/${categoria.id}`} btnStyle={"btn-prim"}>
                          <form className='my-5'>
                            <div>
                              <label>Nombre</label>
                              <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder={categoria.nombre}
                                value={valueEdit.nombre}
                                name={"nombre"}
                                onChange={handleChangeEdit}
                              />
                            </div>
                            <div className='mt-4'>
                              <label htmlFor={`#modalEdit/${categoria.id}`} onClick={() => EditCategorie(categoria.id)} className='btn-custom btn-prim no-underline cursor-pointer'>
                                editar
                              </label>
                            </div>
                          </form>
                        </ModalLabel>

                        <ModalLabel title={"Eliminar"} openModalText={removeIcon} modalId={`modalDelete/${categoria.id}`} btnStyle={"btn-dang"}>
                          <div className='mt-4'>
                            <div className={"my-4"}>
                              <h3>{remove}</h3>
                            </div>
                            <div>
                              <label htmlFor={`#modalDelete/${categoria.id}`} onClick={() => DeleteCategorie(categoria.id)} className='btn-custom btn-prim no-underline cursor-pointer'>
                                confirmar
                              </label>
                              <label htmlFor={`#modalDelete/${categoria.id}`} className='btn-custom btn-prim no-underline cursor-pointer'>
                                cerrar
                              </label>
                            </div>
                          </div>
                        </ModalLabel>

                      </td>
                    </tr>
                  ))
                )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Categoria