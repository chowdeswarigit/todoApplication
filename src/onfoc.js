import React, { useState } from 'react'

function Onfoc() {

    const [count , setCount ] = useState(0)

    const handler = ()=>{

        setCount(count+1)
    }
   return (
    <div>
      <h1>{count}</h1>

      <button onFocus={handler}>click me</button>
    </div>
  )
}

export default Onfoc
