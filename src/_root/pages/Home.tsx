import { Models } from 'appwrite';

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard } from '@/components/shared';
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queries';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '@/utils/motion';

const Home = () => {
	// const { toast } = useToast();

	const {
		data: posts,
		isLoading: isPostLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();
	const {
		data: creators,
		isLoading: isUserLoading,
		isError: isErrorCreators,
	} = useGetUsers(10);

	if (isErrorPosts || isErrorCreators) {
		return (
			<div className="flex flex-1">
				<div className="home-container">
					<p className="body-medium text-light-1">Something bad happened</p>
				</div>
				<div className="home-creators">
					<p className="body-medium text-light-1">Something bad happened</p>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			variants={staggerContainer}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.25 }}
			className="home-container"
		>
			<motion.img
				variants={slideIn('left', 'tween', 0.1, 1)}
				src="/assets/images/undraw_hero.png"
				width={700}
				height={400}
				alt="hero"
			/>
			<div className="flex flex-col">
				<motion.div variants={slideIn('right', 'tween', 0.1, 0.8)}>
					<h2 className="font-montserrat text-gray-5 text-sm align-baseline">
						<span className="text-neon-blue text-xl">|</span>&nbsp;&nbsp;unlock
						the power of crypto knowledge
					</h2>
				</motion.div>
				<motion.h1
					variants={slideIn('right', 'tween', 0.1, 1)}
					className="mt-1 md:text-[44px] text-4xl font-palanquinDark"
				>
					FIND SPECIALISTS,
					<br /> SHARE YOUR <span className="text-neon-blue">SKILLS</span>,{' '}
					<br />
					<span className="text-neon-blue">GROW</span> WITH US
				</motion.h1>
				<Link to="/create-post" className="self-end  mt-8">
					<motion.button
						variants={fadeIn('up', 'tween', 1.2, 0.5)}
						className="font-palanquin md:text-2xl md:h-14 md:w-56 text-xl h-12 w-44 rounded-xl bg-gray-2 hover:bg-denim-blue text-white"
					>
						Add Your Offer
					</motion.button>
				</Link>
			</div>
		</motion.div>
	);
};

export default Home;
