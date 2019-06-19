import { h, Component } from 'preact';
import style from './style';

export default class About extends Component {


	// Note: `user` comes from the URL, courtesy of our router
	render() {

		return ( 
			<div class={style.about} >
				<h1>Volons Monitor Preact WebApp</h1>
				<p>This webapp is a "Getting Started" monitor application for Volons: Open source Internet of Drones Plateform.</p>
				<h2>Dependencies</h2>
				<ul>
					<li>Preact CLI: <a href="https://preactjs.com/">https://preactjs.com/</a></li>
					<li>Volons: <a href="https://www.volons.fr">npm install volons</a></li>
				</ul>
				<h2>Licence MIT</h2>
				<pre>
					MIT License<br/>
					<br/>
					Copyright (c) 2019 Volons SAS, https://www.volons.fr<br/>
					<br/>
					Permission is hereby granted, free of charge, to any person obtaining a copy<br/>
					of this software and associated documentation files (the "Software"), to deal<br/>
					in the Software without restriction, including without limitation the rights<br/>
					to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br/>
					copies of the Software, and to permit persons to whom the Software is<br/>
					furnished to do so, subject to the following conditions:<br/>
					<br/>
					The above copyright notice and this permission notice shall be included in all<br/>
					copies or substantial portions of the Software.<br/>
					<br/>
					THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR<br/>
					IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,<br/>
					FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE<br/>
					AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER<br/>
					LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,<br/>
					OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE<br/>
					SOFTWARE.<br/>
				</pre>

			</div> );
	}
}
