import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es'; //NECESARIO PARA CAMBIAR LOS INDICADORES A ESPAÑOL

/*=================COMPONENTES============ */
    import { Navbar } from '../ui/Navbar';
    import { CalendarEvent } from './CalendarEvent';
    import { CalendarModal } from './CalendarModal';
/*=============FIN COMPONENTES============ */


//objeto que contiene la traduccion de las etiquetas del calendario a español
import { messages } from '../../helpers/calendar-messages-es';


//estilos del calendario
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';


moment.locale('es'); //NECESARIO PARA CAMBIAR LOS INDICADORES A ESPAÑOL
const localizer = momentLocalizer(moment);


//EVENTO EN DURO PARA SIMULAR EL FUNCIONAMIENTO DEL CALENDARIO
/*const events = [{
    title: 'Cumpleaños del Jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar Pastel',
    user: {
        _id: '123',
        name: 'Andres'
    }
}];*/



export const CalendarScreen = () => {

    const dispatch = useDispatch();

    /* TAREA: TRAER DEL STORE LOS EVENTOS  */
    const { events } = useSelector(state => state.calendar);

    console.log(events);

    /*estado que sera usado como bandera para indiarle al componente en que etiqueta
    va a comenzar cada vez que se recarge la pagina.
    si no encuentra el "lastView" en localStorage debe iniciar en la etiqueta "month" */
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')


    //funcion que va a estar escuchando cuando se ejecute el evento "dobleClick"
    /*se la paso al componente (Calendar) para que este se ejecute cuando se haga 
    doble click en en el*/
    const onDoubleClick = (e) => {
        //console.log(e);
        dispatch(uiOpenModal());
    }

    //funcion que va a estar escuchando cuando se ejecute el evento click sobre el evento del calendario.
    /*se la paso al componente (Calendar) para que este se ejecute cuando se haga 
    click en en el*/
    const onSelectEvent = (e) => {
        //console.log(e);
        dispatch(eventSetActive(e));
        dispatch(uiOpenModal());
    }

    /*funcion que se va activar cuando se seleccione una de las etiquetas superiores 
    del Calendar.
    el "e" guarda el valor de la etiqueta seleccionada
    */
    const onViewChange = (e) => {
        //cambiando el valor del estado "lastView"
        setLastView(e);
        
        //guardando en el localStorage la vista o etiqueta q actualment se selecciono
        localStorage.setItem('lastView', e);
    }


    
    //FUNCION QUE SE ENCARGA DE MODIFICAR EL STYLE DEL EVENTO EN EL CALENDARIO
    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <>
            <div className="calendar-screen">
                <Navbar />

                {/*
                    Este componente viene x defecto con la libreria big-calendar
                    la propiedad "components" consume un componente definido x mi 
                    para manipular el contenido del evento

                    todas las propiedades de este componente se pueden buscar en su 
                    documentacion (big-calender). alli puedo encontrar su finalidad
                    y funcionamiento

                    "CalendarEvent" es un componente que defini en otro archivo, que 
                    basicamente maneja el contenido del evento en el calendario
                */}
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    messages={ messages }
                    eventPropGetter={ eventStyleGetter }
                    onDoubleClickEvent={ onDoubleClick }
                    onSelectEvent={ onSelectEvent }
                    onView={ onViewChange }
                    view={ lastView }
                    components={{
                        event: CalendarEvent
                    }}
                />

                {/* Boton Flotante la add un nuevo event */}
                <AddNewFab />

                {/* componente modal */}
                <CalendarModal />
            </div>
        </>
    )
}
