
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { Suspense } from 'react';
import './App.css';

const Home = React.lazy(() => import('./routes/Home'));

const About = React.lazy(() => import('./routes/About'));


function App() {
  return (
   <Router>
    <Suspense fallback={<div>Loading...</div>}>
    	<div id='menu'>
		<Link to="/">Home</Link>
		<Link to="/about"> about </Link>
		</div>
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route path="/about" component={About}/>
		</Switch>
    </Suspense>
  </Router>
  );
}

export default App;