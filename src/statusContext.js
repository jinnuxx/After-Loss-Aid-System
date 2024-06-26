import React, { createContext, useContext, useState, useEffect } from "react";

const StatusContext = createContext();

export function StatusProvider({ children }) {
    // 24
    //const [selectedStatus, setSelectedStatus] = useState([]);

    const [status, setStatus] = useState(true);

    const getStatus = () => {
        //console.log(status);
        return status;
    }

    useEffect(() => {
    }, [status]);


    return (
        <StatusContext.Provider
            value={{
                setStatus,
                getStatus
            }}
        >
            {children}
        </StatusContext.Provider>
    );
}

export function useStatus() {
    return useContext(StatusContext);
}
