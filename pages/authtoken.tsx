import { useRouter } from 'next/router';
import React from 'react';
import { validaToken } from '../src/services/auth/validaToken';
import { Backdrop, CircularProgress } from '@mui/material';
import nookies from 'nookies';
import { tokenService } from '../src/services/auth/tokenService';
export default function authtoken({ token }, ctx = null) {
    
    const cookie = nookies.get(ctx)
    const router = useRouter()
    const { pid } = router.query
    
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(() => {
setOpen(true)
        try {
            validaToken.validar({
                keyRoom: pid || cookie.chave,
            })
                .then((res) => { 
                    {
                        if (cookie.Player && cookie.Player) {
                            router.push(`/sala/${pid}`, )
                        } else {
                            router.push(`/Jogador/${pid}`) 
                            tokenService.save(pid, '', '')
                        }
                           
                    }   
                })
                .catch((res) => {
                   
                    router.push('/')
                })
        }
        catch (err) {
          
            router.push('/')
        }
        
    },[])

    return (
        <>
            {/* Você será redirecionado em instantes... */}
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </>
    )
}