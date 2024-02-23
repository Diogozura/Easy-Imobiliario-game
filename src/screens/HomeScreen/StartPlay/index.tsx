import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { validaToken } from '../../../services/auth/validaToken'
import nookies from 'nookies'
import { tokenService } from '../../../services/auth/tokenService'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material'
import { authService } from '../../../services/auth/authService'
import { Box, Text } from '../styledHome/index';
import { Botaoq } from '..'
import Link from 'next/link'

// import { Botao, Botaoq } from '../index';

const Form = styled.form`
display: grid;
justify-items: center;
`

export const A = styled.a`
    text-decoration: none;
    padding: 10px;
    cursor: pointer;
    background: ${props => props.bgBotao};
    color: ${props => props.color};
    border-radius: 20px;
    margin: 5px 0;
    &:hover{
      color: ${props => props.color};
      text-decoration: underline;
    }
`


export default function StartPlay(ctx = null) {
    const cookie = nookies.get(ctx)
    
    
    React.useEffect(() => {
        if (cookie.chave == 'undefined') {
            cookie.chave = ''
        } else {
            setValues({ pid : cookie.chave })
        }
    }, [])
    const router = useRouter()
    
 
   
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open); 
    };

    const [values, setValues] = React.useState({
        pid : '',
      })
    
    function handleChange(event) {
        const fieldValue = event.target.value.toUpperCase();
        // const fieldValue = event.target.value
        const fieldName = event.target.name;

        setValues((currenetValues) => {
            return {
              ...currenetValues,
              [fieldName]: fieldValue
            }
          })
    }
    function onSubmit(event) {
        event.preventDefault();    
        console.log(values)
        router.push({
            pathname: '/authtoken',
            query: { pid : values.pid },
        })
    }

    return (
        <Box
            bg="#FFFF"
            shadow="2px 2px 5px 1px rgb(0 0 0 / 64%);"
            padding="30px"
        >
            <Text>
                Para começar coloque o Código da
                sala ou crie sua própria
            </Text>
            <Text>
                <strong>Código da Sala</strong>
            </Text>
            <Form onSubmit={onSubmit}>


                <TextField
                    id="standard-basic"
                    name="pid"
                    multiline
                    value={values.pid}
                    onChange={handleChange}
                    label="Código da sala"
                    variant="standard"
                    inputProps={{ maxLength: 8 }}
                />


                <A
                    bgBotao="#22192c"
                    color="white"
                    href='/sala'
                    handleToggle={handleToggle}
                    onClick={onSubmit}
                >
                    Entrar
                </A>
                
            <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            </Form>
            <Botaoq onClick={handleToggle} color={'#22192C'}  href={"/criarSala"}>Criar Sala</Botaoq>
        </Box>


    )
}
