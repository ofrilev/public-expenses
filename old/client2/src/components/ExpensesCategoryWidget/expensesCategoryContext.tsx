import { createContext, useContext, useState } from 'react';
type breakDownData = {
    month: string,
    category: string,
    subCategory: string,
    business_name:string,
    expense:string
}
export interface ContextState{
    month?: string,
    category?: string,
    subCategory?: string,
    business_name?:string,
    expense?:string
}

interface ContextValue {
    contextState: ContextState;
    updateContextState: (newState: Partial<ContextState>) => void;
}

// Create a new context
const BreakDownDataContext = createContext<ContextValue| undefined | {}>({});

// Custom hook to access the context value
export function useBreakDownDataContext(): ContextValue {
    const context = useContext(BreakDownDataContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    // @ts-ignore
    return context;
}

// Default function to provide the context value
// @ts-ignore
export default function MyContextProvider({ children }) {
    // Define your context value and any necessary state or functions
    const [state, setState] = useState<breakDownData | undefined | {}>({});
    const updateContextState = (newState: breakDownData) => {
        setState((prevState: breakDownData) => ({
            ...prevState,
            ...newState,
        }));
    };


    const contextValue = {
        contextState: state,
        updateContextState, // Pass the update function to the context value
    };


    // Provide the context value to the children components

    return (
        // @ts-ignore
        <BreakDownDataContext.Provider value={contextValue}>
            {children}
        </BreakDownDataContext.Provider>
    );
}
