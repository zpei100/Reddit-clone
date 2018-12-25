import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST, DELETE_POST } from '../queries/queries.js';
import Reply from './reply.jsx';
import Edit from './edit.jsx';

import { Username, Title, Popularity, PostWrapper, PostBody, Message, PostHeader } from './custom-tags/post-components.jsx';

export default class Comments extends React.Component {
	constructor() {
		super();
		this.state = {
			showReplyBox: false,
			editing: false
		};
	}

	toggleShowReplyBox = () => {
		this.setState({showReplyBox: !this.state.showReplyBox})
	}

	cancelEdit = () => {
		this.setState({editing: false})
	}

	toggleEditing = () => {
		this.setState({editing: true, showReplyBox: false})
		
		// this.props.changePostComponent('Save Changes', postId);
	} 
	
	render() {
		return (
			<Query query={GET_POST} variables={{ postId: this.props.parentId }} pollInterval={500}>
				{({ loading, error, data }) => {
					if (loading) return '';
				
					if (data.post) {
						//username in this file refers to the username for the post
						//active user is the logged in user
						const {comments, user: {username}, message, title, postId, parent} = data.post;
						const {activeUser} = this.props;
						const {showReplyBox, editing} = this.state;
					

						//Declare props for the components below to use
						//Passing down data from post, extracted username, passed down edit state and editPost method
						const props = {...this.props, ...data.post, toggleEditing: this.toggleEditing, editPost: this.editPost, toggleShowReplyBox: this.toggleShowReplyBox, username};

						const editProps = {cancelEdit: this.cancelEdit, goToMain: this.props.goToMain, toggleEditing: this.toggleEditing, activeUser, editing, message, title, postId, parent}

						return (
							<PostWrapper>
								<Popularity />
								<PostBody>
									{editing && activeUser ? <Edit {...editProps} />
									: <React.Fragment>
										<PostHeader>
											<Username {...props} />
											<Buttons {...props} />
										</PostHeader>
										<Title {...props} />
										<Message {...props}/>
										<hr className="mr-3"/>
										<Reply 
											replyTo={postId} 
											type={parent ? 'Reply' : 'Comment'} 
											activeUser={activeUser}
											showReplyBox={!parent || showReplyBox}
											toggleShowReplyBox={this.toggleShowReplyBox} 
											cancelEdit={this.cancelEdit}
											message={message}
										/>
									</React.Fragment>}
										{comments.length > 0 
										? comments.map(({postId}) => <Comments key={postId} {...this.props} parentId={postId} />) : ''}
								</PostBody>
							</PostWrapper>
						);
					} else return ''
				}}
			</Query>
		);
	}
}

const Button = ({color, handler, text}) => {
	return (
		<button className={`btn mx-2 btn-outline-${color}`} onClick={handler}>{text}</button>
	)
}

const Buttons = ({ username, activeUser, toggleShowReplyBox, toggleEditing, parent }) => {

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
