import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
function InboxDeatil() {
    const inboxdata = useSelector(state=>state.in.inbox)
    const param = useParams()
    const message = inboxdata.find(item=>item.id===param.id)
    console.log(message)
  return (
    <div style={{alignContent:'center',margin:'3%'}}>
       【﻿Ｓｕｂｊｅｃｔ】 : 
      <h2 style={{color:'blue'}}>
        
        {message.subject}
       
      </h2>
      Ƒɾօʍ:
      <h6 >
         {message.email}
      </h6>
      𝓜𝓮𝓼𝓼𝓪𝓰𝓮:<p>{message.message}</p>
    </div>
  )
}

export default InboxDeatil
