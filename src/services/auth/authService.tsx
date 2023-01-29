import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";
import nookies from 'nookies'

export const authService = {
    async criar() {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createRoom`, {
            method: 'GET',   
        })
            .then(async (respostaDoServidor) => {
                if (!respostaDoServidor.ok) throw new Error("preencha todos os dados")
                const body = respostaDoServidor.body;
                return body
            })
    },

    async criarSala({ keyRoom, valorInicial, identificador, namePlayer }) {
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/SaveRoomPlayer`, {
            method: 'POST',
            body: {
                keyRoom,
                valorInicial,
                identificador,
                namePlayer,
            }
        })
            .then(async (respostaDoServidor) => {
                if (!respostaDoServidor.ok) throw new Error("preencha todos os dados")
                const body = respostaDoServidor.body;
                tokenService.save(keyRoom, body.idPlayer, ''  || null)
    
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

    async criarJogador({ identificador, namePlayer }, ctx = null) {
        const cookie = nookies.get(ctx)
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/createPlayer?keyRoom=${cookie.chave}`, {
            method: 'POST',
            body: {
                identificador,
                namePlayer,
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.body.erro)
                tokenService.save(cookie.chave, res.body.idPlayer, '' )
                
            })

    },

    async dadosPlayer(ctx = null) {
        const cookie = nookies.get(ctx)
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dadosSala?keyRoom=${cookie.chave}&idPlayer=${cookie.Player}`, {
            method: 'GET',
        })
            .then((resposta) => {
                return resposta.body
            })
    },

    async transfereDinheiro({ idPlayerPara,valor}, ctx = null) {
        const cookie = nookies.get(ctx)
        const userDe =  `${cookie.banco === '0' ? 0 : cookie.Player }`
        
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transferencia?keyRoom=${cookie.chave}`, {
            method: 'POST',  
            body: {
                idPlayerDe: JSON.parse(userDe),
                idPlayerPara,
                valor,
            }
        })
        .then((res) => {
            if (!res.ok) throw new Error(res.body)
            
        })
       
    },
    
    async TrocaPlayer({ idPlayerPara }, ctx = null) {
        const cookie = nookies.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/troca_player_banc?keyRoom=${cookie.chave}`,{
            method: 'POST',
            body: {
                idPlayerDe: cookie.Player,
                idPlayerPara: idPlayerPara
            }
        })
    },
    async Sair( ctx = null) {
        const cookie = nookies.get(ctx)

        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/quitPlayer?keyRoom=${cookie.chave}&idPlayer=${cookie.Player}`,{
            method: 'DELETE',
           
        })
    },
    async coresRestantes(ctx = null) {
        const cookie = nookies.get(ctx)
        
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/coresRestantes?keyRoom=${cookie.chave}`, {
            method: 'GET',
        })
            .then((resposta) => {
            

                return resposta.body
            })


    },
    async extrato(ctx = null) {
        const cookie = nookies.get(ctx)
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/extrato/?keyRoom=${cookie.chave}`, {
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