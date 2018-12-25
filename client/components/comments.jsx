import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST } from '../queries/queries.js';
import Reply from './reply.jsx';
import Edit from './edit.jsx';

import { Username, Title, Popularity, PostWrapper, PostBody, Message, PostHeader, Buttons } from './custom-tags/post-components.jsx';

export default class Comments extends React.Component {
	constructor() {
		super();
		this.state = {
			showReplyBox: false,
			editing: false
		};
	};

	toggleShowReplyBox = () => {
		this.setState({showReplyBox: !this.state.showReplyBox})
	};

	cancelEdit = () => {
		this.setState({editing: false})
	};

	toggleEditing = () => {
		this.setState({editing: true, showReplyBox: false})
	}; 
	
	render() {
		const {handleUsernameClick, parentId, activeUser, goToMain} = this.props;
		const {showReplyBox, editing} = this.state;
		const toggleShowReplyBox = this.toggleShowReplyBox;
		const cancelEdit = this.cancelEdit;
		const toggleEditing = this.toggleEditing;
	
		return ( 
			<Query query={GET_POST} variables={{ postId: parentId }} pollInterval={500}>
				{({ loading, data }) => {
					if (loading) return '';
					if (data.post) {
						const {user: {username}, comments, message, title, postId, parent} = data.post;
					
						const editProps = {cancelEdit, goToMain, activeUser, editing, message, title, postId, parent};
						const buttonsProps = { username, activeUser, toggleShowReplyBox, toggleEditing, parent };
						const usernameProps = {username, handleUsernameClick};
						const titleProps = { postId, title };

						return (
							<PostWrapper>
								<Popularity />
								<PostBody>
									{editing && activeUser ? <Edit {...editProps} />
									: <React.Fragment>
										<PostHeader>
											<Username {...usernameProps} />
											<Buttons {...buttonsProps} />
										</PostHeader>
										<Title {...titleProps} />
										<Message message={message}/>
										<hr className="mr-3"/>
										<Reply 
											replyTo={postId} 
											type={parent ? 'Reply' : 'Comment'} 
											activeUser={activeUser}
											showReplyBox={!parent || showReplyBox}
											toggleShowReplyBox={toggleShowReplyBox} 
											cancelEdit={cancelEdit}
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
