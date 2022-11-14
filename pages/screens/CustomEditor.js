import { useEffect } from 'react';
import { useState } from 'react'
import TopHeader from '../../components/TopHeader';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from 'sanitize-html';

const CustomEditor = () => {
    const [info, setInfo] = useState()
    const [html, setHtml] = useState('<p> </p>')
    const [editable, setEditable] = useState(true)

    const sanitizeConf = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
      allowedAttributes: { a: ["href"] },
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/],
          'font-size': [/^\d+(?:px|em|%)$/]
        },
        'p': {
          'font-size': [/^\d+rem$/]
        }
      }
    };

    const handleChange = e => {
      setHtml(e.target.value);
    };

    const sanitize = e => {
      setHtml(sanitizeHtml(html, sanitizeConf));
    };

    const toggleEditable = () => {
      setEditable(!editable)
    };

    const getAuth = async() => {
        try {
          const res = await axios.get('http://localhost:4000/api/user/auth/', { withCredentials: true })
    
          if(res.data.success === false) {
              return;
          } 
          setInfo(res.data)
    
        } catch (e) {
          console.log(e)
        }      
    };

    useEffect(() => {
        getAuth()
    }, [])

  return (
    <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        <div>커스텀 에디터</div>
        <div className='flex justify-between'>
          <EditButton cmd="italic" />
          <EditButton cmd="bold" />
          <EditButton cmd="formatBlock" arg="h1" name="heading" />
          <EditButton
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="hyperlink"
          />
          <button onClick={toggleEditable}>
            Make {editable ? "readonly" : "editable"}
          </button>
          <EditButton cmd="left" arg="left" />
          <EditButton cmd="center" arg="center" />
          <EditButton cmd="right" arg="right" />
        </div>


        <ContentEditable
          className="editable"
          tagName="pre"
          html={html} // innerHTML of the editable div
          disabled={!editable} // use true to disable edition
          onChange={handleChange} // handle innerHTML change
          // onBlur={sanitize}
        />
        <h3>source</h3>
        <textarea
          className="editable"
          value={html}
          onChange={handleChange}
          onBlur={sanitize}
        />
        <h3>actions</h3>

    </div>
  )
}

const EditButton = (props) => {
  return (
    <button
      key={props.cmd}
      onMouseDown={e => {
        e.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

export default CustomEditor
