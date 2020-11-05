import React, { useState } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import SignIn from './views/SignIn/SignIn';
import Register from './views/Register/Register';
import Library from './views/Library/Library';
import { Router } from '@reach/router';
import TextCrawl from "./views/TextCrawl/TextCrawl";

const particleParams = {
	"particles": {
	  "number": {
	    "value": 43,
	    "density": {
	      "enable": true,
	      "value_area": 1736
	    }
	  },
	  "color": {
	    "value": "#e69a70"
	  },
	  "shape": {
	    "type": "star",
	    "stroke": {
	      "width": 0,
	      "color": "#000000"
	    },
	    "polygon": {
	      "nb_sides": 7
	    },
	    "image": {
	      "src": "img/github.svg",
	      "width": 100,
	      "height": 100
	    }
	  },
	  "opacity": {
	    "value": 0.5,
	    "random": false,
	    "anim": {
	      "enable": false,
	      "speed": 1,
	      "opacity_min": 0.1,
	      "sync": false
	    }
	  },
	  "size": {
	    "value": 1.8,
	    "random": true,
	    "anim": {
	      "enable": false,
	      "speed": 0,
	      "size_min": 0,
	      "sync": false
	    }
	  },
	  "line_linked": {
	    "enable": false,
	    "distance": 150,
	    "color": "#ffffff",
	    "opacity": 0.4,
	    "width": 1
	  },
	  "move": {
	    "enable": true,
	    "speed": 1.6,
	    "direction": "none",
	    "random": true,
	    "straight": false,
	    "out_mode": "out",
	    "bounce": false,
	    "attract": {
	      "enable": false,
	      "rotateX": 600,
	      "rotateY": 1200
	    }
	  }
	},
	"interactivity": {
	  "detect_on": "window",
	  "events": {
	    "onhover": {
	      "enable": false,
	      "mode": "repulse"
	    },
	    "onclick": {
	      "enable": false,
	      "mode": "push"
	    },
	    "resize": true
	  },
	  "modes": {
	    "grab": {
	      "distance": 400,
	      "line_linked": {
	        "opacity": 1
	      }
	    },
	    "bubble": {
	      "distance": 400,
	      "size": 40,
	      "duration": 2,
	      "opacity": 8,
	      "speed": 3
	    },
	    "repulse": {
	      "distance": 200,
	      "duration": 0.4
	    },
	    "push": {
	      "particles_nb": 4
	    },
	    "remove": {
	      "particles_nb": 2
	    }
	  }
	},
	"retina_detect": true
}

function App() {
	const [userID, setUserID] = useState(null);
	const [bookID, setBookID] = useState(null);

	/*componentDidMount() {
		fetch('http://localhost:3001/')
			.then(response => response.json())
			.then(console.log)
	}*/
	const onUserIDChange = (userID) => {
		setUserID(userID);
	}
	const onBookIDChange = (bookID) =>{
		setBookID(bookID);
	}

	return (
		<div id={"app"}>
			<Particles className={"particles"} params={particleParams} />
			<Router>
				<SignIn onUserIDChange={onUserIDChange} path={"/"} />
				<Register onUserIDChange={onUserIDChange} path={"/register"} />
				{/*need to add hamburger menu to all following views*/}
				<Library className={"library"} userID={userID} path={"/library"} onBookIDChange={onBookIDChange}/>
				<TextCrawl bookID={bookID} path={"/read"} />
				{/*<Profile />*/}
			</Router>
		</div>
	);
}

export default App;
