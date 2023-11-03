import './App.css';
import React, { useState,useEffect,useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

import hljs from 'highlight.js';
import 'highlight.js/styles/codepen-embed.css';



function App() {
  const [code, setcode] = useState('');
  const [output,setoutput]= useState('');
  const [input, setinput] = useState('');

  const textareaRef = useRef();

  const handle = async()=>{
    const load = {
      language:'cpp',
      code,
      input
    }
    const {data} = await axios.post("http://localhost:5000/run",load);
    // console.log(output);
    setoutput(data.stdout);  
  }
  useEffect(() => {
    hljs.highlightElement(textareaRef.current);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Code-IO
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <textarea ref={textareaRef}className='code-editor' spellcheck="false" rows={30} cols={110} value={code} 
      onChange={(e) => {
        setcode(e.target.value);
      }}></textarea>
      <br />
      <button onClick={handle}>Submit</button>
      <h2>Output</h2>
      <textarea className='output' rows={5} cols={5} value={output}></textarea>
      <h2>Input</h2>
      <textarea className='output' rows={5} cols={5} value={input}
      onChange={(e) => {
        setinput(e.target.value);
      }}></textarea>



    </>
  )
}

export default App;

