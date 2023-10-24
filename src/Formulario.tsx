import { useState, useEffect } from 'react'
import './App.css'
import { Slider } from './components/Slider'
import { Campo } from './components/Campo'
import { Apresentacao } from './components/Apresentacao'
import styled from 'styled-components'
import axios from 'axios'
import iLoading from './assets/icons/loading.svg'

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

    console.log(data)

    if(soma != 11){
      alert("Responda todas as perguntas.")
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

  const perguntas = [
    {
      id: 0,
      nomeAtributo: "pergunta1",
      pergunta: "Sinto que a instituição de ensino superior(IES) se interessa por mim."
    },
    {
      id: 1,
      nomeAtributo: "pergunta2",
      pergunta: "Sinto que a instituição de ensino superior(IES) demonstra atenção em relação a mim."
    },
    {
      id: 2,
      nomeAtributo: "pergunta3",
      pergunta: "Sinto que, se eu tivesse algum problema com a instituição de ensino superior(IES), ela estará sempre pronta para me ouvir."
    },
    {
      id: 3,
      nomeAtributo: "pergunta4",
      pergunta: "Sinto que, a instituição de ensino superior(IES) apesar de ter seus interesses próprios, leva em consideração o que é melhor para mim também."
    },
    {
      id: 4,
      nomeAtributo: "pergunta5",
      pergunta: "Eu compartilho informações abertamente com a instituição de ensino superior(IES), pois ela não irá tirar vantagem de mim."
    },
    {
      id: 5,
      nomeAtributo: "pergunta6",
      pergunta: "Eu não questiono as declarações deste prestador de serviços sobre sua competência."
    },
    {
      id: 6,
      nomeAtributo: "pergunta7",
      pergunta: "Eu não monitoro possíveis mudanças, como, por exemplo, mudanças econômicas ou na legislação, porque sei que a instituição de ensino superior(IES) não vai tirar vantagem destas mudanças."
    },
    {
      id: 7,
      nomeAtributo: "pergunta8",
      pergunta: "Dado o histórico de relacionamento com a instituição de ensino superior(IES), tenho bons motivos para acreditar nas informações fornecidas por ela."
    },
    {
      id: 8,
      nomeAtributo: "pergunta9",
      pergunta: "Dado o histórico de relacionamento com a instituição de ensino superior(IES), tenho bons motivos para duvidar da competência da instituição."
    },
    {
      id: 9,
      nomeAtributo: "pergunta10",
      pergunta: "Dado o histórico de relacionamento com a instituição de ensino superior(IES), não tenho motivos para duvidar de sua eficiência."
    },
    {
      id: 10,
      nomeAtributo: "pergunta11",
      pergunta: "A instituição de ensino superior(IES), constantemente se preocupa em manter seus serviços funcionando de maneira adequada."
    },
  ]

  const [soma, setSoma] = useState(0)
  function handleInputSliderValidate(hasMove: boolean){
    if(hasMove){
      setSoma(soma + 1);
    }
  }

  return (
    <>
      <Apresentacao />
      <form onSubmit={(e)=>handleSubmited(e)}>
        <Campo nome='nome'/>
        {
          perguntas.map((pergunta)=>(

            <Slider
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