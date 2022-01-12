import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios'

// Crear Context.
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // State del Provider.
    const [idreceta, guardarIdReceta ]= useState(null);
    const [ informacion, setReceta ] = useState({});

    // LLamar la api al tener el id de la receta.
    useEffect(()=>{
        const queryAPI = async () => {
            if(!idreceta)return;
            const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const result = await axios.get(URL);
            setReceta(result.data.drinks[0]);
        }
        queryAPI();
    },[idreceta])

    return (
        <ModalContext.Provider
            value={{
                informacion,
                setReceta,
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
