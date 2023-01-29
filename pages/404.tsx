import Head from "next/head";
import Link from "next/link";
import { Titulo } from "../src/screens/HomeScreen";
import BaseEasy from '../src/components/BaseEasy/index';
import { Navigation } from "../src/components/Links";

export default function Error404() {
    return (
        <>
            <BaseEasy title={404} nav={"none"}>
                <Titulo style={{ "marginTop": "2em" }}> Error 404</Titulo>
                <p>Vish, essa pagina não existe</p>
            <Navigation style={{"color": "#000" }} href="/" prefetch>
                Voltar para Home
            </Navigation>
            </BaseEasy>

           
           
        </>
)
}