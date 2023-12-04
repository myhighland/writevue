import { hasOwn } from "@vue3/shared";

export const componentPublicInstantce = {
    get({_:instantce},key) {
        if(key[0] == '$') {
            return;
        }
      //获取值 props,children data
      const {props,data,setupState} = instantce;
        if(hasOwn(props,key)) {
            return props[key];
        }  else if(hasOwn(data,key)) {
            return data[key];
        } else if(hasOwn(setupState,key)) {
            return setupState[key];
        }
    },
    
    set(target,key,value) { 
        const {props,data,setupState} = target;
        if(hasOwn(props,key)) { 
            props[key] = value;
        } 
        
        else if(hasOwn(data,key)) {
            data[key] = value;
        } 
        else if(hasOwn(setupState,key)) {
            setupState[key] = value;
        }
    }
    
}