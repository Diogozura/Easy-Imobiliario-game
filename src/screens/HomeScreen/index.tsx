import React from 'react'
import styled from 'styled-components'
import Regras from '../../components/Regras'

import BaseEasy from '../../components/BaseEasy'

import { Capacitor } from '@capacitor/core';
import StartPlay from './StartPlay/index';
import { WebOn } from './styledHome';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { theme } from '../../../pages/_app';
import Script from 'next/script';






export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  // {Capacitor.isNativePlatform() && alert('estamos no mobile')}

  return (
    <>
      <BaseEasy title={"Easy Bank - Easy Imobiliário game"} sala={false} nav={"flex"}  >
        <Head>
        <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
          />
           <meta name="description" content="Easy bank, uma nova maneira de jogar banco imobiliário, confira agora o nosso game"/>
       </Head>
        <Conteudo>

          <Parte margiBaixo="7.5em"
            alinhamento="center">
            <Box >
              <Titulo>
                O FUTURO É EASY
              </Titulo>

              <WebOn>
                <SubTitulo>
                  Seja bem vindo!
                </SubTitulo>
                <Text>
                  Easy Bank  é uma site para criar salas para jogar e
                  facilitar transações dos jogos banco imobiliário, monopólio,
                  mercado imobiliário, clique em criar sala e aproveite.

                </Text>
                <Text>
                  Você está a um passo de conhecer o futuro
                </Text>
              </WebOn>
              
            </Box>
            <StartPlay />
          </Parte>
          
          <Regras />

        </Conteudo>

      </BaseEasy>



    </>
  )
}

export const Titulo = styled.h1`
  text-align: center;
  font-family: 'Museo700';
  font-size: 3em;
  margin: 0;
`
export const SubTitulo = styled.h2`
  color: ${theme.colors.secondary};

  font-size:2em;
  font-family: 'Museo700';
  margin: 1em 0; 
  @media only screen and (max-width: 850px){
    margin: 0;
  }
`
export const Text = styled.p`
  color: #737176;
  font-size: 1.4em;
  margin: 0.6em 0;
  @media only screen and (max-width: 850px){
    margin: 0;
  }
`
const Conteudo = styled.main`
margin: 8em 0;
padding: 0;
@media only screen and (max-width: 850px){
  margin: 4em 0;
}
`
export const Box = styled.aside`
  width: 500px;
  padding: ${props => props.padding};
  margin-top: ${props => props.margin};
  text-align: center;
  background-color: ${props => props.bg};
  box-shadow:${props => props.shadow} ;
  border-radius: 64px;
  display: grid;
  justify-items: center;
  @media only screen and (max-width: 850px){
    width: 80%;
    padding: 10;
    margin: 10px;
  }
`

export const Botaoq = styled.a`
    text-decoration: none;
    padding: 10px;
    cursor: pointer;
    font-family: "Museo700";
 
    background: ${props => props.bgBotao};
    color: ${props => props.color};
    border-radius: 20px;
    margin: 5px 0;
    &:hover{
      color: ${props => props.color};
      text-decoration: underline;
    }
`
export const Parte = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: ${props => props.alinhamento};
  justify-items: center;
  margin-bottom: ${props => props.margiBaixo};
  @media only screen and (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
    margin:0px;
  }
`