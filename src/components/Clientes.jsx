import React from "react";
import { useNavigate, Form, redirect } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
   await eliminarCliente(params.clienteId);
    return redirect('/')


}

function Clientes({ cliente }) {
    const navigate = useNavigate();
    const { nombre, telefono, email, empresa, id } = cliente;
    return (
        <tr>
            <td className="border px-4 py-2">
                <p className="font-bold">{nombre}</p>
                <p className="text-sm">{empresa}</p>
            </td>
            <td className="border px-4 py-2">
                <p>
                    <span className="font-bold uppercase">Email: </span>
                    {email}
                </p>
                <p>
                    <span className="font-bold uppercase">Tel: </span>
                    {telefono}
                </p>
            </td>
            <td className=" px-4 py-2 flex gap-3  ">

                <Form
                    method="post"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={() => {
                        if (!confirm("¿Deseas eliminar este cliente?")) {
                            e.preventDefault();
                        }
                    }
                    }
                >
                    <button type="submit" className=" text-red-600 text-xs uppercase font-bold  ">
                        Eliminar
                    </button>
                </Form>

                <button className="  text-blue-600 text-xsas uppercase font-bold"
                    onClick={() => navigate(`/clientes/${id}/editar`)}
                >
                    Editar
                </button>
            </td>
        </tr>
    );
}

export default Clientes;
