import React, {useEffect, useState} from 'react';
import './Library.css';
import Empty from '../../components/Empty/Empty';
// import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import Modal from '../../components/Modal/Modal';
import TextCrawl from '../TextCrawl/TextCrawl'
import { navigate } from "@reach/router";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import axios from 'axios';

export default (props) => {
	let modalRef = React.createRef();
	const [books, setBooks] = useState([]);
	const { userID } = props;

	useEffect(() => {
		if(userID === null){
			navigate("/");
		}
		console.log(userID);
		// fetch(`http://localhost:3001/profile/${userID}`, {
		//    method: 'get',
		//    headers: {'Content-Type': 'application/json'},
		// })
		// .then(response => response.json())
		axios.get(`http://localhost:3001/profile/${userID}`)
			.then(response => {
				console.log(response)
				if(response.data === 'user library empty' || response.data === 'error getting user library') {
					//books should be empty array
					console.log(books)
				}
				else {
					const userBooks = []
					console.log(response);
					response.data.forEach(bk => {
						// const content = JSON.parse(bk.content);
						const content = bk.content;
						console.log(content);
						userBooks.push({title: bk.title, content: content});
					})
				setBooks(userBooks);
				}
			})
	}, [books])

	const handleFiles = (fileInput) => {
		let file = fileInput.current.files[0];
		const title = file.name.slice(0, -4);
		const formData = new FormData();
		formData.append('', file);

		// fetch('http://localhost:5000/conversion', {
		// 	mode: 'cors',
		// 	method: 'post',
		// 	headers: {
		// 		'Accept': 'application/json',
		// 		'Access-Control-Allow-Origin': 'http://localhost:3000'
		// 	},
		// 	body: formData
		// })
		axios.post('http://localhost:5000/conversion', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => {
				const paragraphs = response.data.body;
				const bookForm = new FormData();
				bookForm.append('user_id', userID);
				bookForm.append('title', title);
				paragraphs.forEach((p) => {
					bookForm.append('content', p)
				})
				// bookForm.append('content', paragraphs);
				bookForm.append('author', "")
				console.log(paragraphs)
				axios.post('http://localhost:3001/addbook', bookForm)
				// axios({
				// 	method: 'post',
				// 	url: 'http://localhost:3001/addbook',
				// 	data: {
				// 		user_id: userID,
				// 		title: title,
				// 		content: paragraphs,
				// 		author: ""
				// 	}
				// })
			})
			// .then(response => {
			// 	const reader = response.data.body.getReader();
			// 	return new ReadableStream({
			// 		start(controller) {
			// 			return pump();
			// 			function pump() {
			// 				return reader.read().then(({ done, value }) => {
			// 					// When no more data needs to be consumed, close the stream
			// 					if (done) {
			// 						controller.close();
			// 						return;
			// 					}
			// 					// Enqueue the next data chunk into our target stream
			// 					controller.enqueue(value);
			// 					return pump();
			// 				});
			// 			}
			// 		}
			// 	})
			// })
			// .then(stream => new Response(stream))
			// 	.then(response => response.blob())
			// 		.then(blob => {
			// 			blob.text()
			// 				.then(text => {
			// 					let content = text.slice(1, -1);
			// 					let contentArr = content.split(`\\\\r\\\\n'",`);
			// 					for(let i=0; i<contentArr.length; i++){
			// 						contentArr[i] = contentArr[i].slice(5, contentArr[i].length);
			// 					}
			// 					console.log(content);
			// 					console.log(contentArr);
			// 					fetch('http://localhost:3001/addbook', {
			// 						method: 'post',
			// 						headers: {'Content-Type': 'application/json'},
			// 						body: JSON.stringify({
			// 							user_id: userID,
			// 							title: title,
			// 							content: contentArr,
			// 							author: ""
			// 						})
			// 					}).then(book => setBooks([...books, book]))
			// 						.catch(err => console.log(err))
			// 				})
			// 		})
		}
	const openModal = () => {
		modalRef.current.openModal()
	};
	let titles = []
	books.forEach(book => {
		titles.push(book.title)
	})
	let cards = books.map((book) => {
		console.log(book)
		return (
			<span>
				<span className='tc bg-green dib br3 pa4 ma2 grow bw2 shadow-5' onClick={openModal}>{book.title}</span>
				<Modal ref={modalRef}>
					<TextCrawl content={book.content}/>
					<button onClick={() => modalRef.current.close()}>
						Close Modal
					</button>
				</Modal>
		   </span>
		)
	});
	return (
		<div>
		{titles.length === 0
			? (
				<div>
					<HamburgerMenu />
					<Empty handleFiles={handleFiles} id={userID}/>
				</div>
				)
			: (
				<div>
					<HamburgerMenu />
					{/*<DragAndDrop handleDrop={handleFiles}>*/}
						<div>
							<span id='card-container'>{cards}</span>
						</div>
					{/*</DragAndDrop>*/}
				</div>

			)
		}
		</div>
	);
}

