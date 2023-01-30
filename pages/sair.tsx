import { Box, Button, Modal, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { Botao } from "../src/components/Botao"
import { AvatarCores, Form } from "../src/components/Icones"
import { authService } from "../src/services/auth/authService"
import { tokenService } from "../src/services/auth/tokenService"
import nookies from 'nookies'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    textAlign:'center',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
  p: 4,
  ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
    width: '80%',
  }
  };

  export async function getServerSideProps(ctx) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const cookie = nookies.get(ctx)
    const res = await fetch(`https://sage-groove-368801.uc.r.appspot.com/api/dadosSala?keyRoom=${cookie.chave}&idPlayer=${cookie.Player}`)
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }


export default function Sair({ data }, ctx) {
    const router = useRouter()
    console.log('data', data)
    const cookie = nookies.get(ctx)
    function handleClick() {
        authService.Sair()
            .then(() => {
                                tokenService.delete()
                                router.push('/')
                            })
                            .catch((error) => {
                           
                        })
        
    }
  

    const [values, setValues] = React.useState({
        user: '',
        cores: '',
    })

    function handleChange(event) {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;

        setValues((currenetValues) => {
            return {
                ...currenetValues,
                [fieldName]: fieldValue,
            }
        })
    }
    const [modal, setModal] = React.useState(false)
    const toggle = () => setModal(!modal)



    const conteudo = data?.players?.map((jogadores) => (
        <>
            <AvatarCores key={jogadores.idPlayer}>
                <label
                    htmlFor={jogadores.identificador}>
                    <Image
                        width={60}
                        height={60}
                        src={`/avatar/${jogadores.identificador}.svg`} alt={`${jogadores.identificador}`}
                    />
                </label>
                <input
                    name="user"
                    type="radio"
                    id={jogadores.identificador}
                    value={jogadores.idPlayer || ''}
                    onChange={handleChange}
                />

            </AvatarCores>
        </>
    ))

    const troca = () => {
        return (
            <Form onSubmit={(event) => {
                
                event.preventDefault();
                
                authService.TrocaPlayer({
                    idPlayerPara: parseInt(values.user),
                })
                    .then(() => {
                        authService.Sair()
                            .then(() => {
                                
                                tokenService.delete()
                                router.push('/')
                            })
                            .catch((error) => {
                            
                        })
                        

                        
                    })
                    .catch((err) => {
                        alert('algo não saiu como o previsto ')
                    })

            }}>

                Passar Batão para o novo Banco
                {conteudo}
                <Botao >
                    Trocar e sair
                </Botao>
            </Form>
        )
    }

    const sair = () => {
        return (
            <>
                <h3>Tem certeza que deseja sair?</h3>
                <Botao
                key={data?.idPlayer}
                onClick={handleClick}>
                Sair
            </Botao>
            </>
            
           
        )
    }
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false) ;
 
    React.useEffect(() => {
        handleOpen()
    },[])
    
    return (
        <>

   
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           SAIR
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        {data?.playerBank == 1 && data?.players.length > 0 ? troca() :   sair()}
                        <Button onClick={()=> router.push(`/sala/${cookie.chave}`)}>
                        Cancelar
                        </Button>
          </Typography>
        </Box>
      </Modal>
        </>

    )
}