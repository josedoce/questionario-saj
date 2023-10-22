import { useState } from 'react'
import './App.css'
import { Formulario } from './Formulario'
import { BoasVindas } from './BoasVindas'
import { Agradecimento } from './Agradecimento'

function App() {
  const [page, setPage] = useState(0)

  return (
    <>
      {
        page == 0
        ? <BoasVindas onConfirm={()=> setPage(1)}/>
        : page == 1
        ?<Formulario onResponded={()=> setPage(2)} />
        :<Agradecimento />
      }
      <p style={{marginTop: 64}}>by: <a href="https://github.com/josedoce" target='_blank'>JS</a></p>
    </>
    
  )
}

export default App
