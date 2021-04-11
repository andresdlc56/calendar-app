import React from 'react';

//middleware que sirve para proveer o expandir el store a todos sus hijos
import { Provider } from 'react-redux';

import { store } from './store/store';

//COMPONENTE
import { AppRouter } from './router/AppRouter'



export const CalendarApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
