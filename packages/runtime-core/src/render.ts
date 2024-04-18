/**
 *  1.创建createApp 方法 =》 返回runtime-dom 
 */
import { ShapeFlags } from "@vue3/shared";
import { ApiCreateApp } from "./apiCreatApp"
import { createComponentInstance, setupComponent} from "./component";
import { effect } from "@vue3/reactivity";
export function createRender(renderOptionDom) { 
    function  setupRenderEffect(instance) {
        //创建effect 在effect中该调用render 执行render时会收集effect
        effect(function componentEffect() {
            if(!instance.isMounted) {
                let proxy = instance.proxy;
                let subTree = instance.render.call(proxy, proxy); //执行render 组件中创建渲染节点
                console.log(subTree);
            }
        })
    }
    const mountComponent = (InitialVnode,container) => {
        //组件渲染流程
        //1 先创建组件实例对象 render(proxy)
        const instance = InitialVnode.component = createComponentInstance(InitialVnode);
        //2 解析数据到这个实例对象中
        setupComponent(instance);
        //3 创建一个effect 让render函数执行
        setupRenderEffect(instance)

    }
    
    //组件创建
    const processComponent = (n1,n2,container) => {
        if(n1 == null) { //第一次加载
            mountComponent(n2,container);
        } else {
            //更新dom

        }
    }
    //实现渲染
    const patch = (n1,n2,container)=>{
        //n1 旧节点 n2当前节点 3 节点容器
        //针对不同类型 shapeflag 1 组件 2 元素
        let {shapeFlag} = n2;
        if(shapeFlag & ShapeFlags.ELEMENT) {
            //元素操作
        } else if(shapeFlag & ShapeFlags.COMPONENT) {
            //组件操作
            processComponent(n1,n2,container)
        }

    }
    let render = (vnode, container) => {
        //组件初始化 将vnode转为dom 
        //渲染 第一次生成dom
        patch(null, vnode, container)
    }
    return {
        createApp:ApiCreateApp(render) //创建vnode 在框架中 组件爱你操作 
    }
}

