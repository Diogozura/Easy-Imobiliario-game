import styled from 'styled-components'

export const Form = styled.form`
    width: 500px;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 3em;
    background-color: white; 
    border-radius: 10px;

    justify-items: center;
    display: grid;
    @media only screen and (max-width: 600px) {
       width : 90%;
    }
`

export const AvatarCores = styled.section`
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    /* width: 300px; */
    justify-content: center;
    flex-wrap: wrap;
    

    @media only screen and (max-width: 600px) {
       /* width : 80%; */
       padding: 0px;
    }
`
export const Coress = styled.aside`
    display: grid;
    justify-items: center;
    margin: 0px 1em;

    width: 95px;
    @media only screen and (max-width: 600px){
        margin: 0;
    }
`