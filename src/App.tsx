import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
// Solana Wallet Connection
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
	LedgerWalletAdapter,
	PhantomWalletAdapter,
	SolflareWalletAdapter,
	SolongWalletAdapter,
	TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

import {
	Home,
	Explore,
	Saved,
	CreatePost,
	Profile,
	EditPost,
	PostDetails,
	UpdateProfile,
	AllUsers,
	Roadmap,
} from '@/_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import SignupForm from '@/_auth/forms/SignupForm';
import SigninForm from '@/_auth/forms/SigninForm';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { SendSol } from './components/shared';

const App = () => {
	const solNetwork = WalletAdapterNetwork.Devnet;
	const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
	const wallets = useMemo(
		() => [
			// new LedgerWalletAdapter(),
			new PhantomWalletAdapter(),
			// new SolflareWalletAdapter(),
			// new SolongWalletAdapter(),
			// new TorusWalletAdapter(),
		],
		[solNetwork]
	);
	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets}>
				<WalletModalProvider>
					<main className="flex h-screen">
						<Routes>
							{/* public routes */}
							<Route element={<AuthLayout />}>
								<Route path="/sign-in" element={<SigninForm />} />
								<Route path="/sign-up" element={<SignupForm />} />
							</Route>

							{/* private routes */}
							<Route element={<RootLayout />}>
								<Route index element={<Home />} />
								<Route path="/explore" element={<Explore />} />
								<Route path="/saved" element={<Saved />} />
								<Route path="/all-users" element={<AllUsers />} />
								<Route path="/create-post" element={<CreatePost />} />
								<Route path="/update-post/:id" element={<EditPost />} />
								<Route path="/posts/:id" element={<PostDetails />} />
								<Route path="/profile/:id/*" element={<Profile />} />
								<Route path="/update-profile/:id" element={<UpdateProfile />} />
								<Route path="/roadmap" element={<Roadmap />} />
								<Route path="/make-transaction/:id" element={<SendSol />} />
							</Route>
						</Routes>

						<Toaster />
					</main>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default App;
