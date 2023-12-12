'use client'
import { createContext, useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    // const [auth, setAuth] = useState<Auth | undefined>(undefined);
    const LangueContext = createContext('en');
    const [currentLang, SetCurrentLang] = useState('en');

    useEffect(() => {
    }, []);

    return (
        <LangueContext.Provider value={currentLang}>
            {children}
        </LangueContext.Provider>
    )
}

export default Provider;