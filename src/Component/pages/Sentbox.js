import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { sentboxAction } from '../../store/Sentboxslice'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

function Sentbox() {
    const emaildata = useSelector(state=>state.sent.sentbox)
    const dispatch = useDispatch()
  
       const submitHandler = ()=>{
        fetch(`https://mail-box-client-82bc8-default-rtdb.firebaseio.com/Email/${localStorage.getItem('email')}/sent.json`).then((res)=>{
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
            dispatch(sentboxAction.setsenbox(myarr))
    
            
        }).catch((err)=>{
            alert(err.message)
        })



         
       }

       useEffect(()=>{
        submitHandler()
       },[])
    
    
  return (

   
    
      <div>
    <h2>Sentbox</h2>   
    {emaildata.map((item,index)=>(
        <div key={index} style={{backgroundColor:'yellow' ,margin:'3%'}}>
            <p>
            𝐓𝐨:{item.email}{'   '}
            𝖘𝖚𝖇𝖏𝖊𝖈𝖙:{item.subject}{'   '}
                𝖒𝖊𝖘𝖘𝖆𝖌𝖊:{item.message}{'    '}

            </p>
            <hr/>
            
            
        </div>
    ))}
    </div>
    
  )
}

export default Sentbox
