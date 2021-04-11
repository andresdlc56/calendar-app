import React from 'react'


/* 
    con este componente puedo manipular el contenido de los eventos
    en el calendario

    recibe el evento con todas sus propiedades
*/
export const CalendarEvent = ({ event }) => {
    
    const { title, user } = event;

    return (
        <div>
            <span>{ title }</span>
            <strong>- { user.name }</strong>
        </div>
    )
}
