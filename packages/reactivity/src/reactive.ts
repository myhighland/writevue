import { isObject } from "@vue3/shared"
import { reactiveHandler,shallowReactiveHandler,readonlyHandler,shallowReadonlyHandler } from './baseHandlers'


export function reactive(target) {
    return createReactObj(target,false,reactiveHandler)
}

export function shallowReactive(target) {
    return createReactObj(target,false,shallowReactiveHandler)
}

export function readonly(target) {
    return createReactObj(target,true,readonlyHandler)
}

export function shallowReadonly(target) {
    return createReactObj(target,true,shallowReadonlyHandler)
}

//创建代理的map
const reactiveMap = new WeakMap() //key 必须是对象 自动垃圾回收
const readonlyMap = new WeakMap()
//实现代理
function createReactObj(target,isReadonly,baseHandler) {
    //proxy target对象
    if(!isObject(target)) {
        return target;
    }
    //核心 
    const proxyMap = isReadonly ? readonlyMap : reactiveMap
    const proxyEs = proxyMap.get(target)
    if(proxyEs) {
        //防止target被多重代理
        return proxyEs
    }
   
    const proxy = new Proxy(target,baseHandler)
    proxyMap.set(target,proxy)
    return proxy
    
}
// 4个方法 是否只读 是否深度遍历
// 核心使用proxy 科里化 根据不同参数