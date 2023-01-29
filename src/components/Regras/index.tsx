import { Box, Parte, SubTitulo, Text, Titulo } from "../../screens/HomeScreen"
import styled from "styled-components"
import Link from "next/link"
import InfoIcon from '@mui/icons-material/Info';
import { theme } from "../../../pages/_app";

const Caixa = styled.article`
padding: 10px;
 margin: 1em 0;
text-align: center;
`
const LinkRegra = styled.a`
    text-decoration: none;
    color: ${theme.colors.secondary};
    text-decoration: underline;
    &:hover{
      text-decoration: none;
    }
 `

export default function Regras() {
    return (
        <>
            <Caixa>
                <Titulo id="regras">Entenda o Easy</Titulo>
                <Parte>

                    <Box margin="2em">
                        <Caixa>
                            <SubTitulo marginSubTitulo="1em">Com duvida de como Jogar? <InfoIcon color="info" /> </SubTitulo>
                            <Text>
                                Você pode acessar a página de <LinkRegra href='/guia'>Guia de uso</LinkRegra> para conseguir jogar e ter a melhorar experiencia jogando com Easy imobiliário  game.
                            </Text>
                            <Text>
                                Em caso de duvida , bugs ou até mesmo sugestão de melhoria , acesse a página <LinkRegra href='/sobre'>Sobre</LinkRegra>
                            </Text>
                        </Caixa>
                    </Box>
                </Parte>
            </Caixa>
            <Caixa>
                <Parte>

                    <Box margin=".5em">
                        <Caixa>
                            <SubTitulo marginSubTitulo="1em">Easy imobiliário game <InfoIcon color="info" /> </SubTitulo>
                                <Text>
                                Easy imobiliário surgiu como um projeto para melhorar a experiência de quem tá em uma partida de banco imobiliário , facilitando o meio de transferência sem a necessidade de papéis.
                                </Text>
                                <Text>
                                    Por que usar o Easy para sua partida ? Ele vai ser um apoio em toda sua partida , facilitando as transferências entre jogadores e possibilitando ver o extrato bancário de transferência de todos os jogadores presentes .
                                </Text>
                                <Text>
                                Easy é pago? Não o easy não é pago , apenas se divirta , ele foi criado apenas para ser um portfólio e nada melhor que um projeto que realmente dê para usar .
                                </Text>
                            <Text>
                            Tem app? Sim , apenas na Play Store (por enquanto) , mas se tudo der certo também terá versão para IOS . Mas de qualquer modo ele também vai funcionar para navegador .
                                </Text>
                               

                                 
                            <Text>
                                Em caso de duvida , bugs ou até mesmo sugestão de melhoria , acesse a página <LinkRegra href='/sobre'>Sobre</LinkRegra>
                            </Text>
                        </Caixa>
                    </Box>
                </Parte>
            </Caixa>

        </>
    )
}