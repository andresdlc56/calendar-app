import moment from "moment";
import { types } from "../types/types";

//Estado Inicial de mi calendarReducer
//Para efectos de sera usada como un modelo de los eventos provenientes de la db
const initialState = {
    events: [
        {
            title: 'Cumpleaños del Jefe',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'Comprar Pastel',
            user: {
                _id: '123',
                name: 'Andres'
            }
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }   
        case types.eventAddNew: 
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        default:
            return state;
    }
}