
import {useRef} from 'react';
import ReactDom from 'react-dom';
import { useComponentDidMount,useComponentWillUnmount } from './../../utils/lifeHooks';

// 基于react - Portals 的弹窗
// Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

/**
 *  @props
 *      dom :  dom  挂载节点
 *      children :  any  插槽   弹窗里的内容
 */

export default function PortalModal(props){
    const {dom, children} = props;
    const parent = dom || document.body;
    const DOMRef = useRef(document.createElement('div'));

    useComponentDidMount(()=>{
        parent.appendChild(DOMRef.current);
    })

    useComponentWillUnmount(()=>{
        parent.removeChild(DOMRef.current);
    })
    return ReactDom.createPortal(
        children,
        DOMRef.current
    )


}
