import '../css/range.less'
import styled from 'styled-components';

export function Apresentacao(){
  return (
    <DivPrincipal> 
      <h4>Pesquisa de confiança do consumidor</h4>

      <Paragrafo>Está pesquisa tem como finalidade mensurar as confianças cognitiva, afetiva e comportamental com o objetivo de analizar os impactos em relação a lealdade entre alunos e a <strong>instituição de ensino superior</strong>.</Paragrafo>
      <p><strong>Entrevistador:</strong> SAJ consultoria</p>
    </DivPrincipal>
  )
}
const Paragrafo = styled.p`
  text-align: justify;
`
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

  @media only screen and (max-width: 768px) {
    &{
      width: 96%;
    }
  }
`
