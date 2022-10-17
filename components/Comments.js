import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";


const Comments = ({id, info}) => {
    const [cmtList, setCmtList] = useState([])
    const [cocmtList, setCocmtList] = useState({})

    const [cmtText, setCmtText] = useState('')
    const [cocmtText, setCocmtText] = useState('')
    const [cocmtTextSel, setCocmtTextSel] = useState(-1)

    const getComments = useCallback(async() => {
        try {
            const res = await axios.post('http://localhost:4000/api/board/get-comments/', {id})

            if(res.data.success === false) {
                return;
            } 

            let cmt = []
            let cocmt = {}

            res.data.lists.forEach(itm => {
                if(itm['PRNT_COMT_CD'] === 0) {
                  cocmt[itm['COMT_CD']] = []
                  cmt.push(itm)
                }
            })

            res.data.lists.forEach(itm => {
                if(itm['PRNT_COMT_CD'] !== 0) {
                    cocmt[itm['PRNT_COMT_CD']].push(itm)
                }
            });
            setCmtList(cmt)
            setCocmtList(cocmt)


            } catch (e) {
              console.log(e)
            }   
    }, [id])

    useEffect(() => {
        if(id){
            getComments()
        }

    }, [id])

    const writeComment = async(text, prnt) => {
      if (text === '') return

      try {
          const res = await axios.post('http://localhost:4000/api/board/write-comment/', {boardCd: id, boardCont: text, uid: info.uid, prntComtCd: prnt})

          if(res.data.success === false) {
              return;
          } 

          setCmtText('')
          setCocmtText('')
          getComments()

          } catch (e) {
            console.log(e)
          }   
  }


  return (
    <div>
        댓글컴포넌트
      {cmtList && cmtList.map((itm, idx) => (
          <Cmt
            key={idx} 
            itm={itm}
            child={cocmtList[itm['COMT_CD']]}
            cocmtText={cocmtText}
            setCocmtText={setCocmtText}
            cocmtTextSel={cocmtTextSel}
            setCocmtTextSel={setCocmtTextSel}
            writeComment={writeComment}
          />
      ))}
      <input
          type="text"
          onChange={(e)=> setCmtText(e.target.value)}
          value={cmtText}
          placeholder="댓글입력"
      />
      <button
        onClick={() => writeComment(cmtText, 0)}
      >
        댓글입력
      </button>
    </div>
  )
}


const Cmt = memo(({itm, child, cocmtText, setCocmtText, cocmtTextSel, setCocmtTextSel, writeComment}) => {
    return (
      <div>
        <h3
          onClick={() => setCocmtTextSel(itm['COMT_CD'])}
        >
          댓글
        </h3>
        <h4>글 : {itm['BOARD_CONT']}</h4>
        <h4>아이디 : {itm['UID']}</h4>
        {child && child.map((item, idx) => (
          <Cocomt 
            key={idx}
            item={item}
            setCocmtTextSel={setCocmtTextSel}
          />
        ))}
        {cocmtTextSel === itm['COMT_CD'] && (
          <>
          <input
            type="text"
            onChange={(e)=> setCocmtText(e.target.value)}
            value={cocmtText}
            placeholder="대댓글입력"
          />
          <button
            onClick={() => writeComment(cocmtText, itm['COMT_CD'])}
          >
            대댓글입력
          </button>
          </>
        )}

      </div>
    )
})

const Cocomt = memo(({item, setCocmtTextSel}) => {
    return (
      <div>
        <h3
          onClick={() => setCocmtTextSel(item['PRNT_COMT_CD'])}
        >
          대댓글
        </h3>
        <h4>글 : {item['BOARD_CONT']}</h4>
        <h4>아이디 : {item['UID']}</h4>
      </div>
    )
})

export default Comments
