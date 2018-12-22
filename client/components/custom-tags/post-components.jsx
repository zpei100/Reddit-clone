import React from 'react';

export const Post = (props) => {
	return (
		<PostWrapper>
			<Popularity />
			<PostBody>
				<Username {...props} />
				<hr />
				<Content {...props} />
			</PostBody>
		</PostWrapper>
	);
};

export const PostWrapper = ({children}) => <div className="d-flex rounded border-dark my-3 p-0 post">{children}</div>

export const PostBody = ({children}) => <div className="post-body mx-3">{children}</div>

export const PostHeader = ({children}) => <div className="d-flex justify-content-between">{children}</div>

export const Message = ({message, postId}) => <p className={postId}>{message}</p>

export const Popularity = () => <div className="post-popularity" />;

export const Username = ({ username, handleUsernameClick }) => 
	<div className="mt-3 post-username">
		<a href="#" onClick={() => {handleUsernameClick(username);}}>{username}</a>
	</div>;
	
const Content = (props) =>
	<div>
		<Title {...props} />
		<Icons />
	</div>;

export const Title = ({ handleTitleClick, postId, title }) => 
	<h3 className="mt-0 post-title">
		<a href="#" onClick={() => {if (handleTitleClick) handleTitleClick(postId); else return;}}>{title}</a>
	</h3>;

const Icons = () => <div className="post-icons" />;

