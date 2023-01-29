import { authService } from "./authService";
import React from 'react';
import { CoresRestantes } from "../../../interface/CoresRestantes";

export default function useCores() {
    const [session, setSession] = React.useState<CoresRestantes>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        authService.coresRestantes()
            .then((session) => {
                const body = session
               
                setSession(body)
            })
            .catch((session) => {
                setError(session)
                
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])


    return {
        data: session,
        error,
        loading
    }
}