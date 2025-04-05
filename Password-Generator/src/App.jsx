import { useState, useEffect, useCallback, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+="0123456789"
    if (characterAllowed) str+="!@#$%^&*()_+"

    for(let i=1;i<=length;i++){
      const char= Math.floor(Math.random() * str.length)
      pass += str.charAt(char);
    }

    setPassword(pass)
  }, [length, numberAllowed, characterAllowed,setPassword])

  const copyToClipBoard= useCallback( () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() =>{
    passwordGenerator()
  }, [length,numberAllowed,characterAllowed,passwordGenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-2xl font-bold text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg  overflow-hidden mb-4'>
        <input
        type='text' value={password} className='w-full outline-none px-3 py-1'placeholder='Password'
        readOnly ref={passwordRef}></input>
        <button onClick={copyToClipBoard} className='bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0'>Copy</button>  
      </div>
      <div className='flext text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={80} value={length} className='cursor-pointer'onChange={(e)=>{setLength(e.target.value)}} ></input>
          <label >Length : {length}</label>
        <div className='flex items-center gap-x-1'>
          <input
           type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={() =>{
            setNumberAllowed((prev) => !prev);
           }}></input>
           <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type='checkbox' defaultChecked={characterAllowed} id='charInput' onChange={() =>{
            setCharacterAllowed((prev) => !prev);
           }}></input>
           <label htmlFor='numberInput'>Characters</label>
        </div>
      </div>  
      </div>      
     </div>
    </>
  )
}

export default App
