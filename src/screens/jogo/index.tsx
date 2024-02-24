import { Titulo } from "../../components/Titulo";
import React from "react";
import nookies from 'nookies'
import styled from 'styled-components'
import { DadosJogador } from "./DadoJogador";
import Jogadores from "./DadosJogadores";
import useSWR from 'swr'
import { useRouter } from "next/router";
import Extrato from './Extrato/index';
import BaseEasy from '../../components/BaseEasy/index';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import ShareIcon from '@mui/icons-material/Share';
import { theme } from "../../../pages/_app";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { LinkBotoa } from "../../components/Botao";
import { Box } from "@mui/material";
import { tokenService } from "../../services/auth/tokenService";

const BoxJogadores = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const SaireToken = styled.section`
/* display: flex; */
justify-content: space-around;
align-items: center;
flex-wrap: wrap;
`
const Contatos = styled.aside`
    display: flex;
    justify-items: center;
    margin: auto;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    background-color:  ${theme.colors.button};
    border-radius: 10px;
    color: #ffff;
    align-items: center;
    justify-content: center;
    display: inherit;
`

export const A = styled.a`
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    background-color:  ${theme.colors.button};
    color: #FFFF;
    font-weight: 600;
    margin: 10px;
    &:hover{
      color: ${props => props.color};
      text-decoration: underline;
    }
    @media only screen and (max-width: 600px) {
        display: none;
    }
   
    `

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Jogo({ children, ...props }, ctx = null) {
    const router = useRouter()

    const { token } = router.query
    const share = async () => {
        await Share.share({
            title: 'Easy imobiliário game',
            text: 'Entre na sala com seus amigos',
            url: `https://easyimobiliario.com.br/sala/${token}`,
            dialogTitle: 'Compartilhe com seus amigos',
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }


    const cookie = nookies.get(ctx)
    React.useEffect(() => {
        const cookie = nookies.get(ctx);
    
        if (token) {
          if (!cookie.Player || cookie.Player === 'undefined') {
            router.push(`/Jogador/${token}`);
          }
        }
    
        // Verifica se algum jogador na lista tem o ID desejado
        if (cookie.Player && cookie.chave) {
          const url = `https://fonidaiane.pythonanywhere.com/easyBankImobiliario/api/dados_sala?keySala=${cookie.chave}`;
    
          fetch(url)
            .then(response => response.json())
              .then(data => {    
                  if (!data.jogadores.find(jogador => jogador.id_jogador === parseInt(cookie.Player))) {
                    router.push(`/Jogador/${token}`);
                  }
            })
            .catch(error => {
              console.error('Erro ao obter dados da sala:', error);
            });
        }
      }, [token, cookie]);

    const { data, error } = useSWR(
        `https://fonidaiane.pythonanywhere.com/easyBankImobiliario/api/dados_sala?keySala=${cookie.chave}&idJogador=${cookie.Player}`,
        fetcher, { refreshInterval: 10000 }
    )

    if (error) return 'error';
    if (!data) return "Loading...";

   

    return (
        <BaseEasy nav={'none'} sala={true} title={"Sala "} >
            <Head>
                <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
                    async strategy="afterInteractive"
                    onError={(e) => { console.error('Script failed to load', e) }}
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
                />
            </Head>
            <Box component={'main'} height={data.jogadores.length >= 1 ? 'none' : '100vh'}>

           
            <Titulo>Bem Vindo a sala</Titulo>

            <SaireToken>
                <Contatos>
                    {!Capacitor.isNativePlatform() &&  <span>Compartilhar {token} </span>}
                    {Capacitor.isNativePlatform() &&
                        <Button onClick={() => share()}>Compartilhar  <ShareIcon /> </Button>
                    }
                </Contatos>


                {/* {<Sair data={data} />} */}
                <Link
                    href={'/sair'}
                    passHref
                    legacyBehavior
                ><LinkBotoa>Sair</LinkBotoa></Link>
                 
            </SaireToken>



            <DadosJogador data={data} />

            <BoxJogadores >
                <Jogadores data={data} />


            </BoxJogadores>

            <Extrato />
            </Box>
        </BaseEasy >)
}

