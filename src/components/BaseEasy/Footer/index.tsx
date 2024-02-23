
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styled from 'styled-components'
import { Navigation } from '../../Links'


const Rodape = styled.footer`
    background-color:#22192C ;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    bottom: 0;
    /* position: fixed; */
    @media only screen and (max-width: 550px) {
        flex-direction: column;
        align-items: center;
    }
   
`

export const A = styled.a`
color: #FFFF;
padding: 1px;
text-decoration: none;
cursor: pointer;
@media only screen and (max-width: 550px){
    margin: 5px;
}
&:hover{    
    color: #FFFF;
    text-decoration: underline;
    }
`

const Links = [{
    "id": '1',
    "link": "/termosPrivacidade",
    "name": "Política de Privacidade"
},
{
    "id": '2',
    "link": "/termosUso",
    "name": "Termos de Uso"
},
{
    "id": '3',
    "link": "/sobre",
    "name": "Sobre"
},
{
    "id": '5',
    "link": "https://easycalculos.com.br/",
    "name": "Desenvolvido por Easy calculos"
},
]

export default function Footer() {

    return (

        <Rodape>

            {Links.map((value) => (
                <Navigation key={value.id} href={value.link}> {value.name}</Navigation>
            ))}

            <A href="https://www.instagram.com/easybankgame/" passHref>
                <FontAwesomeIcon icon={faInstagram} className="fa-2x fa-inverse" />
            </A>
        </Rodape>)
}