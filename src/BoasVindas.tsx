import styled from "styled-components"

interface A {
  onConfirm: ()=> void
}

export function BoasVindas(props: A) {
  
  return (
    <DivPrincipal>
      <h1>Bem vindo!</h1>
      <h3>Você poderia responder nossa pesquisa ?</h3>
      <Paragrafo>Somos uma consultoria, a SAJ. Estamos precisando de pessoas para responder ao nosso questionario.</Paragrafo>
      <h4>Não se preocupe, não demora!</h4>
      <button onClick={props.onConfirm}>Vamo lá</button>
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
    width: 40%;
    border-radius: 8px;
    font-size: '12px';
    padding: 24px;
    margin-top: 16px;
    margin-bottom: 16px;

  @media only screen and (max-width: 768px) {
    &{
      width: 96%;
    }
  }
`