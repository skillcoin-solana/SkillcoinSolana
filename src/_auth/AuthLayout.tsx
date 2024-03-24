import { Outlet, Navigate } from 'react-router-dom';

import { useUserContext } from '@/context/AuthContext';

export default function AuthLayout() {
	const { isAuthenticated } = useUserContext();

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<>
					<img
						src="/assets/images/side.png"
						alt="side-image"
						className="hidden xl:block h-screen w-1/3 object-cover bg-no-repeat"
					/>
					<section className="flex flex-1 justify-center items-center flex-col py-10">
						<Outlet />
					</section>
				</>
			)}
		</>
	);
}
