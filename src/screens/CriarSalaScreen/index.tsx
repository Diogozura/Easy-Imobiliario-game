import react from 'react';
import NumberFormat, { InputAttributes } from 'react-number-format';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Button, FormControlLabel, FormLabel, Input, List, ListItem, Radio, RadioGroup } from '@mui/material';

import { Titulo } from '../../components/Titulo';
import { authService } from '../../services/auth/authService';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { BoxTexto, Texto } from '../../components/Textos';
import { useFetch } from '../../services/auth/authGetService';
import BaseEasy from '../../components/BaseEasy/index';
import { AvatarCores, Coress, Form } from '../../components/Icones';
import InfoIcon from '@mui/icons-material/Info';
import Link from 'next/link';
import { Navigation } from '../../components/Links';
import { SubTitulo } from '../HomeScreen';
import { A } from '../HomeScreen/StartPlay';
import Head from 'next/head';
import Script from 'next/script';




interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = react.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      thousandSeparator={'.'}
      decimalSeparator={','}
      prefix="R$"

    />
  );
});




export default function Criar() {
  

  const [open, setOpen] = react.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const router = useRouter()
  const { data: chave } = useFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/chave_sala`)
  const { data: cor } = useFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/cores`)


  const [values, setValues] = react.useState({
    nome: '',
    cor: '',
    token: '',
    valor: '2558000'
  })


  if (!chave) return ()=> setOpen(true)
  if (!cor) return ()=> setOpen(true);


  const handlenChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;



    setValues((currenetValues) => {
      return {
        ...currenetValues,
        [fieldName]: fieldValue
      }
    })
  }


  const submit = (event) => {
    event.preventDefault()
    handleToggle()
    authService.criarSala({
      keySala: chave.code,
      valorInicial: Number(values.valor),
      identificador: values.cor,
      nomeJogador: values.nome,
    })

      .then(() => {
        router.push(`/sala/${chave.code}`)
      })
      .catch((err) => {
        alert("preencha todos os campos")
      })

  }


  return (
    <BaseEasy  title={"Criar Jogador - Easy Imobiliário game"} sala={false} nav={"none"}>
      <Head>
      <Script id="Adsense-id" data-ad-client="ca-pub-5434892248042693"
          async strategy="afterInteractive"
          onError={(e) => { console.error('Script failed to load', e) }}
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5434892248042693"
        />
      </Head>
      <Titulo>Hora de Criar Jogador e Sala <Navigation href="#criarsala"><InfoIcon color="info" /></Navigation> </Titulo>
      {/* <SWRConfig value={{ fallback }}>
      <Article />
    </SWRConfig> */}

      <Form onSubmit={submit}>

        <TextField
          label="Valor inicial"
          value={values.valor}
          required
          onChange={handlenChange}
          name="valor"
          margin="normal"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          variant="standard"
        />

        <TextField
          id="standard-basic"
          value={values.nome}
          required
          onChange={handlenChange}
          name="nome"
          sx={{marginBottom: 5}}
          label="Nome"
          margin="normal"
          variant="standard" />
        <FormLabel id="demo-controlled-radio-buttons-group">Escolha seu icone</FormLabel>
        <RadioGroup

          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={values.cor}
          onChange={handlenChange}
        >
          <AvatarCores style={{ 'marginTop': '20px' }}>
            {cor.cores.map((cor) => (
              <Coress>

                <FormControlLabel
                  value={cor.identificador}
                  name="cor"
                  control={<Radio />}
                  label={<Image
                    width={80}
                    height={80}
                    src={`/avatar/${cor.identificador}.svg`} alt={''} />}
                  labelPlacement="top"
                />
              </Coress>

            ))}
          </AvatarCores>

        </RadioGroup>
        <p>Código da Sala: {chave.code}</p>
        <A
                    bgBotao="#22192c"
                    color="white"
                    href='/sala'
                    handleToggle={handleToggle}
                    onClick={submit}
                >
                    Criar sala
                </A>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
       
      </Form>

      <BoxTexto  id="criarsala">
        <SubTitulo style={{'marginTop': '3em'}}>Como criar a sala</SubTitulo>
        <Texto>
          <List>
            <ListItem>Selecione o valor inicial para cada jogador.</ListItem>
            <ListItem>Em alguns jogos recomenda-se a quantia inicial de 2.558.000.</ListItem>
            <ListItem>Selecione seu nome e sua cor.</ListItem>
            <ListItem>Clique novamente em criar sala para ir para a sala do jogo </ListItem>
            <ListItem><strong>Ao criar a sala você se tornará automaticamente o banco no jogo</strong></ListItem>
          </List>

        </Texto>

      </BoxTexto>
    </BaseEasy>
  );
}

