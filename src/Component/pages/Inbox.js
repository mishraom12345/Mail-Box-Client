import React from 'react'
import { useState } from 'react'
import { inboxAction } from '../../store/InboxSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Inbox() {
    const dispatch = useDispatch()
    const inboxdata = useSelector(state=>state.in.inbox)
    console.log(inboxdata)
    
    const submitHandler = ()=>{
        fetch(`https://mail-box-client-82bc8-default-rtdb.firebaseio.com/Email/${localStorage.getItem('email')}/Recieve.json`).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    if(data && data.error && data.error.message){
                        let errMessage = "Authentication Failed, " + data.error.message;
                        throw new Error(errMessage);
                    }
                })
            }
        }).then((data)=>{
            const myarr = []
    
            for(let i in data){
                myarr.unshift({
                    id:i,
                    email:data[i].email,
                    subject:data[i].subject,
                    message:data[i].message

                })
            }
            
            //console.log(data)
            console.log(myarr)
            dispatch(inboxAction.setinbox(myarr))
    
            
        }).catch((err)=>{
            alert(err.message)
        })



         
       }

       useEffect(()=>{
        submitHandler()
       },[])
    
    
  return (

   
    
      <div>
        <Button variant='outline-info'><Link to ='/welcome'>Compose email</Link></Button>
         
    {inboxdata.map((item,index)=>(
        <div key={index} style={{backgroundColor:'yellow' ,margin:'3%'}}>
            <p>
            From:{item.email}
            𝖘𝖚𝖇𝖏𝖊𝖈𝖙:{item.subject}{'   '}
                𝖒𝖊𝖘𝖘𝖆𝖌𝖊:{item.message}{'    '}

            </p>
            <hr/>
            
            
        </div>
    ))}
    </div>
    
  )
}

export default Inbox
  
 