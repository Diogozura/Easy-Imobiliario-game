import BaseEasy from "../../components/BaseEasy";
import { Titulo } from "../../components/Titulo";
import React from 'react';
import { BoxTexto } from "./styled";
import { SubTitulo } from "../HomeScreen/styledHome";
import { Divider } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { Texto } from "../../components/Textos";
import Head from "next/head";
import Script from "next/script";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const guia = [{
    'id': 0,
    'slug': 'criarsala',
    'title': 'Criar Sala',
    'text': `Clique em criar sala e selecione o valor inicial para cada jogador. Em alguns jogos recomenda-se a quantia inicial de 2.558.000. Em seguida selecione seu nome e sua cor. Abaixo estará o código da sala para você compartilhar com seus amigos. Clique novamente em criar sala para ir para a sala do jogo (ao criar a sala você se tornará automaticamente o banco no jogo)`
}, {
    'id': 1,
    'slug': 'entrar',
    'title': 'Entrar na sala',
    'text': `Coloque o código da sala e clique em entrar na sala. Após isso selecione sua cor e seu nome e avance em iniciar game.`
}, , {
    'id': 2,
    'slug': 'transferencia',
    'title': 'Como fazer transferência',
    'text': `Clique no botão transferir e aparecerá uma tela onde você deve selecionar entre transferir para o banco ou para alguns de seus amigos.`
}, , {
    'id': 3,
    'slug': 'transferirBanco',
    'title': 'Como transferir sendo banco',
    'text': `Ative o modo banco, em "ON" e selecione transferir. Aparecerá uma tela onde você deve selecionar para quem será a transferência.`
}, , {
    'id': 4,
    'slug': 'transferir',
    'title': 'Como transferir a responsabilidade do banco',
    'text': `Se você for banco pode clicar no botão "Passar o Bastão" e escolher quem será o próximo felizardo a ter que ser o banco.`
    },
     {
    'id': 5,
    'slug': 'compartilhasala',
    'title': 'Como compartilha a sala',
    'text': `Pelo navegador Copie a URL e mande para seu amigo, no mobile ao lado do Código da sala terá um ícone para compartilhamento `
},]





export default function Regras() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    

    return (
        <BaseEasy title={'Guia de uso - easy imobiliário game'} nav={'flex'}>
            <Head>
            <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
        />
            </Head>
            <Titulo styled={{'marginTop': '1em'}}>
                Guia de uso <InfoIcon color="info"/>
            </Titulo>
            {guia.map((infos) => (
                <div id={`${infos.slug}` }>
                    <SubTitulo key={infos.id}  >{infos.title}</SubTitulo>
                    <BoxTexto>
                        <Texto>{infos.text}</Texto>
                        
                    </BoxTexto>
                    <Divider/>
                </div>
            ))}
          
        </BaseEasy>
    )
}