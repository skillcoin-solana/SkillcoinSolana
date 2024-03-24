import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { GoListUnordered } from 'react-icons/go';
import { staggerContainer } from '@/utils/motion';
import { roadMapItems } from '@/constants';
import 'react-vertical-timeline-component/style.min.css';

const RoadMapItem = ({ item }: any) => {
	return (
		<VerticalTimelineElement
			contentStyle={{ background: '#282828', color: '#fff' }}
			contentArrowStyle={{ borderRight: '7px solid #282828' }}
			date={item.date}
			iconStyle={{ background: item.iconBg }}
			icon={
				<div className="flex justify-center items-center w-full h-full">
					{/* <img
						src={item.icon}
						alt={item.company_name}
						className="w-[60%] h-[60%] object-contain"
					/> */}
				</div>
			}
		>
			<div>
				<h3 className="h3-bold">{item.title}</h3>
				<p className="text-gray-5 base-medium" style={{ margin: 0 }}>
					{item.company_name}
				</p>
			</div>
			<ul className="mt-5 ml-5 space-y-2">
				{item.points.map((point, index) => (
					<li
						key={`item-point-${index}`}
						className="text-white text-[14px] pl-1 tracking-wider font-montserrat"
					>
						• {point}
					</li>
				))}
			</ul>
		</VerticalTimelineElement>
	);
};

const Roadmap = () => {
	return (
		<motion.section
			variants={staggerContainer()}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, amount: 0.25 }}
			className="saved-container"
		>
			<div className="flex items-center gap-2 w-full max-w-5xl">
				<GoListUnordered size={32} />
				<h2 className="h3-bold md:h2-bold text-left w-full">Project Roadmap</h2>
			</div>

			<div className="mt-5 flex flex-col">
				<VerticalTimeline>
					{roadMapItems.map((item, index) => (
						<RoadMapItem key={index} item={item} />
					))}
				</VerticalTimeline>
			</div>
		</motion.section>
	);
};

export default Roadmap;
