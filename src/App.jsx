import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLangth] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) {
      str += "0123456789";
    }
    if (charAllow) {
      str += "!@#$%^&*()";
    }
    for (let i = 1; i <= length; i++) {
      let chr = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(chr)
    }

    setPassword(pass)


  }, [length, numAllow, charAllow, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 6);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenrator();
  }, [length, numAllow, charAllow, passwordGenrator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 py-8 my-20 text-white-500 bg-gray-700
      '>
        <h1 className='text-center text-white my-3 text-9 font-black '  >Password Genrator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4' >
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard} >Copy</button>

        </div>
        <div className='flex text-sm gap-x-2 '>
          <div className='flex items-center gap-x-1' >
            <input type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLangth(e.target.value) }}
            />
            <label> length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1' >
            <input type="checkbox"
              defaultChecked={numAllow}
              id='numberInput'
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1' >
            <input type="checkbox"
              defaultChecked={charAllow}
              id='charectorInput'
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
          </div>
          <label htmlFor="charectorInput">Charectors
          </label>
        </div>
      </div>
    </>
  )
}

export default App
