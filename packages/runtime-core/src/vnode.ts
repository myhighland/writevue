//创建vnode 1.createVnode和h()作用一样 需要区分是组件还是元素

export const createVnode = (type,props,children=null)=> {
    // console.log(rootComponent,rootProps)

    //区分 是组件还是元素
    let shapeFlag
    const vnode = {
        _v_isVnode:true,//是一个vnode节点
        type,
        props,
        children,
        key:props && props.key,//diff
        el:null,//dom和vnode对应
        shapeFlag
    }
    
    return vnode;
}