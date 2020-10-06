import React, { useEffect } from 'react';
import './Empty.css';
import DragAndDrop from '../DragAndDrop/DragAndDrop';
import { navigate } from "@reach/router";

export default (props) => {
	const { userID, handleFiles } = props;
	let fileInput = React.createRef();
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		id: this.props.id
	// 	};
	// 	this.fileInput = React.createRef();
	// }
	useEffect(() => {
		if(userID === null){
			navigate("/");
		}
	}, [userID]);
	// const handleFiles = () => {
	// 	console.log("inside handleFiles")
	// 	let file = fileInput.current.files[0];
	// 	const title = file.name.slice(0, -4);
	// 	const formData = new FormData();
	// 	formData.append('', file);
	//
	// 	fetch('http://localhost:5000/conversion', {
	// 		mode: 'cors',
	// 		method: 'post',
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Access-Control-Allow-Origin': 'http://localhost:3000'
	// 		},
	// 		body: formData
	// 	})
	// 	.then(response => {
	// 		console.log(response)
	// 		const reader = response.body.getReader();
	// 		return new ReadableStream({
	// 			start(controller) {
	// 				return pump();
	// 				function pump() {
	// 					return reader.read().then(({ done, value }) => {
	// 						// When no more data needs to be consumed, close the stream
	// 						if (done) {
	// 							controller.close();
	// 							return;
	// 						}
	// 						// Enqueue the next data chunk into our target stream
	// 						controller.enqueue(value);
	// 						return pump();
	// 					});
	// 				}
	// 			}
	// 		})
	// 	})
	// 	.then(stream => new Response(stream))
	// 	.then(response => {
	// 		//console.log(response)
	// 		response.blob()
	// 			.then(blob => {
	// 				blob.text()
	// 					.then(text => {
	// 						console.log(text)
	// 						let content = text.slice(1, -1) //.split('ispeaktoyouinriddlesbecausethatshowtheworldspeakstome')
	// 						console.log(content)
	// 						fetch('http://localhost:3001/addbook', {
	// 							method: 'post',
	// 							headers: {'Content-Type': 'application/json'},
	// 							body: JSON.stringify({
	// 								user_id: userID,
	// 								title: title,
	// 								content: content,
	// 								author: ""
	// 							})
	// 						}).then(response => response.json())
	// 							.catch()
	// 					})
	// 			})
	// 	})
	// 	/*.then(blob => {
	// 		console.log(blob)
	// 		blob.text()
	// 		.then(text => {
	// 			const content = text.slice(1, -2)
	// 			fetch('http://localhost:3001/addbook', {
	// 				method: 'post',
	// 				headers: {'Content-Type': 'application/json'},
	// 				body: JSON.stringify({
	// 					ownerid: this.state.id,
	// 					title: title,
	// 					content: content,
	// 					author: ""
	// 				})
	// 			}).then(response => response.json())
	// 		})
	// 	})*/
	// }

	return (
		<DragAndDrop handleDrop={handleFiles}>
			<div>
				<form className="my-form">
					<h1 className="f-headline lh-solid mt7">
					¯\_(ツ)_/¯
					</h1>
					<p className="f3 lh-copy">Library is empty.</p>
					<p className="f3 lh-copy">Drag and drop or select TXT files to add to library</p>
					<input
						ref={fileInput}
						type="file"
						id="fileElem"
						multiple
						accept=".txt"
						onChange={() => handleFiles(fileInput)}
					/>
					<label className="button" htmlFor="fileElem">Select files</label>
				</form>
			</div>
		</DragAndDrop>
	);
}
