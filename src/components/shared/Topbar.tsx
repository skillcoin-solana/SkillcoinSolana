import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMessage, AiOutlineSearch } from 'react-icons/ai';

import { GoBell } from 'react-icons/go';
import { useUserContext, INITIAL_USER } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queries';
import { Button, Input } from '../ui';

import { useInView } from 'react-intersection-observer';
import useDebounce from '@/hooks/useDebounce';
import { GridPostList, Loader } from '@/components/shared';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queries';

import { IoExitOutline } from 'react-icons/io5';
import { GoListUnordered } from 'react-icons/go';
import { MdOutlineBookmarkBorder } from 'react-icons/md';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export type SearchResultProps = {
	isSearchFetching: boolean;
	searchedPosts: any;
};

const SearchResults = ({
	isSearchFetching,
	searchedPosts,
}: SearchResultProps) => {
	if (isSearchFetching) {
		return <Loader />;
	} else if (searchedPosts && searchedPosts.documents.length > 0) {
		return <GridPostList posts={searchedPosts.documents} />;
	} else {
		return (
			<p className="text-light-4 mt-10 text-center w-full">No results found</p>
		);
	}
};

const Topbar = () => {
	const navigate = useNavigate();
	const { mutate: signOut, isSuccess } = useSignOutAccount();
	const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

	useEffect(() => {
		if (isSuccess) navigate(0);
	}, [isSuccess]);

	const { ref, inView } = useInView();
	const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

	const [searchValue, setSearchValue] = useState('');
	const debouncedSearch = useDebounce(searchValue, 500);
	const { data: searchedPosts, isFetching: isSearchFetching } =
		useSearchPosts(debouncedSearch);

	useEffect(() => {
		if (inView && !searchValue) {
			fetchNextPage();
		}
	}, [inView, searchValue]);

	if (!posts)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);
	const handleSignOut = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		signOut();
		setIsAuthenticated(false);
		setUser(INITIAL_USER);
		navigate('/sign-in');
	};

	const shouldShowSearchResults = searchValue !== '';
	const shouldShowPosts =
		!shouldShowSearchResults &&
		posts.pages.every((item) => item.documents.length === 0);

	return (
		<section className="topbar">
			<div className="flex-between py-4 px-5">
				<Link to="/" className="flex gap-3 items-center">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={130}
						height={325}
					/>
				</Link>

				{/* <div>
					<div className="sm:flex hidden h-10 gap-1 px-4 xl:w-[800px] w-420 rounded-xl bg-gray-2 items-center">
						<Input
							type="text"
							placeholder="Search for a service"
							className="explore-search"
							value={searchValue}
							onChange={(e) => {
								const { value } = e.target;
								setSearchValue(value);
							}}
						/>
						<AiOutlineSearch size={24} className="cursor-pointer" />
					</div>
				</div> */}
				<div className="flex gap-4 items-center">
					<WalletMultiButton />
					<div className="lg:flex hidden gap-8 items-center">
						<Link to="/explore">
							<AiOutlineMessage size={24} className="cursor-pointer" />
						</Link>
						<Link to="/roadmap">
							<GoListUnordered size={24} className="cursor-pointer" />{' '}
						</Link>
						<Link to="/saved">
							<MdOutlineBookmarkBorder size={26} className="cursor-pointer" />{' '}
						</Link>
						<Button
							variant="ghost"
							className="shad-button_ghost"
							onClick={(e) => handleSignOut(e)}
						>
							<IoExitOutline
								size={24}
								color={'#0073cf'}
								className="rotate-180"
							/>
						</Button>
					</div>
					<Link to={`/profile/${user.id}`} className="flex-center ">
						<img
							src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
							alt="profile"
							className="h-8 w-8 rounded-full"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Topbar;
