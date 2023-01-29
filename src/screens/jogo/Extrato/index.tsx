import styled from "styled-components";
import react from "react";
import { Button } from "@mui/material";
import nookies from 'nookies'
import useSWR from "swr";
import ListIcon from '@mui/icons-material/List';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { useRouter } from "next/router";
import React from "react";

const Extrator = styled.th`
 background: ${props => props.theme};
 padding:10px;
 border-radius: 20px;
 margin: 0.2em 0;
 text-align: center;
`



const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Extrato(ctx = null){
    const cookie = nookies.get(ctx)
     
    const { data, error } = useSWR(
        `https://sage-groove-368801.uc.r.appspot.com/api/extrato?keyRoom=${cookie.chave}`,
        fetcher, { refreshInterval: 30000 },
      );
    const [isChecked, setChecked] = react.useState(true)

    if (!data) return 'carregando extrato'
    if (error) return 'erro no extrato'

    const conteudo = data?.extrato?.map((dadosjogador) => (
            <Extrator theme={dadosjogador.idPlayerPara == cookie.Player ? "rgba(195, 255, 195, 0.75)" : null || dadosjogador.idPlayerDe == cookie.Player ? "rgba(255, 195, 195, 0.75) " : null} >
            {dadosjogador.descricao + " " + dadosjogador.dataTransacao.substring(11, 19)}

            </Extrator>))
  
    const handleCheck = () => {
        setChecked((preventState) => !preventState)
    }
 
   
    return (<>
         <style jsx>{`
        table{
                text-align: : center;
                margin: 2em auto;
        }
        tbody{
            display: block; 
            overflow-y: auto;
            height: 290px;
        }
        tr{
            display: grid;
            background-color: azure;
            border-radius: 20px; 
        }   
    
      `}
      
      </style >
        <table id='Extrato'>
            <tbody>
            <tr>
            <Button
                    onClick={handleCheck}
                > Extrato  {isChecked ? <ListIcon/> : <FilterListOffIcon/>}</Button>
                {isChecked ? conteudo?.slice(0, 5) : conteudo}   
            </tr>
            </tbody>
         
        </table>
    </>
       
    )
}
