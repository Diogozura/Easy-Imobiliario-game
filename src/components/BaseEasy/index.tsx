import { NextSeo } from "next-seo";
import Head from "next/head";
import Footer from "./Footer";
import Topo from "./Header";


export default function BaseEasy({ children, title, nav }) {
    return (
        <>
            <NextSeo nofollow={true}
                title={title}
                description="Easy Bank, um novo jeito de Jogar Banco imobiliário , confira agora nosso game e compartilhe com seus amigos - desenvolvido por 2eSes"
                
                robotsProps={{
                    nosnippet: true,
                    notranslate: true,
                    noimageindex: true,
                    noarchive: true,
                    maxSnippet: - 1,
                    maxImagePreview: 'none',
                    maxVideoPreview: - 1,
                }}

                additionalMetaTags={[{
                    property: 'Front-end',
                    content: 'Diogo Zura',
                   
                }, {
                    property: 'dc:creator and back-end',
                    content: 'Danilo Silva',
                    
                }, {
                    property: 'Designer',
                    content: 'Iago de Sousa Santos',
                   
                }
                ]}

                canonical='https://www.easyimobiliario.com.br'
                openGraph={{
                    type: 'website',
                    url: 'https://easyimobiliario.com.br/',
                    title: 'Easy Imobiliáriooo',
                    description: 'Easy bank, uma nova maneira de jogar banco imobiliário, confira agora o nosso game',
                    images: [
                        {
                            url: 'https://easyimobiliario.com.br/image/Logo1.png',
                            alt: 'logo easy bank',
                        },
                    ],
                }}
            />
            <Head>
                <title>{title}</title>

            </Head>
            <Topo  children={undefined}  nav={nav} />
            {children}
            <Footer />
        </>


    )
}