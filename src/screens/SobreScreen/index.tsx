import { faBehance, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import styled from 'styled-components'
import { Texto, Titulo } from "../../components/Textos"
import BaseEasy from '../../components/BaseEasy/index';
import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import React from "react"
import Link from "next/link"
import { Divider, Typography } from "@mui/material"
import { Frontinfos, Infos } from "./styled"
import { SubTitulo } from "../HomeScreen/styledHome"
import Head from "next/head"
import Script from "next/script"


const Dev = [{
    id: '1',
    nome: 'Diogo',
    cor: '#22192C',
    funcao: 'Front-end',
    redes: [{
        instagram: 'https://www.instagram.com/diogo__zura/',
        linkldin: 'https://www.linkedin.com/in/diogo-silva-santos-251bb5192/',
        github: 'https://github.com/diogozura',
        be: 'https://www.behance.net/diogozura'
    }]
}, {
    id: '2',
    nome: 'Danilo',
    cor: "#E6332A",
    funcao: 'Back-End',
    redes: [{
        instagram: 'https://www.instagram.com/filitecxz/',
        linkldin: 'https://www.linkedin.com/in/danilo-silva-santos-555b5396/',
        github: 'https://github.com/dancxz'

    }]
},
{
    id: '3',
    nome: 'Iago',
    cor: '#951B81',
    funcao: 'Design',
    redes: [{
        instagram: 'https://www.instagram.com/_inhagu/',
        linkldin: 'https://www.linkedin.com/in/iago-de-sousa-santos-4502a2164/',
        be: 'https://www.behance.net/iagodesousa'
    }]
}
]



export default function Sobre() {
    const [isFlipped, setIsFlipped] = React.useState(false)



    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    }


 
    return (
        <BaseEasy title={"Quem Somos?"} sala={false} nav={"flex"}>
            <Head>
            <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
        />
            </Head>
            <Titulo >O que é o Easy bank imobiliário </Titulo>
            
            <Texto style={{
                maxWidth: '600px',
                textAlign: 'center',
                padding: '20px',
                margin: 'auto',
            }}>
                Easy Bank  é uma site para criar salas para jogar e
                facilitar transações dos jogos banco imobiliário, monopólio,
                mercado imobiliário, clique em criar sala e aproveite.

            </Texto>

            <Titulo>Quem Somos?</Titulo>
           
            <Texto style={{
                maxWidth: '600px',
                textAlign: 'center',
                padding: '20px',
                margin: 'auto',
            }}>
                Somos desenvolvedores da 2eSes tecnology , um projeto que temos como objetivo ajudar seu negocio alavancar, questões de automação e site é com a gente , se quer um projeto pessoa entre em contato .
               
               
            </Texto>
            <Typography sx={{textAlign:'center', margin:'auto'}}>
           
            <Link href={'https://github.com/Diogozura/Easy-Imobiliario-game#easy-imobiliário-game'}><FontAwesomeIcon icon={faGithub} className="fa-4x"  /></Link> 
            </Typography>
          
            <SubTitulo>Para mais informações clique nos cards</SubTitulo>

            <div style={{'margin':'auto', 'display':'flex',"justifyContent": "space-around", 'flexWrap': 'wrap' }}>
                {Dev.map((user) => (
                    <Flippy
                        flipOnClick={true} // default false
                        
                        style={{ width: '300px', height: '410px', margin: '50px' }}
                    >
                        <FrontSide id={`${user.id}`} style={{ borderRadius: '10px', padding: '0px', backgroundColor: `${user.cor}` }} >
                            <picture>
                            <Image style={{
                                borderRadius: '10px'
                           
                        }}
                            src={`/user/${user.nome}.png`}
                            alt="ad"
                            width={300}
                            height={300}

                        />
                            </picture>
                       
                        <Frontinfos style={{'position': 'absolute', 'width': '100%', 'bottom': '0' , 'backgroundColor': `${user.cor}`}}>
                                <Infos>{user.nome}</Infos>
                                <Divider/>
                                <Infos>{user.funcao}</Infos>
                        </Frontinfos>
                        </FrontSide>
                        <BackSide style={{ backgroundColor: `${user.cor}`, borderRadius: '10px' }}>
                            <Infos>{user.nome}</Infos>
                            <Divider/>
                        <Infos>{user.funcao}</Infos>
                        <Lista >{user.redes.map((rede) => (
                                    <>
                                        <Item><a href={`${rede.linkldin}`}><FontAwesomeIcon icon={faLinkedin} className="fa-2x" color="white" /></a></Item>
                                        <Item><a href={`${rede.instagram}`}><FontAwesomeIcon icon={faInstagram} className="fa-2x" color="white" /></a></Item>
                                        <Item>{rede.github ? <a href={`${rede.github}`}><FontAwesomeIcon icon={faGithub} className="fa-2x" color="white" /></a> : null}</Item>
                                        <Item>{rede.be ? <a href={`${rede.be}`}><FontAwesomeIcon icon={faBehance} className="fa-2x" color="white" /></a> : null}</Item>

                                        {/* <a href={`${rede.be}`}><FontAwesomeIcon icon={faBehance} className="fa-2x"  color="black"/></a> */}
                                    </>

                        ))}</Lista>
                            <Infos>Contato</Infos>
                          
                           
                        </BackSide>
                    </Flippy>
                ))}

            </div>
            
        </BaseEasy>
    )
}


const Desenvolvedores = styled.article`
display: flex;
justify-content: flex-start;
align-items: center;
flex-Wrap: wrap;
text-Align: center;
margin: 2em;
width: 645px;
border-radius: 50px;
color: white;
@media only screen and (max-width: 850px){
    justify-content: space-around;
    width: 90%;
}
`
const Lista = styled.ul`
    display: flex;
    flex-wrap: wrap;
`
const Item = styled.li`
    text-decoration: none;
    list-style: none;
    margin: 0 1em;
`