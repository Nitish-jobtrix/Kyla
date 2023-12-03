import {useState,useEffect}  from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import {toast} from "react-toastify"
import { useDispatch } from 'react-redux';
import { createJobTypeAction } from '../redux/actions/jobTypeAction';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500px", 
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2,
 
};

export default function BasicModal({setFlag,edit,catId,catName}) {
    const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [category,setCategory]=useState("");
  const handleOpen = () =>{
    if(catName) setCategory(catName);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

const handleSubmit=async(e)=>{
e.preventDefault();
try {
    if(category===""){
    toast.error("category is required");
    }
    else{
        if(!edit){
        await dispatch(createJobTypeAction({jobTypeName:category}));
        setCategory("");
        }
        else{
            const url=`api/type/update/${catId}`
           
            const res=await axios.put(url,{jobTypeName:category});
            toast.success("category updated successfully!");
        }
        handleClose();
        setFlag((prevFlag) => !prevFlag);
    }
} catch (error) {
    toast.error("some eror occurred!");
    console.log(error);
}

}

  return (
    <div>
      {!edit ?<button className='bright_gradient' style={{color:"white",fontWeight:"bold"}} onClick={handleOpen}>Create Category</button>:
       <span onClick={handleOpen} style={{cursor:"pointer"}}><i style={{fontSize:"20px"}} className='bx bxs-edit-alt' ></i></ span>
}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p onClick={handleClose} style={{textAlign:"right",cursor:"pointer"}}><IoMdClose /></p>
         {edit ? <h2>Edit a Category</h2>:<h2>Create a Category</h2>}
        <FormContainer onSubmit={handleSubmit}>
        
          <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category Name' />
          <button type='submit' className='gradient'>{!edit?"Create Category":"Edit Category"}</button>
        </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}

const FormContainer=styled.form`
display:flex;
flex-direction:column;
margin-top:20px;
input{
  width:100%;
  padding:15px 10px;
  border:none;
  background:#f6ecff;
  outline:none;
  margin-bottom:20px;
}

button{
    font-weight:bold;
    letter-spacing:1px;
}
`
