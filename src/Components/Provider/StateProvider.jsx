import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

const useStatevalue = () => useContext(StateContext)

StateProvider.propTypes = {
    reducer: PropTypes.func.isRequired,
    initialState: PropTypes.object,
    children: PropTypes.node.isRequired
};

export { useStatevalue }