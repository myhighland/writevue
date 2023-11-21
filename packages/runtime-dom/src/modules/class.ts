
export const patchClass = (el,value)=>{
    if(value == null) {
        value = ''
    } 
    //对这个标签的class赋值 如果没有值 则类名为空 否则使用新值
    el.className = value
}