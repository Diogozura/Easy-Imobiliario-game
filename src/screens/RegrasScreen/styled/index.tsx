import styled from 'styled-components'

export const BoxTexto = styled.div`
    width: 50%;
    text-align: justify; 
    padding: 10px;
    margin-bottom: 3em;
    
    margin: 0em auto 1em auto;
    @media only screen and (max-width: 600px){
    width: 60%;
    margin: auto;
    }
`
export const SectionGuia = styled.section`
    width: 70%;
    display: flex;
    justify-content: space-around;
`