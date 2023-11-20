import { isFunction } from "@vue3/shared";
import { effect } from "./effects";
export function computed(getterOrOptions) {
    // 1.函数 2.对象
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions;
        setter = () => {
            console.warn('computed value must be readonly');
        }
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
}

class ComputedRefImpl {
    public _dirty = true;
    public _value;
    public effect
    constructor(getter, public setter) {
        this.effect = effect(getter, {
            lazy: true, sch: () => {
                if (!this._dirty) {
                    this._dirty = true;
                }
            }
        });
    }

    get value() {
        //获取执行
        if (this._dirty) {
            this._value = this.effect()
            this._dirty = false;
        }
        return this._value;
    }

    set value(newValue) {
        if (this.setter) {
            this.setter(newValue);
        }
    }
}