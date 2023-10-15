import { isObject } from "@vue3/shared"
import { reactive,readonly } from "./reactive"

const get = /*#__PURE__*/ createGetter()
const shallowGet = /*#__PURE__*/ createGetter(false, true)
const readonlyGet = /*#__PURE__*/ createGetter(true)
const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true)


const set = /*#__PURE__*/ createSetter()
const shallowSet = /*#__PURE__*/ createSetter(true)

const reactiveHandler = {
    get,
    set
}
const shallowReactiveHandler = {
    get:shallowGet,
    set:shallowSet
}
const readonlyHandler = {
    get:readonlyGet,
    set:(target,key,value) => {
        console.log('set on key is failed')
    }
}
const shallowReadonlyHandler = {
    get:shallowReadonlyGet,
    set:(target,key,value) => {
        console.log('set on key is failed')
    }
}

//柯里化


function createGetter(isReadonly = false,shallow = false) {
    return function get(target,key,receiver) {
        const res = Reflect.get(target,key,receiver);//proxy 需要使用relect实现具体操作
        if(!isReadonly) {
            //收集依赖
        }
        if(shallow) {
            return res;
        } else {
            if(isObject(res)) {
                return isReadonly ? readonly(res) : reactive(res)
            }
        }
        return res;
    }
}

function createSetter(shallow = false) {
    return function set(target,key,value,receiver) {
        const result = Reflect.set(target,key,value,receiver) //获取到最新的值
        
        return result;
    }
}

export {
    reactiveHandler,shallowReactiveHandler,readonlyHandler,shallowReadonlyHandler
}