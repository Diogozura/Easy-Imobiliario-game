import Image from 'next/image';
import react from 'react'
import { authService } from '../../../services/auth/authService';
import { Botao } from '../../../components/Botao';
import nookies from 'nookies'
import { SaldoFlag, BoxTrasnfere } from '../../../components/BoxJogador';
import { tokenService } from '../../../services/auth/tokenService';
import { AvatarCores, Coress, Form } from '../../../components/Icones';
import  React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'

import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { NumberFormatCustom } from '../../CriarSalaScreen';
import { toast } from 'react-toastify';
import Switchcase from './Switch';
import styled from 'styled-components'


const Name = styled.h3`
  margin: 0;
`

function success() {
  toast.success('🦄 transação Concluída!', {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function error() {
  toast.error('🦄 Error na Transação!', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}





export default function TransfereDinheiro({ data }, ctx = null) {
  const [isChecked, setChecked] = react.useState(true)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const childToParent = (childdata) => {
   
    setChecked(childdata);
  }

console.log('data', data)

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: '80%',
    }
  };

 



  const [values, setValues] = react.useState({
    user: '',
    valor: '',
  })
  function handlenChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    setValues((currenetValues) => {
      return {
        ...currenetValues,
        [fieldName]: fieldValue,
      }
    })
  }


  const user = () => {
    return (
      <AvatarCores key={data.idJogador}>
        <FormControlLabel
          name="user"
          value={data.idJogador}
          control={
            <Radio />}

          label={
            <>
              {data.playerBank ? <Image src={`/avatar/B${data.identificador}.svg`} width="80" height="80" alt={`${data.identificador}`} /> : <Image src={`/avatar/${data.identificador}.svg`} width="80" height="80" alt={`${data.identificador}`} />}
              <Name>{data.nomeJogador}</Name>
            </>
          }
          labelPlacement="top"
        />

      </AvatarCores>

    )
  }
  const banco = () => {
    return (
      <>
        <FormControlLabel
          name="user"
          value="0"
          
          control={
            <Radio />}

          label={<>
            <Image
              width={60}
              height={60}
              src={`/icon/Bancoicon.svg`} alt={'Banco'} />
            <Name>Banco</Name>
          </>
          }
          labelPlacement="top"
        />
      </>

    )
  }


  const handleCheck = () => {
    setChecked((preventState) => !preventState)
  }

  return (

    <BoxTrasnfere key={data.idPlayer} >

      <Botao onClick={handleOpen} variant="contained">Transferir</Botao>

      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Área PIX | user {isChecked ? data.namePlayer: "Banco"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <Form onSubmit={(event) => {
              event.preventDefault();
              authService.transfereDinheiro({
                idJogadorPara: parseInt(values.user),
                valor: parseInt(values.valor),
              })
                .then((res) => {
                  success()
                  setValues({
                    user: '',
                    valor: '',
                  })
                  setChecked(false)
                  handleClose()
                })
                .catch((err) => {
                  error()
                })


            }}>
              <FormControl variant="standard" >

              </FormControl>
              <TextField
                label="Valor inicial"
                value={values.valor}
                onChange={handlenChange}
                name="valor"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                variant="standard"
              />
              <FormLabel id="demo-controlled-radio-buttons-group">Escolha para quem será transferido </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={values.user}
                onChange={handlenChange}
              >
                <AvatarCores style={{ 'marginTop': '20px' }}>
                  {isChecked ?  banco(): user()}
                  {data.jogadores?.map((cor) => (
                    <Coress>

                      <FormControlLabel
                        name="user"
                        value={cor.id_jogador}
                        control={<Radio />}
                        label={<>
                          <Image
                            width={80}
                            height={80}
                            src={`/avatar/${cor.identificador}.svg`} alt={`${cor.identificador}`} />
                          <Name>{cor.nome_jogador}</Name>
                        </>}
                        labelPlacement="top"
                      />
                    </Coress>

                  ))}

                </AvatarCores>

              </RadioGroup>
              <Button type="submit" variant="outlined">enviar</Button>
            </Form>
          </Typography>
        </Box>
      </Modal>
      <div>
        {data.playerBank ? <SaldoFlag>
          <Image src='/icon/Bancoicon.svg' width="48" height="48" alt={`Banco`} />
          <Switchcase data={data} childToParent={childToParent}/>
        
        </SaldoFlag> : null}
      </div>


    </BoxTrasnfere>


  )
}
