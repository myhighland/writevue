import { ApiCreateApp } from "./apiCreatApp"
export function createRender(renderOptionDom) { //实现渲 
    //实现渲染
    let render = (vnode, container) => {

    }
    return {
        createApp:ApiCreateApp(render)
    }
}
