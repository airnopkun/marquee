import React from 'react';
import './TextCrawl.css';

export default (props) => {
	const { content } = props;
	console.log(content);

	// let sliced = '{"book": [' + content.slice(1, -2) + '] }'
	//
	// console.log(sliced)
	//
	// let jsonPlz = JSON.parse(sliced)
	// console.log(jsonPlz)
	//content[0] = "["
	//content[-1] = "]"
	//console.log(content)
	//const a = JSON.parse(this.props.content)
	//console.log(a)
	//console.log(typeof a)
	let paragraphs = content.map(paragraph => {
		return(
			<pre>
				{`${paragraph}`}
			</pre>
		)
	})
	return (
		<div id="titles">
			<div id="titlecontent">
				{paragraphs}
			</div>
		</div>
	);
}
