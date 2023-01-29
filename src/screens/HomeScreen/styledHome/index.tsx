import styled from 'styled-components';
import { theme } from '../../../../pages/_app';

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
  text-align: center;
  @media only screen and (max-width: 850px){
    margin: 0;
  }
`
export const Text = styled.p`
  color: ${theme.colors.secondary};
  font-size: 1.4em;
  margin: 0.6em 0;
  @media only screen and (max-width: 850px){
    margin: 0;
  }
`
export const Conteudo = styled.main`
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

export const Botao = styled.a`
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
export const WebOn = styled.div`
  @media only screen and (max-width: 600px){
    display:none
}
`
