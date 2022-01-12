import React,{useContext,useState} from 'react'
import { ModalContext } from '../context/ModalContext'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow:'scroll',
        height:'100%',
        maxHeight: '500px',
        display:'block'
    },
}));

const Receta = ({receta}) => {

    // COnfiguracion del modal de Material=ui
    const [ modalStyle ] = useState(getModalStyle);
    const [open,setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    // Extraer los valores del context modal.
    const { informacion, guardarIdReceta, setReceta } = useContext(ModalContext);

    // Muestra y formatea los ingredientes:

    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for(let i=1; i<16;i++){
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{informacion[`strMeasure${i}`]} {informacion[`strIngredient${i}`] }</li>
                )
            }
        }
        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className='card-img-top' src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />
                <div className="card-body">
                    <button
                        type='button'
                        className='btn btn-block btn-primary'
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>
                    
                    {/* Aqui el modal */}
                    <Modal
                        open={open}
                        onClose={()=>{
                            guardarIdReceta(null);
                            setReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <div className={classes.header}>
                                <h2>{informacion.strDrink}</h2>
                                <img 
                                    className='img-fluid my-4'
                                    src={informacion.strDrinkThumb} 
                                    alt="" 
                                />
                            </div>
                            <div className={classes.content}>
                                <h3>Ingredients</h3>
                                <ul>
                                    {mostrarIngredientes(informacion)}
                                </ul>
                                <h3 className='mt-4'>Directions</h3>
                                <p>{informacion.strInstructions}</p>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Receta
