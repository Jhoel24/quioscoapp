import { useEffect, useCallback } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()
    
    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre.trim() === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

    

    return(
        <Layout pagina={'Total y confirmar pedido'}>
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>
            <form onSubmit={colocarOrden}>
                <div>
                    <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre</label>
                    <input 
                        type={'text'}
                        id="nombre"
                        className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mt-10 text-2xl">
                    <p>Total a pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input 
                        type={'submit'}
                        value={'Confirmar pedido'}
                        className={`w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center ${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'}`}
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}