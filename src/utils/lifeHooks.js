import  {useState,useMemo,useEffect,useRef,useLayoutEffect} from 'react';

// 屠龙术 - 宇宙加强版仿生命周期自定义hooks；


// initStateObj : {}    =>   相当于类组件里初始化的state;
export function useConstructor(initStateObj = {}){
    const initState =  {};
    const setStateApis = {};
    const initStateKeys = Object.keys(initStateObj);
    initStateKeys.map(function useMapState(item){
        [
            initState[item],
            setStateApis[item]
        ] = useState(initStateObj[item]);
    })
    const stateRef = useRef(initState);
    
    const setState = (targetState = {},callback)=> {
        const targetKeys = Object.keys(targetState);
        targetKeys.map( key => {
            //判断是否初始化过，如果没有，则不能直接更新;
            const initItem = initStateKeys.find(item=>item===key);
            if(initItem === null){
                throw new Error(`
                    不支持更新没有初始化过的state:${key},
                    请在useConstructor的时候初始state:${key}
                `);
            }
            setStateApis[key](targetState[key]);
            stateRef.current[key] = targetState[key];
        })

        callback && callback(stateRef.current);
    }

    return {
        state: stateRef.current,
        setState
    };
}



 // fn   在comopnentDidMount的时候会执行这个函数
export function useComponentDidMount(fn){
    useEffect(fn,[])
}

//fn   在componentWillReceiveProps的时候会执行这个函数 默认形参:preProps，nextProps
//props 只需把组件的props传进来
export function useComponentWillReceiveProps(fn,props){
    const propRef = useRef(props);
    useMemo(()=>{
        fn(propRef.current,props);
        propRef.current = props;
    },Object.values(props))
}

// fn componentWillUnmount
export function useComponentWillUnmount(fn){
    useLayoutEffect(()=>{
        return fn
    },[])
}