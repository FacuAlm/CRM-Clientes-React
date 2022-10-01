import React from 'react'

import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import { agregarCliente } from '../data/clientes';

export async function action({ request }) {
  const formData = await request.formData();

  const cliente = {
    nombre: formData.get('nombre'),
    telefono: formData.get('telefono'),
    email: formData.get('email'),
    empresa: formData.get('empresa'),

  }


  const errores = [];


  const { nombre, telefono, email, empresa } = cliente


  if (nombre === '' || telefono === '' || email === '' || empresa === '') {
    errores.push('Todos los campos son obligatorios')

  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(email)) {
    errores.push('El email no es valido')

  }


  if (errores.length) {
    return errores
  }

  await agregarCliente(cliente);

  return { redirect: '/' }



}

function NuevoCliente() {

  const errores = useActionData();
  console.log(errores)



  const navigate = useNavigate()
  return (
    <>

      <h1 className="font-black text-4xl text-blue-900 ">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos </p>

      <div className='flex justify-end'>
        <button className='bg-blue-800 text-white font-bold py-1 px-3 uppercase'
          onClick={() => navigate('/')}>
          Volver
        </button>
      </div>

      <div className='bg-white shador rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errores?.length && errores.map((error, index) => (
          <div key={index} className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5'>
            <p className='font-bold'>Error</p>
            <p>{error}</p>
          </div>


        ))}
        <Form
          method='POST'
          noValidate

        >
          <Formulario />

          <input type="submit" className='bg-blue-800 text-white font-bold py-1 px-3 w-full uppercase mt-5' value='Guardar Cliente' />

        </Form>



      </div>



    </>
  )
}

export default NuevoCliente