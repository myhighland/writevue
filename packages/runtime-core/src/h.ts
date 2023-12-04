import { isObject } from "@vue3/shared";
import { isVnode,createVnode } from "./vnode";

export function h(type,propsOrChildren,children) {
    const i = arguments.length; //获取参数个数

    if (i === 2) {
        //两个参数  元素+ 属性 或 元素+children
        if(isObject(propsOrChildren)) {
            if(isVnode(propsOrChildren)) {
                //h('div',h('div')) 处理子元素为vnode的情况
                return createVnode(type,null,[propsOrChildren]);
            }
            return createVnode(type,propsOrChildren);
        } else {
            return createVnode(type,null,propsOrChildren);
        }
    } else {
        //三个参数 元素+属性+子元素
        if(i > 3) {
            children = Array.prototype.slice.call(arguments,2);
        } else if(i === 3 && !isVnode(children)) {
            children = [children]
        }
        return createVnode(type,propsOrChildren,children);
    }
}