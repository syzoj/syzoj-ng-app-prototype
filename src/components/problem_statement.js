import React, { Component } from 'react'
import Markdown from 'react-markdown'
import MathJax from 'react-mathjax2'
import htmlParser from 'react-markdown/plugins/html-parser'
import RemarkMathPlugin from 'remark-math'

const Math = (props) => {
  console.log(props)
  return <MathJax.Node inline={props.inline}>{typeof(props.children) == 'string' ? props.children : props.children.join('')}</MathJax.Node>
}

const ProblemStatement = (props) => {
  let renderers = {
    math: (props) =>
      <MathJax.Node>{props.value}</MathJax.Node>
    ,
    inlineMath: (props) =>
      <MathJax.Node inline>{props.value}</MathJax.Node>
  }
  return <div>
    <MathJax.Context input="tex" script="/MathJax-2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
      <div>
        <Markdown source={props.children} plugins={[RemarkMathPlugin]} renderers={renderers} />
      </div>
    </MathJax.Context>
  </div>
      //<Markdown source={props.children} escapeHtml={false} renderers={renderers} plugins={[parseHtml]} />
}

export default ProblemStatement
