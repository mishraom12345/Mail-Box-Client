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
    const show= useSelector(state=>state.in.isRead)
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
    

    const handleclick = (id)=>{
        dispatch(inboxAction.setisread(id))
        console.log('clicked')
    }

    const deleteHandler = (id)=>{
        fetch(`https://mail-box-client-82bc8-default-rtdb.firebaseio.com/Email/${localStorage.getItem('email')}/Recieve.json`,{
          method:"DELETE",
          
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          if(res.ok){
            
              return res.json();
          }else{
              return res.json().then((data)=>{
                  if(data && data.error && data.error.message){
                      let errMessage = "Authentication Failed, " + data.error.message;
                      throw new Error(errMessage);
                  }
              })
          }
      }).then((data)=>{
            submitHandler()
        //setExpensesData((data) => [...data, expenses]);
        //alert('passward reset link send plz chechk email')
        //console.log(data);
      }).catch((err)=>{
        alert(err.message);
      })
    
      
    }
    
  return (

   
    
      <div>
        
  <Button variant='outline-info'><Link to ='/welcome'>Compose email</Link></Button>
        
  <div>
 
  
  {inboxdata.map((item,index)=>(
        
        <div key={index} style={{backgroundColor:'yellow' ,margin:'3%'}} onClick = {()=>handleclick(item.id)}>
             
          
           <p>
           {show&&<p>🔵</p>}
            From:{item.email}
            𝖘𝖚𝖇𝖏𝖊𝖈𝖙:{item.subject}{'   '}
                𝖒𝖊𝖘𝖘𝖆𝖌𝖊:{item.message}{'    '}
                <Button variant='danger' style={{float:'right'}} onClick = {()=>deleteHandler(item.id)}>Delete</Button>

            </p>
         
            <hr/>
            
            
        </div>
    ))}
  
  </div>
    </div>
    
  )
}

export default Inbox
  
 