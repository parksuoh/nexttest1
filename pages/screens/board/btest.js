import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import Link from "next/link";

const btest = () => {
    const [imageSrc, setImageSrc] = useState('');

    const [source, setSource] = useState();

    const [imgdata, setImgdata] = useState();

    const [vdodata, setVdodata] = useState();

    const inputRef = useRef();

    const sendImage = async() => {
        let formData = new FormData()

        formData.append("imgdata", imgdata)


        try {
            const res = await axios.post(
                'http://localhost:4000/api/board/upload-image/',
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
            
            console.log(res)
    
        } catch (e) {
            console.log(e)
        }      
    }

    const sendVideo = async() => {
        let formData = new FormData()

        formData.append("vdodata", vdodata)


        try {
            const res = await axios.post(
                'http://localhost:4000/api/board/upload-video/',
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
            
            console.log(res)
    
        } catch (e) {
            console.log(e)
        }      
    }


    const handleImg = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImgdata(file)
            setImageSrc(reader.result);
            resolve();
          };
        });
      };
  
  
    const handleVdo = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise((resolve) => {
          reader.onload = () => {
            setVdodata(file)
            setSource(reader.result);
            resolve();
          };
        });
      };
    
      const handleChoose = (event) => {
        inputRef.current.click();
      };

  return (
    <div>
        <Link href="/screens/board/list">
            <a>리스트 이동</a>
        </Link>
        <div>
          <h2>이미지 미리보기</h2>
          <input 
            type="file" 
            onChange={handleImg} 
          />
          <div>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </div>
          <div
            onClick={() => setImageSrc('')}
          >
            사진 지우기
          </div>
        </div>
        <div>
          <h2>동영상 미리보기</h2>
          <input
            ref={inputRef}
            className="VideoInput_input"
            type="file"
            onChange={handleVdo}
            accept=".mov,.mp4"
          />
          {!source && <button onClick={handleChoose}>Choose</button>}
          {source && (
            <video
              className="VideoInput_video"
              width="100%"
              controls
              src={source}
            />
          )}
          <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
          <div
            onClick={() => setSource()}
          >
            동영상 지우기
          </div>
        </div>

        <div
            onClick={() => sendImage()}
        > 
            사진 업로드 
        </div>
        <div
            onClick={() => sendVideo()}
        > 
            동영상 업로드 
        </div>
    </div>
  )
}

export default btest
