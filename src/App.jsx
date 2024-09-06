import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(()=>{
    let pwd = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) {
      str+= "0123456789"
    }
    if (character) {
      str+= "~!@#$%^&*(){}[]?><;'\|"
    }

    for (let index = 1; index <= length; index++) {
      let charindex = Math.floor(Math.random()*str.length+1);
      pwd += str.charAt(charindex)
      
    }

    setPassword(pwd)
  },
   [length, number, character, setPassword])


  const passwordRef = useRef(null) 

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  }, [password])

   useEffect(()=>{
    passwordGenerator()
   }, [length, character, number, passwordGenerator])
  
  return (
    <>
    <div className='w-full, max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8
   text-orange-300 bg-gray-700'>
    <h1 className='text-white text-center my-3'>
      Password Generator
    </h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-4'
      placeholder='Password'
      ref={passwordRef}
      readOnly
      />
      <button onClick={copyPasswordToClipboard} 
      className='outline-none w-20 bg-blue-600 text-white py-1.5 px-0.5 shrink-0'>Copy</button>
    </div>
       <div  className='flex text-sm gap-x-2'>
       <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={ (e)=>{
          setLength(e.target.value)
        }}
         />
         <label >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={character}
          onChange={() => {
            setCharacter((prev) => !prev)
          }}
           name=""
          id="" />
          <label htmlFor="charInput">Character</label>
        </div>
        </div> 
    </div>
    </>
   
  )
}

export default App
