import { Models } from 'appwrite';

import { GridPostList, Loader } from '@/components/shared';
import {
	useGetCurrentUser,
	useGetPosts,
	useGetSavedOffers,
} from '@/lib/react-query/queries';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { useEffect, useMemo } from 'react';

const Saved = () => {
	const { data: currentUser } = useGetCurrentUser();
	const { data: savedOffers } = useGetSavedOffers();

	const savedPosts = currentUser?.save
		.map((savePost: Models.Document) => ({
			...savePost.post,
			creator: {
				imageUrl: currentUser.imageUrl,
			},
		}))
		.reverse();

	const boughtOffers = savedOffers?.documents
		.filter(
			(offer: Models.Document) =>
				offer.user.accountId === currentUser?.accountId
		)
		.map((savePost: Models.Document) => ({
			...savePost.post,
			creator: {
				imageUrl: currentUser?.imageUrl,
			},
		}))
		.reverse();

	const soldOffers = savedOffers?.documents
		.filter(
			(offer: Models.Document) =>
				offer.seller?.accountId === currentUser?.accountId
		)
		.map((savePost: Models.Document) => ({
			...savePost.post,
			creator: {
				imageUrl: currentUser?.imageUrl,
			},
		}))
		.reverse();

	return (
		<div className="saved-container">
			<div className="flex items-center gap-2 w-full max-w-5xl">
				<MdOutlineBookmarkBorder size={32} />
				<h2 className="h3-bold md:h2-bold text-left w-full">Bought Offers</h2>
			</div>

			{!currentUser ? (
				<Loader />
			) : (
				<ul className="w-full flex justify-center max-w-5xl gap-9">
					{boughtOffers?.length === 0 ? (
						<p className="text-blue-100 font-montserrat">
							You have not bought any offer yet
						</p>
					) : (
						<>{<GridPostList posts={boughtOffers} showStats={false} />}</>
					)}
				</ul>
			)}

			<div className="flex items-center gap-2 w-full max-w-5xl">
				<MdOutlineBookmarkBorder size={32} />
				<h2 className="h3-bold md:h2-bold text-left w-full">Sold Offers</h2>
			</div>

			{!currentUser ? (
				<Loader />
			) : (
				<ul className="w-full flex justify-center max-w-5xl gap-9">
					{soldOffers?.length === 0 ? (
						<p className="text-blue-100 font-montserrat">
							You have not sold any offers yet
						</p>
					) : (
						<>{<GridPostList posts={soldOffers} showStats={false} />}</>
					)}
				</ul>
			)}
		</div>
	);
};

export default Saved;
