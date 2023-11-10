// import React from 'react'
// import './overall-list.scss'
// import { data } from '../../constants'

// const icons = [
//     <i className='bx bx-receipt'></i>,
//     <i className='bx bx-user'></i>,
//     <i className='bx bx-cube'></i>,
//     <i className='bx bx-dollar'></i>
// ]

// const OverallList = () => {
//     return (
//         <ul className='overall-list'>
//             {
//                 data.overall.map((item, index) => (
//                     <li className="overall-list__item" key={`overall-${index}`}>
//                         <div className="overall-list__item__icon">
//                             {icons[index]}
//                         </div>
//                         <div className="overall-list__item__info">
//                             <div className="title">
//                                 {item.value}
//                             </div>
//                             <span>{item.title}</span>
//                         </div>
//                     </li>
//                 ))
//             }
//         </ul>
//     )
// }

// export default OverallList


import styled from "styled-components";

const OverallList=()=>{
const flows=["HR Assistant", "HR chatbot","lorem ipsum","lorem ipsum"];

return <Wrapper>
    <div className="searchbox">
    <input type="text" placeholder="Name the flow"/>
    <button><i className='bx bx-plus'></i></button>
    </div>
    <ul>
        {
           flows.map((item,index)=>(
            <li key={index}>{item}</li>
           ))
        }
    </ul>
</Wrapper>
}
export default OverallList

const Wrapper=styled.div`
display:flex;
flex-direction:column;
row-gap:10px;
// background:#8624db;
border-radius:20px;
padding:10px;

.searchbox{
    display:flex;
    column-gap:5px;
    button{
        height:40px;
        width:50px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:50%;
        font-size:30px;
        border:none;
        background:orange;  
        color:white;
        font-weight:bold;
    }
}
input{
    width:100%;
    padding:10px;
    outline:none;
    font-size:17px;
    border:2px solid grey;
    font-weight:bolder;
    border-radius:10px;
}

li{
    font-weight:bold;
    font-family:sans-serif;
    margin-bottom:5px;
    padding:10px;
    background:#e1dae3;
    font-size:17px;
    border-radius:5px;
}

`