import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST, DELETE_POST } from '../queries/queries.js';
import { Mutation } from 'react-apollo';
import $ from 'jquery';

import { Username, Title, Popularity, PostWrapper, PostBody, Message, PostHeader } from './custom-tags/post-components.jsx';

export default class Comments extends React.Component {
	constructor() {
		super();
		this.state = {edit: false};
		this.editPost = this.editPost.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.postBeingEdited !== null && this.state.edit) this.setState({ edit: false });
	}

	editPost(title, message, postId) {
		this.setState({ edit: !this.state.edit }, () => {
			console.log('this props: ', this.props);
			if (this.state.edit) {
				$('.edit').css('display', 'none');
				$('#title').val(title);
				$('#message').val(message);

				this.props.changePostComponent('Save Changes', postId);
			} else {
				$('.edit').css('display', 'default');
				$('#title').val('');
				$('#message').val('');
				const height = 0;
				this.props.setHeight(height);
				this.props.changePostComponent('Post', null);
			}
		});
	}

	render() {
		return (
			<Query query={GET_POST} variables={{ postId: this.props.parentId }} pollInterval={500}>
				{({ loading, data }) => {
					if (loading) return <h1>Loading...</h1>;
					if (data.post) {

						console.log('postId of the current post is: ', data.post.postId);
						console.log('length of comments: ',  data.post.comments.length)

						const {comments, user: { username }} = data.post;

						//Declare props for the components below to use
						//Passing down data from post, extracted username, passed down edit state and editPost method
						const props = Object.assign(data.post, this.props, {username}, {edit: this.state.edit, editPost: this.editPost})
					
						return (
							<PostWrapper>
								<Popularity />
								<PostBody>
									<PostHeader>
										<Username {...props} />
										<Buttons {...props}/>
									</PostHeader>
									<Title {...props} />
									<Message {...props}/>
									<hr />
										{comments.length > 0 
										? comments.map(({postId}) => <Comments  parentId={postId} />) : ''}
								</PostBody>
							</PostWrapper>
						);
					}
				}}
			</Query>
		);
	}
}

const Buttons = ({ username, title, message, postId, editPost, edit, activeUser, postBeingEdited, comment, setHeight, parentId }) => {
	return (
		<div className="row mt-3">
			{activeUser === username ? (
					<React.Fragment>
					<button
						className={`btn btn-sm h-75 btn-outline-${edit === false ? 'info' : 'danger'} mx-2 ${edit === false
							? 'Edit'
							: 'Cancel'}`}
						onClick={() => {editPost(title, message, postId);}}>
						{edit === false ? 'Edit' : 'Cancel'}
					</button>

					<Mutation mutation={DELETE_POST}>
						{(deletePost) => (
							<button
								className="btn btn-sm h-75 btn-outline-danger mx-2"
								onClick={() => {
									if (postBeingEdited !== null) return alert('Please finish editing');
									if (parentId === 'main') goToMain();
									deletePost({ variables: { postId: postId } });
								}}
							>
								Delete
							</button>
					
						)}
					</Mutation>
					</React.Fragment> 
				
			) : (
				''
			)}

			{username === '' ? (
				''
			) : (
				<button
					className="btn btn-sm h-75 btn-outline-primary mx-2"
					onClick={function(e) {
						if (postBeingEdited !== null) return alert('Please finish editing');
						comment(postId);
						$(e.target).hover();
						const height = e.target.offsetTop - 18;
						setHeight(height);
					}}
				>
					Comment
				</button>
			)}
		</div>
	);
};
