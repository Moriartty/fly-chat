import {insertAtCursor,encodeFace} from '../utils/index';
import * as React from 'react';

interface CompProps {
    className:string,
    onKeyDown:any
}

const EditableContent = React.forwardRef((props:CompProps,ref:any) => {
    const {className,onKeyDown} = props
    // let contentRef:any = React.createRef();
    /**
     * 粘贴时去除文本的样式
     * @param e
     */
    function handlePaste(e:any) {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        insertAtCursor(document.createTextNode(text), e.target);
    }
    /**
     * 在当前光标位置插入节点元素
     * @param element
     */
    // function insertAtCursor(element:any){
    //     insertAtCursor(element, contentRef.content);
    // }

    /**
     * 获取值
     * @returns {*}
     */
    function getValue(){
        let content=ref.current.innerHTML;
        if(content){
            content = encodeFace(content);
            //去掉HTML标签，不用在意大于、小于符号会被替换，因为已经被转义了
            content = content.replace(/<.+?>/g, '');
            //转换空格
            content = content.replace(/&nbsp;/g, ' ');
            return content;
        }
        return '';
    }

    /**
     * 清空内容
     */
    function clear(){
        ref.current.innerHTML='';
    }
    return <div ref={ref}
        className={className}
        onKeyDown={onKeyDown}
        onPaste={handlePaste}
        contentEditable></div>
})



export default EditableContent;