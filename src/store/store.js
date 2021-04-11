import { applyMiddleware, compose, createStore } from "redux";

//middleware para trabajar con acciones async
import thunk from "redux-thunk";

//archivo donde estan reunidos todos los reducers
import { rootReducer } from "../reducers/rootReducer";

//PARA INSTALAR LAS HERRAMIENTAS DE DASARROLLO EN MI APP (redux)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)