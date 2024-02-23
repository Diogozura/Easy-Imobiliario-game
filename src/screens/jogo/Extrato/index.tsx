import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Button } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import nookies from "nookies";

const Extrator = styled.th`
  background: ${(props) => props.theme};
  padding: 10px;
  border-radius: 20px;
  margin: 0.2em 0;
  text-align: center;
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Extrato(ctx = null) {
  const cookie = nookies.get(ctx);

  const { data, error } = useSWR(
    `https://fonidaiane.pythonanywhere.com/easyBankImobiliario/api/extrato?keySala=${cookie.chave}`,
    fetcher,
    { refreshInterval: 3000 }
  );

  const [isChecked, setChecked] = React.useState(true);

  if (error) return <div>erro no extrato</div>;
  if (!data) return <div>carregando extrato</div>;

  const conteudo = data?.extrato?.map((dadosjogador) => (
    <Extrator
      key={dadosjogador.id}
      theme={
        dadosjogador.idJogadorPara === cookie.Player
          ? "rgba(195, 255, 195, 0.75)"
          : dadosjogador.idJogadorDe === cookie.Player
          ? "rgba(255, 195, 195, 0.75)"
          : null
      }
    >
      {dadosjogador.descricao}
    </Extrator>
  ));

  const handleCheck = () => {
    setChecked((prevState) => !prevState);
  };

  return (
    <>
      <style jsx>{`
        table {
          text-align: center;
          margin: 2em auto;
        }
        tbody {
          display: block;
          overflow-y: auto;
          height: 290px;
        }
        tr {
          display: grid;
          background-color: azure;
          border-radius: 20px;
        }
      `}</style>
      <table id="Extrato">
        <tbody>
          <tr>
            <Button onClick={handleCheck}>
              {" "}
              Extrato {isChecked ? <ListIcon /> : <FilterListOffIcon />}
            </Button>
            {isChecked ? conteudo?.slice(0, 5) : conteudo}
          </tr>
        </tbody>
      </table>
    </>
  );
}
