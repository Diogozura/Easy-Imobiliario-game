import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";
import nookies from 'nookies'

export const authService = {
    async criar() {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chave_sala`, {
            method: 'GET',   
        })
            .then(async (respostaDoServidor) => {
                if (!respostaDoServidor.ok) throw new Error("preencha todos os dados")
                const body = respostaDoServidor.body;
                return body
            })
    },

    async criarSala({ keySala, valorInicial, identificador, nomeJogador }) {
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/salva_sala`, {
            method: 'POST',
            body: {
                keySala,
                valorInicial,
                identificador,
                nomeJogador,
            }
        })
            .then(async (respostaDoServidor) => {
                if (!respostaDoServidor.ok) throw new Error("preencha todos os dados")
                const body = respostaDoServidor.body;
                tokenService.save(keySala, body.idJogador, ''  || null)
    
                return body
            })

    },

    async cores() {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cores`, {
            method: 'GET',
        })
            .then((resposta) => {
                const cor =  resposta.body
                    
               return cor
            })


    },

    async criarJogador({ identificador, nomeJogador }, ctx = null) {
        const cookie = nookies.get(ctx)
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/salva_jogador?keySala=${cookie.chave}`, {
            method: 'POST',
            body: {
                identificador,
                nomeJogador,
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.body.erro)
                tokenService.save(cookie.chave, res.body.idJogador, '' )
                
            })

    },

    async dadosPlayer(ctx = null) {
        const cookie = nookies.get(ctx)
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/dados_sala?keySala=${cookie.chave}&idPlayer=${cookie.Player}`, {
            method: 'GET',
        })
            .then((resposta) => {
                return resposta.body
            })
    },

    async transfereDinheiro({ idJogadorPara,valor}, ctx = null) {
        const cookie = nookies.get(ctx)
        const userDe =  `${cookie.banco === '0' ? 0 : cookie.Player }`
        
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/transferencia?keySala=${cookie.chave}`, {
            method: 'POST',  
            body: {
                idJogadorDe: JSON.parse(userDe),
                idJogadorPara,
                valor,
            }
        })
        .then((res) => {
            if (!res.ok) throw new Error(res.body)
            
        })
       
    },
    
    async TrocaPlayer({ idPlayerPara }, ctx = null) {
        const cookie = nookies.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/troca_player_banc?keySala=${cookie.chave}`,{
            method: 'POST',
            body: {
                idPlayerDe: cookie.Player,
                idPlayerPara: idPlayerPara
            }
        })
    },
    async Sair( ctx = null) {
        const cookie = nookies.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/quit_jogador?keySala=${cookie.chave}&idJogador=${cookie.Player}`,{
            method: 'DELETE',
           
        })
    },
    async coresRestantes(ctx = null) {
        const cookie = nookies.get(ctx)
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/coresrestantes/?keySala=${cookie.chave}`, {
            method: 'GET',
        })
            .then((resposta) => {
            

                return resposta.body
            })


    },
    async extrato(ctx = null) {
        const cookie = nookies.get(ctx)
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/extrato/?keySala=${cookie.chave}`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
            .then((resposta) => {
                
            })
            .then((data) => {
                
            })
            .catch((error) => {
          
        })


    },

}