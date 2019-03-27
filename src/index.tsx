import * as React from 'react';
import { render } from 'react-dom';

import './styles.css';

interface PostContent {
	rendered: string;
}

interface PostTitle {
	rendered: string;
}

interface Post {
	title: PostTitle;
	content: PostContent;
}

const BlogPost = (props: { post: Post }) => {
	const { post } = props;
	return (
		<article>
			<h1>{post.title.rendered}</h1>
			<p>{post.content.rendered}</p>
		</article>
	);
};

function App() {
	const post: Post = {
		title: {
			rendered: 'Post Title'
		},
		content: {
			rendered: 'Post Content'
		}
	};
	return (
		<div className="App">
			<BlogPost post={post} />
		</div>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
