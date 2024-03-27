import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Button, Input, useToast } from '../ui';
import * as web3 from '@solana/web3.js';
import { MdWallet } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queries';
import { Loader } from '.';

const SendSol = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const { data: post, isLoading } = useGetPostById(id);

	const [account, setAccount] = useState<any>('');
	const [amount, setAmount] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);
	const [transactionSignature, setTransactionSignature] = useState<string>('');

	const { toast } = useToast();

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const handleTransaction = async () => {
		if (!connection || !publicKey) {
			toast({ title: 'Wallet not connected' });
			return;
		}

		const transaction = new web3.Transaction();
		const instruction = web3.SystemProgram.transfer({
			fromPubkey: publicKey,
			lamports: web3.LAMPORTS_PER_SOL * amount,
			toPubkey: account,
		});

		transaction.add(instruction);

		try {
			const signature = await sendTransaction(transaction, connection);
			setTransactionSignature(signature);

			const newBalance = balance - amount;
			setBalance(newBalance);
		} catch (error) {
			toast({ title: 'Transaction failed. Please try again' });
			console.log(error);
		} finally {
			setAccount('');
			setAmount(0);
		}
	};

	useEffect(() => {
		const getInfo = async () => {
			if (connection && publicKey) {
				const info = await connection.getAccountInfo(publicKey);
				setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
			}
		};
		getInfo();
	}, [connection, publicKey]);

	const outputs = [
		{
			title: 'Account Balance',
			dependency: balance,
		},
		{
			title: 'Transaction Signature',
			dependency: transactionSignature,
			href: `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
		},
	];

	return (
		<div className="explore-container">
			<div className="flex items-center gap-2 w-full max-w-5xl">
				<MdWallet size={32} />
				<h2 className="h3-bold md:h2-bold text-left w-full">
					Make a Transaction
				</h2>
			</div>
			<p className="self-start ml-52">
				You are paying for offer: "{post?.caption}" by{' '}
				<span className="text-denim-blue">@{post?.creator.username}.</span>
			</p>

			<div className="flex justify-center w-full mt-8">
				<div className="flex flex-wrap w-465 max-w-5xl mt-8 mr-20">
					<div className="flex flex-col w-full gap-4">
						<div className="flex flex-col">
							<label className="shad-form_label">Receiver info</label>
							<input
								type="text"
								id="account"
								onChange={(event) => setAccount(event.target.value)}
								placeholder="Receiver's public key"
								className="h-10 p-2 bg-gray-2 border-none placeholder:text-gray-5 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-denim-blue"
							/>
						</div>
						<div className="flex flex-col">
							<label className="shad-form_label">Amount</label>

							<input
								id="amount"
								type="number"
								min={0}
								onChange={(event) => setAmount(Number(event.target.value))}
								placeholder="Amount to send"
								className="h-10 p-2 bg-gray-2 border-none placeholder:text-gray-5 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-denim-blue"
							/>
						</div>
						<Button
							onClick={handleTransaction}
							className="shad-button_dark_4 w-40"
						>
							Finish transaction
						</Button>

						<div className="text-sm font-montserrat mt-8 bg-gray-2 rounded-lg p-2 ">
							<ul className="p-2">
								{outputs.map(({ title, dependency, href }, index) => (
									<li
										key={title}
										className={`flex justify-between items-center ${
											index !== 0 && 'mt-4'
										}`}
									>
										<p>{title}</p>
										{dependency && (
											<a
												href={href}
												target="_blank"
												rel="noopener noreferrer"
												className={`flex text-neon-blue ${
													href && 'hover:text-white'
												} transition-all duration-200`}
											>
												{dependency.toString().slice(0, 25)}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				{isLoading || !post ? (
					<Loader />
				) : (
					<img
						src={post?.imageUrl}
						alt="creator"
						className="h-80 lg:h-[480px] xl:w-[30%] rounded-3xl object-cover p-5 bg-gray-2"
					/>
				)}
			</div>
		</div>
	);
};

export default SendSol;
