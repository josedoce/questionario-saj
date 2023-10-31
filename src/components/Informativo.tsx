import '../css/range.less'
import styled from 'styled-components';

interface Props {
    hidden: boolean;
}

export function Informativo({hidden}: Props){
  return (
    <DivPrincipal style={{display: (hidden?'none':'')}}> 
      <h4>Sobre sua instituição que você estuda, responda as seguintes perguntas:</h4>
    </DivPrincipal>
  )
}

const DivPrincipal = styled.div`
    margin-left: auto;
    margin-right: auto;
    background: #03426c;
    width: 40%;
    border-radius: 8px;
    font-size: '12px';
    padding: 24px;
    margin-top: 16px;
    margin-bottom: 16px;
    >h4{
        text-align: justify;
    }

  @media only screen and (max-width: 768px) {
    &{
      width: 96%;
    }
  }
`
