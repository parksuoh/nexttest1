import { useEffect } from 'react';
import { useState } from 'react'
import TopHeader from '../../components/TopHeader';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import dynamic from 'next/dynamic'
import { useMemo, useRef } from 'react';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill');
  return function comp({ forwardedRef, ...props }) {
    return <RQ ref={forwardedRef} {...props} />;
  };
}, { ssr: false });


const MantineWrapper = dynamic(() => import('@mantine/rte'), {
  ssr: false,
});

const QuillTest = () => {
    const quillRef = useRef();
    const [info, setInfo] = useState()
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

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


    const apiPostNewsImage = async(formData) => {
      try {
        const res = await axios.post(
          'http://localhost:4000/api/board/post-image/',
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      )
  
        if(res.data.success === false) {
            return;
        } 
        return res.data.text
  
      } catch (e) {
        console.log(e)
      }      
    }


    const imageHandler = async () => {
      const input = document.createElement('input');
  
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      document.body.appendChild(input);
      
      input.click();
    
      input.onchange = async () => {
        const [file] = input.files;

        let formData = new FormData()
        formData.append("image", file)
        const res = await apiPostNewsImage(formData)
        
        if (res) {
          // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
          const range = quillRef.current.getEditorSelection();
          quillRef.current.getEditor().insertEmbed(range.index, 'image', res)
          quillRef.current.getEditor().setSelection(range.index + 1);
          document.body.querySelector(':scope > input').remove()
        }

      };
    }



    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, false] }],
          [{ 'font': [] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],   
          ['clean']
        ],
        handlers: { image: imageHandler }
      }
    }), []);


  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "vedio",
    "imageBlot",
    "color",
    "code-block",
    'align', 
    'background', 
  ];

    useEffect(() => {
        getAuth()
    }, [])

    useEffect(() => {
        console.log(value2)
    }, [value2])

  return (
      <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        <h1>퀼</h1>
        <ReactQuill
            className="h-[500px]"
            forwardedRef={quillRef}
            theme="snow" 
            modules={modules}
            formats={formats}
            value={value} 
            onChange={setValue} 
        />
        {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}

        <MantineWrapper readOnly id="rte" value={value}  />

        {/* <MantineWrapper 
          value={value2} 
          onChange={setValue2} 
          id="rte" 
        />
        <MantineWrapper readOnly id="rte" value={value2}  /> */}
    </div>
  )
}

export default QuillTest
