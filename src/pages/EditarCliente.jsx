import { Form, useNavigate, useLoaderData,useActionData, redirect } from "react-router-dom"
import { actualizarCliente, obtenerCliente } from "../data/clientes"
import Formulario from "../components/Formulario"


export async function loader({ params }) {
    const cliente = await obtenerCliente(params.clienteId)
    //throw error
    if (Object.values(cliente).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Cliente no encontrado'
        })
    }

    return cliente
}

export async function action({ request, params }) {
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

    await actualizarCliente(params.clienteId, cliente);

    return { redirect: '/' }

}

function EditarCliente() {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errores = useActionData();
    
    return (
        <>

            <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente</h1>
            <p className="mt-3">Edita el cliente </p>

            <div className='flex justify-end'>
                <button className='bg-blue-800 text-white font-bold py-1 px-3 uppercase'
                    onClick={() => navigate('/')}>
                    Volver
                </button>
            </div>

            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

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
                    <Formulario cliente={cliente} />

                    <input type="submit" className='bg-blue-800 text-white font-bold py-1 px-3 w-full uppercase mt-5' value='Editar Cliente' />

                </Form>



            </div>



        </>
    )
}

export default EditarCliente