import React, { useState, Fragment, useEffect } from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import axios from 'axios';
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
const BlogPost = (props: { post: Post; showContent: boolean }) => {
	const { post, showContent } = props;
	return (
		<article id={`post-${post.id}`}>
			<h1>{post.title.rendered}</h1>
			<p>Published {moment(post.date).fromNow()}</p>
			<div>
				{showContent ? (
					<Fragment>{post.content.rendered}</Fragment>
				) : (
					<Fragment>{post.excerpt.rendered}</Fragment>
				)}
			</div>
		</article>
	);
};

/**
 * Display a list of posts
 *
 * @param props
 */
const ListOfPosts = (props: {
	posts: Array<Post>;
	showContent: boolean;
	toggleShowContent: (enable: boolean) => void;
}) => {
	const { posts, showContent, toggleShowContent } = props;
	return (
		<div>
			<button
				onClick={e => {
					e.preventDefault();
					toggleShowContent(!showContent);
				}}>
				Show Full Content
			</button>
			<Fragment>
				{posts.map(post => (
					<BlogPost key={post.id} post={post} showContent={showContent} />
				))}
			</Fragment>
		</div>
	);
};
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
const post2: Post = {
	id: 4000,
	title: {
		rendered: 'Post Two'
	},
	content: {
		rendered: 'Post 2 Content'
	},
	excerpt: {
		rendered: 'Post 2 Excerpt'
	},
	date: '2019-01-19T06:53:51'
};

function App() {
	/**
	 * State of content vs excerpt display
	 * Putting it here to demonstrate passing change handlers
	 */
	const [showContent, toggleShowContent] = useState<boolean | null>(null);

	/**
	 * Put posts in state
	 */
	const [posts, setPosts] = useState<Array<Post> | null>([post, post2]);

	/**
	 * Get posts via remote API
	 */
	const url = 'https://calderaforms.com/wp-json/wp/v2/posts';
	useEffect(
		() => {
			axios(url).then(r => {
				setPosts(r.data);
			});
		},
		['url']
	);

	return (
		<div className="App">
			<ListOfPosts
				posts={posts}
				showContent={showContent}
				toggleShowContent={toggleShowContent}
			/>
		</div>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
