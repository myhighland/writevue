import { ShapeFlags } from "@vue3/shared"

function setUpStateComponent(instance) {
    //需要对instance 的setup 参数及返回值进行判断
    //setup返回值是render函数的参数
    let component = instance.type
    let {setup} = component //若为组件 获取组件的setup 参数（props,context） 返回值（对象，函数）
    if(setup) {
        // setup()
        //处理参数
        let setupContext = createContext(instance)
        setup(instance.props,setupContext)
    }
}

function createContext(instance) {
    return {
       attrs:instance.attrs,
       slots:instance.slots,
       emit:()=>{},
       expose:()=>{}
    }
}
export const createComponentInstance = (vnode) => {
    const instance = {
        vnode,
        props:{},//组件属性
        attrs:{},//
        setupState:{},
        ctx:{},//代理上下文
        proxy:{},
        isMounted:false,//是否挂载
        type:vnode.type,
    }
    instance.ctx = {_:instance}
    return instance
}

export const setupComponent = (instance) => {
    //设置组件的值
    const {props,children} = instance.vnode
    instance.props = props
    instance.children = children //slot插槽
    //需要确认组件是否存在setup
    let isStateFul = instance.vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
    if(isStateFul){
        //有状态组件
        setUpStateComponent(instance)
    }
}

export const setupRenderEffect = ()=>{}