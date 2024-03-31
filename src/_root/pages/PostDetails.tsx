import { useParams, Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui';
import { Loader } from '@/components/shared';
import { GridPostList, PostStats } from '@/components/shared';
import { FaTrash } from 'react-icons/fa';

import {
	useGetPostById,
	useGetUserPosts,
	useDeletePost,
} from '@/lib/react-query/queries';
import { multiFormatDateString } from '@/lib/utils';
import { useUserContext } from '@/context/AuthContext';
import { MdArrowBack, MdEdit } from 'react-icons/md';

const PostDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useUserContext();

	const { data: post, isLoading } = useGetPostById(id);
	const { mutate: deletePost } = useDeletePost();

	const handleDeletePost = () => {
		deletePost({ postId: id, imageId: post?.imageId });
		navigate(-1);
	};

	return (
		<div className="post_details-container">
			<div className="hidden md:flex max-w-5xl w-full">
				<Button
					onClick={() => navigate(-1)}
					variant="ghost"
					className="shad-button_ghost"
				>
					<MdArrowBack size={24} />
					<p className="small-medium lg:base-medium">Back</p>
				</Button>
			</div>

			{isLoading || !post ? (
				<Loader />
			) : (
				<div className="post_details-card">
					<img
						src={post?.imageUrl}
						alt="creator"
						className="post_details-img"
					/>

					<div className="post_details-info">
						<div className="flex-between w-full">
							<Link
								to={`/profile/${post?.creator.$id}`}
								className="flex items-center gap-3"
							>
								<img
									src={
										post?.creator.imageUrl ||
										'/assets/icons/profile-placeholder.svg'
									}
									alt="creator"
									className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
								/>
								<div className="flex gap-1 flex-col">
									<p className="base-medium lg:body-bold text-light-1">
										{post?.creator.name}
									</p>
									<div className="flex-center gap-2 text-blue-100">
										<p className="subtle-semibold lg:small-regular ">
											{multiFormatDateString(post?.$createdAt)}
										</p>
									</div>
								</div>
							</Link>

							<div className="flex-center gap-4">
								<Link
									to={`/update-post/${post?.$id}`}
									className={`${user.id !== post?.creator.$id && 'hidden'}`}
								>
									<MdEdit size={24} />
								</Link>

								<Button
									onClick={handleDeletePost}
									variant="ghost"
									className={`ost_details-delete_btn ${
										user.id !== post?.creator.$id && 'hidden'
									}`}
								>
									<FaTrash size={20} />
								</Button>
							</div>
						</div>

						<hr className="border w-full border-dark-4/80" />

						<div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
							<p>{post?.caption}</p>

							<ul className="flex gap-1 mt-2">
								{post?.tags.map((tag: string, index: string) => (
									<li
										key={`${tag}${index}`}
										className="text-denim-blue small-regular"
									>
										#{tag}
									</li>
								))}
							</ul>
							<div className="w-full flex flex-col mt-10">
								<p className="text-neon-blue subtle-semibold lg:h1-semibold self-end">
									$ {post?.price}
								</p>
								{user.id != post?.creator.$id && (
									<Link
										to={`/make-transaction/${post?.$id}`}
										className="self-end"
									>
										<Button
											type="button"
											className="shad-button_primary px-8 w-40 mt-6"
										>
											Hire
										</Button>
									</Link>
								)}
							</div>
						</div>

						<div className="w-full">
							<PostStats post={post} userId={user.id} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetails;
