import { useEffect, useState } from 'react'
import styled from 'styled-components';
import '../css/range.less'
import emoji1 from '../assets/emojis/emj1.gif';
import emoji2 from '../assets/emojis/emj2.gif';
import emoji3 from '../assets/emojis/emj3.gif';
import emoji4 from '../assets/emojis/emj4.gif';
import emoji5 from '../assets/emojis/emj5.gif';
import emoji6 from '../assets/emojis/emj6.gif';
import emoji7 from '../assets/emojis/emj7.gif';
interface Props {
  nome: string,
  pergunta: string,
  onMove: (hasMoved: boolean)=> void;
}
export function Slider({nome, pergunta, onMove}: Props){
  const [hasMove, setHasMove] = useState(false)
  const [valor, setValor] = useState(4)
  const [emoji, setEmoji] = useState(emoji4);

  useEffect(()=>{
    onMove(hasMove)
  }, [hasMove])
  function handleValor(e: React.ChangeEvent<HTMLInputElement>){
    if(!hasMove){
      setHasMove(true)
    }
    const value = Number(e.target.value)
    setValor(value)
    switch (value) {
      case 1:
        setEmoji(emoji1)
        break;
      case 2:
        setEmoji(emoji2)
        break;
      case 3:
        setEmoji(emoji3)
        break;
      case 4:
        setEmoji(emoji4)
        break;
      case 5:
        setEmoji(emoji5)
        break;
      case 6:
        setEmoji(emoji6)
        break;
      case 7:
        setEmoji(emoji7)
        break;
    }
  }
  return (
    <DivPrincipal>
      <span style={{marginBottom: 12}}>Pergunta {nome.match(/\d+/g)}</span>
      <div style={div4}>
        <p>{pergunta}</p>
      </div>
      <div style={div3}>
        <span>Discordo <br/> Totalmente</span>
        <img width={48} src={emoji} alt="" />
        <span>Concordo <br/> Totalmente</span>
      </div>
      <div>
        <div style={div2}>
          <strong>1</strong>
          <strong>2</strong>
          <strong>3</strong>
          <strong>4</strong>
          <strong>5</strong>
          <strong>6</strong>
          <strong>7</strong>
        </div>
        <input required onChange={handleValor} style={input1} type="range" name={nome} min={1} max={7} id="" value={valor}  />
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
  font-size: 12px;
  padding: 24px;
  margin-top: 16px;
  margin-bottom: 16px;

  @media only screen and (max-width: 768px) {
    &{
      width: 96%;
    }
  }

  @media only screen and (max-width: 400px) {
    &{
      font-size: 9px;
    }
  }
`
const input1: React.CSSProperties = {
  margin: '0'
}


const div2: React.CSSProperties = {
  paddingLeft: 16,
  paddingRight: 16,
  display: 'flex',
  justifyContent: 'space-between',
}

const div3: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline'
}

const div4: React.CSSProperties = {
  textAlign: 'justify',
  background: '#ffffff',
  color: '#1c1c1c',
  borderRadius: 4,
  fontSize: '14px',
  paddingRight: '8px',
  paddingLeft: '8px',
  paddingTop: '2px',
  paddingBottom: '2px'
}