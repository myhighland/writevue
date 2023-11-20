import { TrackOpType, TriggerOpType } from "./operations"
import { Track,trigger } from "./effects"
import { hasChange, isArray } from "@vue3/shared"
export function ref(target) {
    return createRef(target)
}

export function shallowRef(target) {
    createRef(target,true)
}

class RefImpl {
    public ___isRef: boolean = true //标识使用ref代理
    public _value
    constructor(public rawValue,public shallow) {
        this._value = rawValue //初始化的值
        this.shallow = shallow
    }

    //类的属性访问器 实现响应式 设置track 出发trigger
    get value() {
        Track(this,TrackOpType.GET,'value') //收集依赖
        return this._value
    }
    set value(newValue) {
        console.log(this.rawValue,newValue)
        if(hasChange(this.rawValue,newValue)) {
            //触发数据更新
            this.rawValue = newValue;
            this._value = newValue
            trigger(this,TriggerOpType.SET,'value',newValue)
        }
    }

}

function createRef(target,shallow=false) {
    return new RefImpl(target,shallow)
}

export function toRef(target,key) {
    return new ObejectRefImpl(target,key)
}

class ObejectRefImpl {
    public __v_isRef = true
    constructor(public target,public key) {

    }

    get value() {
        return this.target[this.key]
    }

    set value(newValue) {
        this.target[this.key] = newValue
        // trigger(this.target)
    }
}

export function toRefs(target) {
    let ret = isArray(target) ? new Array(target.length) : {}
    //遍历所有的属性 将对象中的每个属性变为ref
    for(let key in target) {
        ret[key] = toRef(target,key)
    }
    return ret
}