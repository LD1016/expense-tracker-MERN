import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initail State
const initialState = {
    transactions : [
        //   { id: 1, text: 'Flower', amount: -20 },
        //   { id: 2, text: 'Salary', amount: 300 },
        //   { id: 3, text: 'Book', amount: -10 },
        //   { id: 4, text: 'Camera', amount: 150 }
        ],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions');
            // console.log(res.data);
            // console.log(res.data.data);
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
    }

    async function deleteTransaction(id){
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
        
    }

    // Add transaction
    async function addTransaction(transaction){
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            });
        }
        // dispatch({
        //     type: 'ADD_TRANSACTION',
        //     payload: transaction
        // })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions, 
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}
    >
        {children}
    </GlobalContext.Provider>)
}