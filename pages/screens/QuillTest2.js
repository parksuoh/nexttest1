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

const QuillTest2 = () => {
    const quillRef = useRef();
    const [info, setInfo] = useState()
    const [value, setValue] = useState('');

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


    const textModfyList = [
        {id: "bold", text: "굵게"},
        {id: "italic", text: "이테릭"},
        {id: "underline", text: "밑줄"},
        {id: "strikethrough", text: "중간줄"},
        {id: "superscript", text: "제곱"},
        {id: "subscript", text: "밑수"},
        {id: "insertOrderedList", text: "숫자순서"},
        {id: "insertUnorderedList", text: "큰점순서"},
        {id: "justifyLeft", text: "왼쪽"},
        {id: "justifyCenter", text: "중앙"},
        {id: "justifyRight", text: "오른쪽"},
        {id: "justifyFull", text: "전체"},
    ]

    const fontList = [
        "Arial",
        "Verdana",
        "Times New Roman",
        "Garamond",
        "Georgia",
        "Courier New",
        "cursive",
    ];

    const fontSize = [
        1,
        2,
        3,
        4,
        5,
        6,
        7
    ];

    const modifyText = (command, defaultUi, value, e) => {
        e.preventDefault()
        document.execCommand(command, defaultUi, value);
    };

  return (
      <div className='flex flex-col w-full min-h-screen'>
        <TopHeader info={info} setInfo={setInfo} />
        <h1>퀼</h1>
        <div className='flex justify-between'>
            {textModfyList.map((itm) => (
                <button
                    onClick={(e)=> modifyText(itm.id, false, null, e)}
                >
                    {itm.text}
                </button>
            ))}
        </div>


        <div className='flex justify-between'>
            <button
                onClick={() => {
                    let img = document.createElement('img');
                    img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5A6LmUMUwUH_sSSaweGjDjJ1LrnDleVe1B8qOoGXa2A&s​';
                    img.width = 200;  
                    window.getSelection().getRangeAt(0).insertNode(img)
                }}
            >
                이미지
            </button>

            <button
                onClick={() => {
                    let sembed = '<video controls="true" src="http://localhost:4000/uploads/1/2210061546045843.mp4"></video>'
                    document.execCommand("Inserthtml", "", sembed);
                }}
            >
                동영상
            </button>

            <button
                onClick={() => {
                    let sembed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/TkH1iYwxLqk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                    document.execCommand("Inserthtml", "", sembed);
                }}
            >
                유튜브
            </button>
            <button
                onClick={() => {
                    let sembed = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.39753818046583!2d126.9173450186847!3d37.55547151574799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98db7e277319%3A0x718133b04fa29de5!2z67CU64uk7ZqM7IKs656RIDLtmLjsoJA!5e0!3m2!1sko!2skr!4v1668398869491!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    document.execCommand("Inserthtml", "", sembed);
                }}
            >
                지도
            </button>
            <button
                onClick={() => {
                    let sembed = '<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fjack%2Fstatus%2F20"></iframe>'
                    document.execCommand("Inserthtml", "", sembed);
                }}
            >
                트위터
            </button>
        </div>

        <div>
            <select
                onChange={(e) => {
                    document.execCommand('fontName', false, e.target.value);
                }}
            >
                {fontList.map((itm) => <option value={itm}>{itm}</option>)}
            </select>

            <select
                onChange={(e) => {
                    document.execCommand('fontSize', false, e.target.value);
                }}
            >
                {fontSize.map((itm) => <option value={itm}>{itm}</option>)}
            </select>
            <input 
                type="color" 
                onChange={(e) => {
                    document.execCommand('foreColor', false, e.target.value);
                }}
            />
            <input 
                type="color" 
                onChange={(e) => {
                    document.execCommand('backColor', false, e.target.value);
                }}
            />
        </div>

        <div>호환 잘안됨</div>
        <ReactQuill
            className="h-[500px]"
            forwardedRef={quillRef}
            theme="snow" 
            value={value} 
            onChange={setValue} 
        />


        <textarea
          value={value}
        />

        <MantineWrapper readOnly id="rte" value={value}  />

    </div>
  )
}

export default QuillTest2
