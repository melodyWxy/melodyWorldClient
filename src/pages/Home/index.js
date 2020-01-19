import React from 'react'
import Markdown from 'react-markdown';
import styles from './index.module.css';

 
function Home(props){
    const { homeMd = '' } = props;  
    return (
        <>
            <div className={styles.mdwrap}>
                <Markdown 
                    escapeHtml = {false}
                    source = {
`# Melody World

<br>

<blockquote>MW(Melody World) 是一个前端知识开源学习社区。</blockquote>
<blockquote>这个社区目前主要的内容以作者(melodyWxy)技术栈为核心辐射出的学习内容，并且在不断的更新当中。</blockquote>
<blockquote>假如你从某篇笔记或者某个课程里学到了一些东西，你一定不会吝啬点一个赞——这也是作者的初衷，将己身的所学所知开源共享，而从中收获哪怕只是简单的一个认可。</blockquote>

<br>

## MW的特点

> #### MW具备以下特点: 

<br>


> 1. 全栈内容响应式UI
>
<blockquote>
  你可以看到，无论你对窗体进行怎样的放大缩放，整个UI都是响应式的。
  MW甚至没有专门为移动端定制样式，但它天然支持移动端，这得益于全站内容响应式UI设计;
</blockquote>

<br>

> 2. 全栈内容存储:
>
<blockquote>
  在网络优化这一块，由于全栈CDN加速的代价是昂贵的(对于个人开发者而言),尤其是关于课程视频流的传输。
  为此，在客户端应用到indexDB这门技术。这有效减少了S端和OSS端的负载量，同时给用户带来极佳的体验。
</blockquote>

<br>

>3. 全栈内容懒加载: 
>
<blockquote>
得益于代码分割+React.lazy,你可以注意到，所有页面都是独立打包并懒加载进来，包括页面里的某些内容。 
</blockquote>

<br>

>4. 极简式设计风格: 
>
<blockquote>
好吧，本站并没有UI设计，但好在antd提供了强大的ui能力——尽管本站里没有得到太好的体现。
</blockquote>

<br>

> #### 关于MW具体的实现思想，你可以访问下面这个链接。

>>[melodyWorldClient](https://github.com/melodyWxy/melodyWorldClient)

<br>

## 概述

<br>

<blockquote>
  概述页里是关于当前选定模块的概述，它有可能是对这门技术的一个笼统的描述，也可能含有一些独到的见解或者经验之谈。
无论如何，阅读它你会知道有关它课程的核心和重点。 
</blockquote>

<br>

## 博客

<br>

<blockquote>
通常，博客知识点与课程是一一对应的，因此建议你跟着课程里的桌面视频去学习它。
</blockquote>
  
<br>  

## 课程

<br>

<blockquote>
作者录制好的原创桌面视频，是用了一定时间雕琢出的MW核心内容，也希望大家在跟进之余能够推荐给身边的人。
</blockquote>
  
<br>  

## 共同建设

<br>

<blockquote>
MW客户端的代码本身也是开源的，如果你对这个社区的建设有更好的建议，请在 [此链接处](https://github.com/melodyWxy/melodyWorldClient/issues) 提issue，作者会尽量保证最快时间响应。
最后，祝你的前端之路一帆风顺。
</blockquote>
  
<br>  `
}/>
            </div>
        </>
    )
}

// const NHome = connect(Home);
 
export default Home;

