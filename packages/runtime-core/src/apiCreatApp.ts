
import { createVnode } from "./vnode";
export function ApiCreateApp(render) {
    return function createApp(rootComponent, rootProps) { //获取需要渲染的组件和属性
        let app = {
            //添加相关属性
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            mount(container) {
                // console.log(container, rootComponent, rootProps, renderOptionDom)
                //创建vnode 渲染 根据组件创建vnode
                let vnode = createVnode(rootComponent, rootProps);
                render(vnode,container)
                app._container = container
            }
        }
        return app
    }
}