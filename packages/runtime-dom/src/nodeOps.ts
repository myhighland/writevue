//节点操作

export const nodeOps = {
    //创建元素 createElement 运行时操作dom 
    createElement:tagName=>{
        return document.createElement(tagName);
    },
    remove:child=>{
        const parent = child.parentNode;
        if(parent){
            parent.removeChild(child);
        }
    },
    insert:(child,parent,ancher=null)=>{
        //插入
        parent.insertBefore(child,ancher);//ancher = null 相当于appendelement
    },
    querySelector:select=>document.querySelector(select),
    setElemntText:(el,text)=>el.textContent = text,
    //节点 文本
    createText:text=>document.createTextNode(text),
    setText:(node,text)=>node.nodeVale=text,
    
}