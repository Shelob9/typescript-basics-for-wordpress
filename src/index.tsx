import React, { useState, Fragment } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import './styles.css';

/**
 * Interface for post title, content and excerpt
 */
interface ContentObject {
	//This property is always present
	rendered: string;
	//This property is only present in some contexts
	raw?: string;
}

/**
 * Interface for describing post title
 */
interface PostTitle extends ContentObject {}
/**
 * Interface for describing post content
 */
interface PostContent extends ContentObject {}
/**
 * Interface for describing post content
 */
interface PostExcerpt extends ContentObject {}

/**
 * Interface descrinbing a WordPress post
 */
interface Post {
	title: PostTitle;
	content: PostContent;
	excerpt: PostExcerpt;
	date: string;
	id: number;
}

/**
 * Display A Blog Post
 *
 * @param props
 */
const BlogPost = (props: { post: Post }) => {
	const { post } = props;
	return (
		<article id={`post-${post.id}`}>
			<h1>{post.title.rendered}</h1>
			<p>Published {moment(post.date).fromNow()}</p>
			<p>{post.content.rendered}</p>
		</article>
	);
};

/**
 * Display a list of posts
 *
 * @param props
 */
const ListOfPosts = (props: { posts: Array<Post> }) => {
	const { posts } = props;
	return (
		<Fragment>
			{posts.map(post => (
				<BlogPost key={post.id} post={post} />
			))}
		</Fragment>
	);
};

function App() {
	const post: Post = {
		id: 42,
		title: {
			rendered: 'Post Title'
		},
		content: {
			rendered: 'Post Content'
		},
		excerpt: {
			rendered: 'Post Excerpt'
		},
		date: '2019-03-19T06:53:51'
	};
	return (
		<div className="App">
			<ListOfPosts posts={[post]} />
		</div>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
