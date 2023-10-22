import styled from "styled-components"


export function Agradecimento() {
 
  return (
    <DivPrincipal>
      <h1>Muito obrigado!</h1>
      <h3>Você está nos ajudando muito.</h3>
      <Paragrafo>Nós da SAJ estamos em divida com você.</Paragrafo>
      
    </DivPrincipal>
    
  )
}

const Paragrafo = styled.p`
  text-align: justify;
`
const DivPrincipal = styled.div`
    margin-left: auto;
    margin-right: auto;
    background: #024470;
    border-radius: 8px;
    font-size: 12px;
    padding: 24px;
    margin-top: 16px;
    margin-bottom: 16px;

  @media only screen and (max-width: 768px) {
    &{
      width: 96%;
    }
  }
`