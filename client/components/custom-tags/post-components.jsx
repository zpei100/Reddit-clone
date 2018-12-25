import React from 'react';

export const PostWrapper = ({children}) => <div className="d-flex rounded border-left border-secondary border-top-0 border-bottom-0 my-2 p-0 post">{children}</div>

export const PostBody = ({children}) => <div className="post-body ml-3">{children}</div>

export const PostHeader = ({children}) => <div className="d-flex justify-content-between">{children}</div>

export const Message = ({message}) => <p className="message mt-3">{message}</p>

export const Popularity = () => <div className="post-popularity" />;

export const Username = ({ username, handleUsernameClick }) => 
	<div className="mt-3 post-username">
		<a href="#" onClick={() => {if (handleUsernameClick) handleUsernameClick(username); else return;}}>{username}</a>
	</div>;
	
export const Content = (props) =>
	<div>
		<Title {...props} />
		<Icons />
	</div>;

export const Title = ({ handleTitleClick, postId, title }) => 
	<h3 className="mt-0 post-title">
		<a href="#" onClick={() => {if (handleTitleClick) handleTitleClick(postId); else return;}}>{title}</a>
	</h3>;

const Icons = () => <div className="post-icons"></div>;

const Button = ({color, handler, text}) => {
	return (
		<button className={`btn mx-2 btn-outline-${color}`} onClick={handler}>{text}</button>
	)
}

export const Buttons = ({ username, activeUser, toggleShowReplyBox, toggleEditing, parent }) => {
	return (
		<div className="row mt-3 mr-3">
			{activeUser && activeUser === username 
			? <Button color='info' text='Edit' handler={toggleEditing} />
			: ''}
			{activeUser 
			? !parent 
				? ''
				: <Button color='primary' text='Reply' handler={toggleShowReplyBox}/>
			: ''}
		</div>
	);
};