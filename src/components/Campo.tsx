import { useState } from 'react'
import '../css/range.less'
import styled from 'styled-components';

interface Props {
  nome: string,
  onEstudante: (value: number)=> void;
}
export function Campo({nome, onEstudante}: Props){
  const [checked, setChecked] = useState(0);
  const [valor, setValor] = useState("")
  function handleValor(e: React.ChangeEvent<HTMLInputElement>){
    const value = e.target.value
    setValor(value)
  }

  function handleRadios(value: number){
    if(value == 0){
      onEstudante(0)
    }else{
      onEstudante(1)
    }
  }

  function handleChecked() {
    if(checked == 0){
      setChecked(1);
      setValor("Anônimo");
    }else{
      setChecked(0)
      setValor("");
    }
  }
  return (
    <DivPrincipal> 
      <div>
        <div>
          <label htmlFor=""><strong>Escreva seu nome</strong></label>
          <CampoNome minLength={3} maxLength={32} onChange={handleValor} style={input1} type="text" name={nome} value={valor} placeholder='Fulano de tal' required />
        </div>

        <div>
          <label htmlFor=""><strong>Você está estudando em alguma instituição neste momento ?</strong></label>
          <div>
            <RowLabel>
              <input type="radio" name='isestudante' value={1} required onChange={()=> handleRadios(1)}/>
              <label> Sim</label>
            </RowLabel>
          </div>
      
          <div>
            <RowLabel>
              <input type="radio" name='isestudante' value={0} required onChange={()=> handleRadios(0)}/>
              <label> Não</label>
            </RowLabel>
          </div>
          
        </div>
        <hr style={{borderColor: '#ffffff7a'}}/>
        <div>
         
          <div>
            <RowLabel>
              <input type="checkbox" onChange={handleChecked} name='isanonimo' value={checked}/>
              <label><strong>Marque se desejar não se identificar</strong></label>
            </RowLabel>
          </div>
                   
        </div>
      </div>
    </DivPrincipal>
  )
}

const DivPrincipal = styled.div`
    margin-left: auto;
    margin-right: auto;
    background: #747bff;
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

const RowLabel = styled.div`
  display: flex;
  justify-content: start;
  input {
    margin: 0;
    padding-left: 8;
    padding-right: 8;
    padding-top: 8;
    padding-bottom: 8;
    background: rgb(50 51 51);
  }
`;
const input1: React.CSSProperties = {
 

}

const CampoNome = styled.input`
  border-radius: 6px;
  color: white;
  margin: 0;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  background: rgb(50 51 51);
  border: 2px solid #d7cafd;
  &:focus {
    outline: none;
    border: 2px solid #652cff;
  }
`