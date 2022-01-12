import React,{ createContext,useState,useEffect } from 'react'
import axios from 'axios';

// Crear el Context.

export const CategoriasContext = createContext();

// Provider es donde se encuentran las funcioens y state.

const CategoriasProvider = (props) => {

    // Crear el state del context.
    const [categorias, setCategorias]=useState([]);

    // Ejecutar llamado a la api
    useEffect(()=>{
        const getCategories = async () => {
            const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'

            const categorias = await axios.get(URL);

            setCategorias(categorias.data.drinks);
        }
        getCategories();
    },[])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;