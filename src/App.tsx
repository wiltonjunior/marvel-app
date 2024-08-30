import Header from './components/Header'
import { useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import { getAllCharacters } from './services/hosts'

function App() {
  const [count, setCount] = useState(0)

  const get = async () => {
    const {data} = await getAllCharacters({offset: 0, limit: 10})
    console.log(data)
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <>
    <Header></Header>
   
    </>
  )
}

export default App
