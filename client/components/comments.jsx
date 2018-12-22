import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST, DELETE_POST } from '../queries/queries.js';
import { Mutation } from 'react-apollo';
import $ from 'jquery';

import { Username, Title, Popularity } from './custom-tags/post-components.jsx';

class Comments extends React.Component {
	constructor() {
		super();
		this.state = {
			edit: false
		};

		this.editPost = this.editPost.bind(this);
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

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.postBeingEdited !== null && this.state.edit) this.setState({ edit: false });
	}

	render() {
		const {
			parentId,
			comment,
			activeUser,
			setHeight,
			updateMaster,
			goToMain,
			postBeingEdited,
			changePostComponent
		} = this.props;

		return (
			<Query query={GET_POST} variables={{ postId: parentId }} pollInterval={500}>
				{({ loading, data }) => {
					if (loading) return <h1>Loading...</h1>;
					const { post: { title, message, postId, comments, user: { username } } } = data;
        
					return (
						<div className="post d-flex rounded border-dark my-3 p-0">
							<Popularity />
							<div className="post-body mx-3">
								<div className="d-flex justify-content-between">
									<Username {...{ username, handleUsernameClick: updateMaster }} />
									<Buttons {...{username, title, message, postId, edit: this.state.edit, editPost:this.editPost, activeUser, postBeingEdited, comment, setHeight}}/>
								</div>
								<Title title={title} />
								<p className={postId}>{message}</p>
								<hr />
									{comments.length > 0 
                  ? comments.map(({postId}) => <Comments {...{updateMaster, parentId: postId, username, comment, setHeight, changePostComponent, goToMain, postBeingEdited}} />) : ''}
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default Comments;

const Buttons = ({ username, title, message, postId, editPost, edit, activeUser, postBeingEdited, comment, setHeight }) => {
	return (
		<div className="row">
			{activeUser === username ? (
				<div>
					<button
						className={`btn btn-outline-${edit === false ? 'info' : 'danger'} mx-2 ${edit === false
							? 'edit'
							: 'cancel'}`}
						onClick={(e) => {
							editPost(title, message, postId);
						}}
					>
						{edit === false ? 'Edit' : 'Cancel'}
					</button>

					<Mutation mutation={DELETE_POST}>
						{(deletePost) => (
							<button
								className="btn btn-outline-danger mx-2"
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
				</div>
			) : (
				''
			)}

			{username === '' ? (
				''
			) : (
				<button
					className="btn btn-outline-primary mx-2"
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
