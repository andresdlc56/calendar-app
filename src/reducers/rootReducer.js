import { combineReducers } from "redux";

/*===========================REDUCERS==============*/
    import { uiReducer } from "./uiReducer";
    import { calendarReducer } from './calendarReducer';
/*=======================FIN REDUCERS==============*/

/*ARCHIVO NECESARIO PARA REUNIR TODOS MIS REDUCERS EN UN SOLO LUGAR
QUE LUEGO SERA ENVIADO AL STORE*/
export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
});