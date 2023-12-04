import { ShapeFlags, isFunction, isObject } from "@vue3/shared"
import {componentPublicInstantce} from "./componentPublicInstantce"

function setUpStateComponent(instance) {
    //代理
    instance.proxy = new Proxy(instance.ctx, componentPublicInstantce as any)

    //需要对instance 的setup 参数及返回值进行判断
    //setup返回值是render函数的参数
    let component = instance.type
    let {setup} = component //若为组件 获取组件的setup 参数（props,context） 返回值（对象，函数）
    if(setup) {
        // setup()
        //处理参数
        let setupContext = createContext(instance)
        let setupResult = setup(instance.props,setupContext)
        handlerSetupResult(instance,setupResult) //如果是对象 将值放在setupstate中 如果是函数render 则执行
    } else {
        //没有setup 调用render
        finishComponentState(instance)
    }

    //render
    // component.render(instance.proxy)
}

function handlerSetupResult(instance,setupResult) {
    if(isFunction(setupResult)) {
        instance.render = setupResult //setup 返回的函数 保存到实例上
    } else if(isObject(setupResult)) {
        instance.setupState = setupResult
    }
    finishComponentState(instance)
}

//处理render
function finishComponentState(instance) {
    //判断是否存在render
    let component = instance.type;
    if(!instance.render) {
        //模板转换成render
        if(!component.render && component.template) {

        }
        instance.render = component.render
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
        render:false,
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

