import React,{useContext,useState} from 'react'
import { CategoriasContext } from '../context/CategoriasContext'
import { RecetasContext } from '../context/RecetasContext'
import Error from './Error';

const Formulario = () => {

    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, setConsulta } = useContext(RecetasContext);

    const [ error, setError ] = useState(false);
    const [busqueda, setBusqueda]=useState({
        nombre:'',
        categoria:''
    });

    const {nombre,categoria}=busqueda;

    // Funcion para leer los contenidos.
    const handleChange = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }

    const hanldeSubmit = e => {
        e.preventDefault();

        // validar campos.
        if(nombre.trim()===''||categoria.trim()===''){
            setError(true);
            setTimeout(()=>{
                setError(false);
            },2500)
            return
        }

        setError(false);
        buscarRecetas(busqueda);
        setConsulta(true);
    }

    return (
        <>
        <form className='col-md-12' onSubmit={hanldeSubmit}>
            <fieldset className='text-center'>
                <legend>Busca bebidas por categoria o ingrediente</legend>
            </fieldset>
            <div className='row my-4'>
                <div className="col-md-4">
                    <input 
                        type="text" 
                        className='form-control'
                        name='nombre'
                        placeholder='Buscar por Ingrediente'
                        onChange={handleChange}
                        />
                </div>
                <div className="col-md-4">
                    <select
                        className='form-control'
                        name='categoria'
                        onChange={handleChange}
                    >
                        <option value="">--Selecciona Categoria--</option>
                        {categorias.map(categoria=>(
                            <option 
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="submit" className='btn btn-block btn-info' value='Buscar bebidas' />
                </div>
            </div>
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
        </form>
        </>
    )
}

export default Formulario
