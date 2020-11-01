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

		axios.post('http://localhost:5000/conversion', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
			.then(response => {
				const paragraphs = response.data.body;
				const book = {
					"user_id": userID,
					"title": title,
					"content": paragraphs,
					"author": ""
				}
				axios.post('http://localhost:3001/addbook', book)
			})
			.then(response => {
				console.log(response)
			})
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

