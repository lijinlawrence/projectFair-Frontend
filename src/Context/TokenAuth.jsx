import React, { createContext, useState } from 'react'

export const tokenAuthorizationContext= createContext()

const TokenAuth = ({children}) => {
    const [isAuthorized,setIsAuthorized] = useState(false)
  return (
    <>
<tokenAuthorizationContext.Provider value={{isAuthorized,setIsAuthorized}}>
    {children}
</tokenAuthorizationContext.Provider>
    </>
  )
}

export default TokenAuth