import  {useState,useMemo,useEffect,useRef} from 'react'
// initData : [{stateKey:'count',setStateName:'setCount',initState:0}]
export function constructor(initData){
    const initDate = useRef({
        state:{},
        setState:{}
    })
    initData.map(item=>{
        [initDate.current.state[item['stateKey']], initDate.current.setState[item['setStateName']]] = useState(item.initState);
    })
    return initDate.current;
}

 // fn   在comopnentDidMount的时候会执行这个函数
export function componentDidMount(fn){
    useEffect(()=>{
        fn();
    },[])
}

//fn   在componentWillReceiveProps的时候会执行这个函数 默认形参:preProps，nextProps
//props 只需把组件的props传进来
export function componentWillReceiveProps(fn,props){
    const propRef = useRef(props);
    useMemo(()=>{
        fn(propRef.current,props);
        propRef.current = props;
    },[...Object.values(props)])
}

// fn componentWillUnmount
export function componentWillUnmount(fn){
    useEffect(()=>{
        return fn
    },[])
}