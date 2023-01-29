import BaseEasy from "../../components/BaseEasy";
import nookies from 'nookies';
import styled from "styled-components"
import React from "react";
import Image from "next/image";
import { Botao } from "../../components/Botao";
import { Titulo } from "../../components/Titulo";
import { useRouter } from "next/router";
import { authService } from "../../services/auth/authService";
import useCores from "../../services/auth/coresResta";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BoxTexto } from "../../components/BoxTexto";
import { Texto } from "../../components/Textos";
import { AvatarCores, Coress, Form } from "../../components/Icones";
import { tokenService } from "../../services/auth/tokenService";
import TextField from '@mui/material/TextField';
import { Button, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material';
import Head from "next/head";
import Script from "next/script";


export default function Jogador(ctx = null) {
    const router = useRouter()
    const cookie = nookies.get(ctx)
    const { jogador } = router.query
    
    React.useEffect(() => {
        if (jogador) {
            tokenService.save(jogador, '', '')
        }

        if (cookie.Player) {
            router.push(`/sala/${cookie.chave}`)
            tokenService.save(jogador, '', '')
        }
    }, [jogador])
    const restaCores = useCores()

    const cor = restaCores.data?.coresRestante

    const [values, setValues] = React.useState({
        usuario: '',
        cor: '',
    })
    function handlenChange(event) {
        const fieldValue = event.target.value;
        const fieldName = event.target.name;

        setValues((currenetValues) => {
            return {
                ...currenetValues,
                [fieldName]: fieldValue,
            }
        })
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <BaseEasy title={"Criar Jogador - Easy Imobiliário game"} nav="none">
                <Head>
                <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
        />
                </Head>
                <Titulo>Hora de Criar Jogador</Titulo>
                <BoxTexto>
                    <Texto>
                        selecione sua cor e seu nome e avance em iniciar game.
                    </Texto>
                </BoxTexto>
                <Form onSubmit={(event) => {
                    event.preventDefault()
                    authService.criarJogador({
                        identificador: values.cor,
                        namePlayer: values.usuario,
                    })

                        .then(() => {
                            router.push(`/sala/${cookie.chave}`)
                        })
                        .catch((err) => {
                            
                            alert(err)
                        })
                }}>

                    <TextField
                        id="standard-basic"
                        value={values.usuario}
                        required
                        onChange={handlenChange}
                        name="usuario"
                        label="Nome"
                        margin="normal"
                        variant="standard" />
                    <FormLabel id="demo-controlled-radio-buttons-group">Escolha seu icone</FormLabel>
                    <RadioGroup

                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={values.cor}
                        onChange={handlenChange}
                    >
                        <AvatarCores style={{ 'marginTop': '20px' }}>
                            {cor?.map((cor) => (
                                <Coress>

                                    <FormControlLabel
                                        value={cor.identificador}
                                        name="cor"
                                        control={<Radio />}
                                        label={<Image
                                            width={80}
                                            height={80}
                                            src={`/avatar/${cor.identificador}.svg`} alt={`${cor.identificador}`} />}
                                        labelPlacement="top"
                                    />
                                </Coress>

                            ))}
                        </AvatarCores>

                    </RadioGroup>


                    <Botao onClick={handleToggle}>Confirmar</Botao>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Form>
            </BaseEasy>
        </>
    )
}