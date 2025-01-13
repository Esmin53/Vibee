"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export const MessageContext = createContext<{
    isUpLoading: boolean
    setIsUpLoading: Dispatch<SetStateAction<boolean>>
}>({
    isUpLoading: false,
    setIsUpLoading: () => null
})

export const MessageContextProvider = ({children}: {children: ReactNode}) => {
    const [isLoading, setIsLoading] = useState(false)

    return <MessageContext.Provider value={{
        isUpLoading: isLoading,
        setIsUpLoading: setIsLoading
        }}>
            {children}
    </MessageContext.Provider>
}