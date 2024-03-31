import { Models } from 'appwrite';
import { useState /*useEffect*/ } from 'react';
import { useLocation } from 'react-router-dom';

import { checkIsLiked } from '@/lib/utils';
import {
	useLikePost,
	// useSavePost,
	// useDeleteSavedPost,
	// useGetCurrentUser,
} from '@/lib/react-query/queries';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
// import {
// 	MdBookmark,
// 	MdBookmarkBorder,
// 	MdOutlineBookmarkBorder,
// } from 'react-icons/md';

type PostStatsProps = {
	post: Models.Document;
	userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
	const location = useLocation();
	const likesList = post.likes.map((user: Models.Document) => user.$id);

	const [likes, setLikes] = useState<string[]>(likesList);
	// const [isSaved, setIsSaved] = useState(false);

	const { mutate: likePost } = useLikePost();
	// const { mutate: savePost } = useSavePost();
	// const { mutate: deleteSavePost } = useDeleteSavedPost();

	// const { data: currentUser } = useGetCurrentUser();

	// const savedPostRecord = currentUser?.save.find(
	// 	(record: Models.Document) => record.post.$id === post.$id
	// );

	// useEffect(() => {
	// 	setIsSaved(!!savedPostRecord);
	// }, [currentUser]);

	const handleLikePost = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	) => {
		e.stopPropagation();

		let likesArray = [...likes];

		if (likesArray.includes(userId)) {
			likesArray = likesArray.filter((Id) => Id !== userId);
		} else {
			likesArray.push(userId);
		}

		setLikes(likesArray);
		likePost({ postId: post.$id, likesArray });
	};

	// const handleSavePost = (
	// 	e: React.MouseEvent<HTMLImageElement, MouseEvent>
	// ) => {
	// 	e.stopPropagation();

	// 	if (savedPostRecord) {
	// 		setIsSaved(false);
	// 		return deleteSavePost(savedPostRecord.$id);
	// 	}

	// 	savePost({ userId: userId, postId: post.$id });
	// 	setIsSaved(true);
	// };

	const containerStyles = location.pathname.startsWith('/profile')
		? 'w-full'
		: '';

	return (
		<div
			className={`flex justify-between items-center z-20 ${containerStyles}`}
		>
			<div className="flex gap-2 mr-5">
				{checkIsLiked(likes, userId) ? (
					<FaHeart
						size={20}
						color="#FF0000"
						onClick={(e) => handleLikePost(e)}
						className="cursor-pointer"
					/>
				) : (
					<FaRegHeart
						size={20}
						onClick={(e) => handleLikePost(e)}
						className="cursor-pointer"
					/>
				)}

				<p className="small-medium lg:base-medium">{likes.length}</p>
			</div>

			{/* <div className="flex gap-2">
				{isSaved ? (
					<MdBookmark
						size={24}
						color="#0073cf"
						className="cursor-pointer"
						onClick={(e) => handleSavePost(e)}
					/>
				) : (
					<MdBookmarkBorder
						size={24}
						className="cursor-pointer"
						onClick={(e) => handleSavePost(e)}
					/>
				)}
			</div> */}
		</div>
	);
};

export default PostStats;
