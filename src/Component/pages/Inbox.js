import React from 'react'
import { useState } from 'react'
import { inboxAction } from '../../store/InboxSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { json, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Inbox() {
    const history  = useNavigate()
    const dispatch = useDispatch()
    const inboxdata = useSelector(state=>state.in.inbox)
    const show= useSelector(state=>state.in.isRead)
    console.log(inboxdata)


    
    const submitHandler = ()=>{

        

       const interval = setInterval(()=>{
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
                    message:data[i].message,
                    show:data[i].show


                })
            }
            
            //console.log(data)
            console.log(myarr)
            dispatch(inboxAction.setinbox(myarr))
    
            
        }).catch((err)=>{
            alert(err.message)
        })

       

       },4000)

        return ()=>clearInterval(interval)
       }

    
      

       useEffect(()=>{
        submitHandler()
       },[])
    

    const handleclick = (id)=>{
        fetch(`https://mail-box-client-82bc8-default-rtdb.firebaseio.com/Email/${localStorage.getItem('email')}/Recieve/${id}.json`,{
            method:"PATCH",
            body:JSON.stringify({
                show:false
            }),
            
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

              //dispatch.inboxAction(show)
          //setExpensesData((data) => [...data, expenses]);
          //alert('passward reset link send plz chechk email')
          //console.log(data);
        }).catch((err)=>{
          alert(err.message);
        })

        history(`/inbox/${id}`)

    }

    const deleteHandler = (id)=>{
        fetch(`https://mail-box-client-82bc8-default-rtdb.firebaseio.com/Email/${localStorage.getItem('email')}/Recieve/${id}.json`,{
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
        <h2>inbox</h2>
  <Button variant='outline-info'><Link to ='/welcome'>Compose email</Link></Button>
        
  <div>
 
  
  {inboxdata.map((item)=>(
    
   <div>
     <div key={item.id} style={{backgroundColor:'yellow' ,margin:'3%'}}>
             
     <Button variant='danger' style={{float:'right' ,marginBottom:'400%'}} onClick = {()=>deleteHandler(item.id)}>Delete</Button>
             <p  onClick = {()=>handleclick(item.id)}>
             {item.show&&<p>🎀</p>}
             【F】【r】【o】【m】:{item.email}
              
                  
         
              </p>
              
              <hr/>
             
              
          </div>
         
   </div>
  
        
    ))}
  
  </div>
    </div>
    
  )
}

export default Inbox
  
 