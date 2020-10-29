const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('knex')({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'joshuadou',
		password : '',
		database : 'marquee'
	}
});
const bookshelf = require('bookshelf')(db);
exports.bookshelf = bookshelf;
const { User } = require('./models');


const app = express();


// app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.json({extended: true}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.listen(3001, () =>{
	console.log('running on 3001')
});

app.get('/', (req, res) => {
	db.select('*').from('users').then(users => res.json(users))
	.catch(err => res.status(400).json('unable to get users'))
});

app.post('/signin', (req, res) => {
	db.select('email', 'password').from('users')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].password)
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('problem signing in'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err => res.status(400).json('wrong credentials'))
});

// app.post('/register', (req, res) => {
// 	let { email, name, password } = req.body;
// 	const hash = bcrypt.hashSync(password, 9);
// 	db.transaction(trx => {
// 		trx.insert({
// 			hash: hash,
// 			email: email
// 		})
// 		.into('login')
// 		.returning('email')
// 		.then(loginEmail => {
// 			return db('users')
// 			  	.returning('*')
// 				.insert({
// 			  		email: loginEmail[0],
// 			  		name: name,
// 			  		joined: new Date()
// 			  	}).then(user => {
// 			  		res.json(user[0]);
// 			  	})
// 		})
// 		.then(trx.commit)
// 		.catch(trx.rollback)
// 	})
//   	.catch(err => res.status(400).json('unable to register'));
// });

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password, 9);
	const now = Date.now();
	console.log(now)
	User.forge({
		email: email,
		name: name,
		password: hash
	}).save()
		.then((validated) => {
			console.log("user successfully added to database");
			console.log(validated);
		})
		.catch((err) => {
			console.log("you got an error")
			console.log(err.message);
		})
})

app.get('/profile/:user_id', (req, res) => {
	const { user_id } = req.params;
	console.log("inside /profile/:user_id");
  	db.select('*').from('books').where({
  		user_id: user_id
  	}).then(library => {
  		console.log(library);
  		if (library.length) {
  			console.log(library)
  			res.json(library);
  		} else {
  			res.status(200).json('user library empty')
  		}
  	})
  	.catch(err => res.status(400).json('error getting user library'))
});

app.post('/addbook', (req, res) => {
	console.log("req: \n", req)
	console.log("req.body: \n", req.body)
	// const { user_id, title, content, author } = req.body;
	// db('books')
	// 	.insert({
	//   		user_id: user_id,
	//   		title: title,
	//   		content: content,
	//   		author: author,
	// 		// created_at: new Date().getTime(),
	//   		// updated_at: new Date().getTime()
	//   	}).then(book => {
	//   		res.json(book);
	//   	})
	//   	.catch(err => res.status(400).json(err))
});

app.delete('/deletebook/', (req, res) => {
	const { bookID } = req.body;
	db('books').where("bookid", bookID)
	.del()
	.then(res.json('book deleted'))
	.catch(err => res.status(400).json('unable to delete book from library'))
});

app.get('/getbook/', (req, res) => {
	const { bookID } = req.body;
	db.select('content').from('books').where({
		bookid: bookID
	}).then(content => {
		res.json(content[0].content)
	})
	.catch(err => res.status(400).json("unable to get book"))
});

/*
/ --> res = this is working
/signin --> POST = succes/fail
/register --> POST = user
/profile/:userID --> GET = user
/addbook -->  POST = book
/deletebook --> DELETE = book
/getbook --> GET = book



Still need to make:
Library --> Empty page and card page
link to text crawl when book is clicked
back button in text crawl
*/


