import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/*=======================COMPONENTES DE TERCEROS=============*/
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'; //LIBRERIA Q FACILITA EL TRABAJO CON LAS FECHAS
import Swal from 'sweetalert2'; //libreria para la alertas
/*====================FIN COMPONENTES DE TERCEROS=============*/


/*========================ACCIONES=========================== */
    import { uiCloseModal } from '../../actions/ui';
import { eventAddNew } from '../../actions/events';
/*=====================FIN ACCIONES=========================== */


//Estilos necesarios para colocar el modal en el centro de la pantalla
/*NOTA: estos estilos se pueden apartar en otro archivo y luego importarlos
para mantener el area lo mas limpio posible*/
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

//Esto no puede faltar. basicamente indica con q elemento de la app esta enlazado al modal.
//"#root" = app general 
Modal.setAppElement('#root');


//hora de inicio de un evento
//retorna la hora actual con los min y los seg en 0 y le añade 1 hora 
const now = moment().minutes(0).seconds(0).add(1, 'hours');


//hora de fin de un evento
//retorna la misma hora de inicio(now) + 1 hora 
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui)

    //const [isOpen, setIsOpen] = useState(false);
    

    //state que sera usado como bandera en le input de fecha de inicio del evento
    //la fecha sugerida sera siempre la actual
    const [dateStart, setDateStart] = useState(now.toDate());


    //state que sera usado como bandera en le input de fecha de fin del evento
    //la fecha sugerida sera siempre la misma que la del inicio mas 1 hora
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());


    //state que sera usado como bandera para indicar si el "title" del formulario es valido
    const [titleValid, setTitleValid] = useState(true)


    //estado x defecto que va a tener el formulario de eventos 
    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
    });

    const { title, notes, start, end } = formValues;

    //funcion que maneja la logica para cerrar el modal
    const closeModal = () => {
        dispatch(uiCloseModal());
    }


    //manejador del input para la fecha de inicio de un evento
    /*se va a ejecutar cada vez que el usuario cambie los valores del input que 
    maneja la fecha de inicio*/
    const handleStartDateChange = (e) => {
        //cambiando el valor de la fecha de inicio por la seleccionada x el usuario
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
        console.log(e);
    }


    //manejador del input para la fecha de fin de un evento
    /*se va a ejecutar cada vez que el usuario cambie los valores del input que 
    maneja la fecha de fin*/
    const handleEndDateChange = (e) => {
        //cambiando el valor de la fecha de fin por la seleccionada x el usuario
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
        console.log(e);
    }

    /* manejador de los cambios en los input (title, notes) */
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    //Manejador del envio del formulario del modal
    //aqui ya tengo disponible toda la info que esta enviando el usuario
    const handleSubmitForm = (e) => {
        e.preventDefault();

        //obteniendo y dandole un formato adecuado a las fechas "start" y "end"
        const momentStart = moment(start);
        const momentEnd = moment(end);

        //validando q la fecha "start" no sea igual o superiror a la fecha "end"
        if(momentStart.isSameOrAfter(momentEnd)) {
            console.log('Fecha Final debe ser mayor a la fecha de inicio');
            
            //Emitiendo alerta 
            return Swal.fire('Error', 'Fecha Final debe ser mayor a la fecha de inicio', 'error');
        }

        //Si la longitud del "title" enviado es menor a 2, retorna false
        if(title.trim().length < 2) {
            return setTitleValid(false);
        }

        //=============TODO SALIO BIEN===========

        /* TAREA: REALIZAR LA GRABACION EN DB */
        /* enviando los datos del formulario al reducer por medio de la accion 
        eventAddNew y agregandole un id para efectos de simulacion de la db*/
        dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Andres'
            }
        }));
        
        //Cambiando el valor de la bandera "titleValid" a true
        setTitleValid(true);

        //ejecutando la funcion para cerrar el modal
        closeModal();
    }


    return (


        /*"Modal" es un componente proveniente de la libreria "react-modal"
        todas sus propiedades pertenecen a la libreria y controlan el 
        funcionamiento del modal.
        
        el valor de las propiedades "className" y "overlayClassName" estan definas en 
        el archivo styles.css que esta en la raiz de la app */
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }    
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                        name="start"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                        name="end"
                    />
                </div>

                <hr />

                {/* aqui manipulo las clases del input dependiendo del valor de la bandera 
                "titleValid" */}
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${ !titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
