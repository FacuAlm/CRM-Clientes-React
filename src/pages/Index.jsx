import { useLoaderData } from "react-router-dom";
import Clientes from "../components/Clientes";
import { obtenerClientes } from "../data/clientes";

export function loader() {
  const clientes= obtenerClientes();

  return clientes;

}

function Index() {
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="w-1/5 py-2">Cliente</th>
              <th className="w-1/5 py-2">Contacto</th>
              <th className="w-1/5 py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map((cliente) => (
              <Clientes
                cliente={cliente}
                key={cliente.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5 text-center text-2xl">No hay clientes</p>
      )}
    </>
  );
}

export default Index;
