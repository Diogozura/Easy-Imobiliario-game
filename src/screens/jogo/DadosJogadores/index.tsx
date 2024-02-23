import Image from 'next/image';
import { Box, BoxJogador, SaldoFlag, NomeeIcon } from '../../../components/BoxJogador';
import { NomePlayer } from '../DadoJogador';

export default function Jogadores({ data }) {
    
    const conteudo = data.jogadores?.map((dadosjogador) => (
        <BoxJogador>
            
            {/* Nome e ícone dos jogares presentes na sala  */}
            <NomeeIcon>
            {dadosjogador.playerBank ? <Image src={`/avatar/B${dadosjogador.identificador}.svg`} width="80" height="80" alt={''} /> : <Image src={`/avatar/${dadosjogador.identificador}.svg`} width="60" height="60" alt={''} />}
                <NomePlayer>{dadosjogador.nome_jogador}</NomePlayer>
            </NomeeIcon>
            <Box>

                {/* Saldo do Jogadores  */}
                <SaldoFlag >
                    <h3>{dadosjogador.saldo}</h3>
                </SaldoFlag>
            </Box>
        </BoxJogador>
    ))
    
    return (
        <>
            {conteudo}
        </>
    )
}