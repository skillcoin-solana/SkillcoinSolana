import { useState, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import { GridPostList, Loader } from '@/components/shared';
import { useGetCurrentUser } from '@/lib/react-query/queries';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const WalletStats = () => {
	const [balance, setBalance] = useState<number | null>(0);

	const { data: currentUser } = useGetCurrentUser();
	const { publicKey } = useWallet();
	const { connection } = useConnection();

	useEffect(() => {
		const getInfo = async () => {
			if (connection && publicKey) {
				const info = await connection.getAccountInfo(publicKey);
				setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
			}
		};
		getInfo();
	}, [connection, publicKey]);

	if (!currentUser)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	return (
		<div className="bg-gray-2 rounded-lg p-2 xl:w-1/3 w-full self-start xl:ml-52">
			<ul className="p-2">
				<li className="flex justify-between">
					<p className="tracking-wider base-semibold">Wallet</p>
					<p className="text-neon-blue base-semibold">
						{publicKey ? 'Connected' : 'Not Connected'}
					</p>
				</li>

				<li className="text-sm mt-4 flex justify-between">
					<p className="tracking-wider base-semibold ">Balance</p>
					<p className="text-neon-blue base-semibold ">
						{publicKey ? balance : 0}
						<span className="text-white medium-regular"> sol</span>
					</p>
				</li>
			</ul>
		</div>
	);
};

export default WalletStats;
