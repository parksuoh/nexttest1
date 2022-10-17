import React, { memo, useCallback, useEffect, useRef } from 'react'

const AutoSizeText2 = memo(({value, onChange, onKeyDown, readOnly}) => {
    const textAreaRef = useRef(null);

    const resizeTextArea = useCallback(() => {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [textAreaRef.current?.style.height])

    useEffect(resizeTextArea, [value]);

    return (
        <textarea
            className='p-0.5 resize-none overflow-y-hidden border-0 w-full'
            ref={textAreaRef}
            value={value}
            onChange={onChange} 
            onKeyDown={onKeyDown}
            rows={1}
            readOnly={readOnly}
            disabled
        />
    );
})

export default AutoSizeText2