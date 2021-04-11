import { types } from "../types/types";


//accion utilizada para indicar que se debe abrir el modal
export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

//accion utilizada para indicar que se debe cerrar el modal
export const uiCloseModal = () => ({
    type: types.uiCloseModal
});