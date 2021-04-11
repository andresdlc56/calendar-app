import { types } from "../types/types"

//Accion que se llamara para add un nuevo evento
export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event 
});

//Accion que se llamara al seleccionar un evento
export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});