import React from 'react';

export const Post = (props) => {
	return (
		<div className="d-flex rounded border-dark my-3 p-0 post">
			<Popularity />
			<Body {...props} />
		</div>
	);
};

export const Popularity = () => {
	return <div className="post-popularity" />;
};

const Body = (props) => {
	return (
		<div className="post-body mx-3">
			<Username {...props} />
			<hr />
			<Content {...props} />
		</div>
	);
};

export const Username = ({ username, handleUsernameClick }) => {
	return (
		<div className="mt-3 post-username">
			<a href="#" onClick={() => {handleUsernameClick(username);}}>{username}</a>
		</div>
	);
};

const Content = (props) => {
	return (
		<div>
			<Title {...props} />
			<Icons />
		</div>
	);
};

export const Title = ({ handleTitleClick, postId, title }) => {
	return (
		<h3 className="mt-0 post-title">
			<a href="#" onClick={() => {if (handleTitleClick) handleTitleClick(postId); else return;}}>{title}</a>
		</h3>
	);
};

const Icons = () => {
	return <div className="post-icons" />;
};
