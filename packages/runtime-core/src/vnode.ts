import { ShapeFlags, isArray, isObject, isString } from "@vue3/shared";
//创建vnode 1.createVnode和h()作用一样 需要区分是组件还是元素 h('div',{style:{color:red}},children)
//为了兼容h函数 使用下面的方法创建vnode
export const createVnode = (type,props,children=null)=> {
    // console.log(rootComponent,rootProps)

    //区分 是组件还是元素
    let shapeFlag = isString(type) ? ShapeFlags.ELEMENT : isObject(type) ? ShapeFlags.STATEFUL_COMPONENT : 0;//标识元素或组件
    const vnode = {
        _v_isVnode:true,//是一个vnode节点
        type,
        props,
        children,
        key:props && props.key,//diff
        el:null,//dom和vnode对应
        shapeFlag,
        component:{}
    }
    //给children 添加标记
    normalizeChildren(vnode,children);
    
    return vnode;
}

export const isVnode = (vnode)=> {
    //判断是否是虚拟dom
    return vnode._v_isVnode;
}

function normalizeChildren(vnode,children) {
    let type = 0;
    if(children === null){

    } else if(isArray(children)){
        //数组
        type = ShapeFlags.ARRAY_CHILDREN
    } else {
        //文本
        type = ShapeFlags.TEXT_CHILDREN
    }
    vnode.shapeFlag |= type;
}   