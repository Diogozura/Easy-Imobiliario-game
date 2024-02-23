import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const validaToken= {
    async validar(props) {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/dados_sala?keySala=${props.keyRoom}`, {
            method: 'GET',
        })
            .then(async (resposta) => {
               
            if (!resposta.ok) throw new Error('Token invalido')
     
        })
    }   
}
