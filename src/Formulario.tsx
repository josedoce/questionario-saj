import { useState, useEffect } from 'react'
import './App.css'
import { Slider } from './components/Slider'
import { Campo } from './components/Campo'
import { Apresentacao } from './components/Apresentacao'
import styled from 'styled-components'
import axios from 'axios'
import iLoading from './assets/icons/loading.svg'
import { Informativo } from './components/Informativo'
import perguntas from './assets/perguntas.json'

interface F extends EventTarget {
  nome: HTMLInputElement;
  isestudante: HTMLInputElement;
  isanonimo: HTMLInputElement;
  
  pergunta1: HTMLInputElement;
  pergunta2: HTMLInputElement;
  pergunta3: HTMLInputElement;

  pergunta4: HTMLInputElement;
  pergunta5: HTMLInputElement;
  pergunta6: HTMLInputElement;

  pergunta7: HTMLInputElement;
  pergunta8: HTMLInputElement;
  pergunta9: HTMLInputElement;

  pergunta10: HTMLInputElement;
  pergunta11: HTMLInputElement;
  
}

interface PropsF {
  onResponded: ()=> void;
}

export function Formulario(props: PropsF) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState("00:00")
  const [tempoInicio, setTempoInicio] = useState("");
  
  useEffect(()=>{
    setTempoInicio(new Date().toLocaleTimeString("pt-br"))
   
    var totalSeconds: number = 0;
    setInterval(setTime, 1000);

    function setTime() {
      ++totalSeconds;
      let s = pad(totalSeconds % 60);
      let m = pad(parseInt(String(totalSeconds / 60)));
      setCount(m+":"+s)
    }

    function pad(val: number) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  },[])

  function handleSubmited(e: React.FormEvent<HTMLFormElement>){
    setIsLoading(true)
    e.preventDefault()
    e.stopPropagation();
    

    const {
      nome,
      isanonimo,
      isestudante,
      pergunta1,
      pergunta2,
      pergunta3,
      pergunta4,
      pergunta5,
      pergunta6,
      pergunta7,
      pergunta8,
      pergunta9,
      pergunta10,
      pergunta11,
     } = e.target as F


    const data = {
      nome: nome.value,
      isanonimo: isanonimo.value,
      isestudante: isestudante.value,
      pergunta1: pergunta1.value,
      pergunta2: pergunta2.value,
      pergunta3: pergunta3.value,
      pergunta4: pergunta4.value,
      pergunta5: pergunta5.value,
      pergunta6: pergunta6.value,
      pergunta7: pergunta7.value,
      pergunta8: pergunta8.value,
      pergunta9: pergunta9.value,
      pergunta10: pergunta10.value,
      pergunta11: pergunta11.value,
      temporesposta: "00:"+count, //isso resolve o erro de formatação no excel
      tempoInicio: tempoInicio,
      tempoFinal: new Date().toLocaleTimeString("pt-br") 
    }

    

    if(soma != 11){
      alert("Responda todas as perguntas.")
      setIsLoading(false)
    }else{
      axios.post("https://diuzep.shop/api/salvar_questionario", data)
      .then((_: any)=>{
        props.onResponded()
      }).catch((_)=>{
        setIsLoading(false)
        alert("Tente enviar de novo")
      })
      
    }
  }

  const [soma, setSoma] = useState(0)
  const [exibirPerguntas, setExibirPerguntas] = useState(false);
  function handleInputSliderValidate(hasMove: boolean){
    if(hasMove){
      setSoma(soma + 1);
    }
  }
  function handleEstudante(value: number){
    if(value == 0){
      setExibirPerguntas(true)
      setSoma(11)
    }else{
      setExibirPerguntas(false)
      setSoma(0)
    }
  }
  return (
    <>
      <Apresentacao />
      <form onSubmit={(e)=>handleSubmited(e)}>
        <Campo nome='nome' onEstudante={handleEstudante}/>
        <Informativo hidden={exibirPerguntas} />
        {

          
            perguntas.map((pergunta)=>(

              <Slider
                hidden={exibirPerguntas}
                onMove={handleInputSliderValidate}
                key={pergunta.id}
                pergunta={pergunta.pergunta}
                nome={pergunta.nomeAtributo} />
            ))
        }
        <LoadingContainer>
         {
          isLoading 
          ? <img src={iLoading} width={64} height={64}/> 
          : <button name='submitbutton' type='submit'>responder pesquisa</button>
         }  
        </LoadingContainer>
      </form>
    </>
    
  )
}


const LoadingContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  >button, img {
    margin-left: auto;
    margin-right: auto;
  }
  >img {
    user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`;