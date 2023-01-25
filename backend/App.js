import React,{useEffect,useState} from 'react'

function App(){
    const [backendData,setBackendData]= useState([{}])

    useEffect(()=>{
        fetch("/api").then(
            res=>res.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )
    },[])

    return(
        <div>
            {(typeof backendData.users === 'undefined ')?(
                <p>Loading..Please Wait!</p>

            ): (
                backendData.users.map((user,i)=>(
                    <p key={i}>{user}</p>
                ))
            )}
        </div>
    )

}