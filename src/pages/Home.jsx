import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import Navbar from '../components/common/Navbar';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assests/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
	return (
		<div>
			{/* <Navbar /> */}


			{/* Section-1 */}
			<div className='group relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
				<Link to="/signup">
					<div className='mt-16 p-1 mx-auto rounded-full bg-gray-700 font-bold transition-all duration-200 hover:scale-90'>
						<div className='flex items-center gap-2 rounded-full px-10 py-[5px] hover:bg-gray-900'>
							<p>Become an Instructor</p>
							<FaArrowRight />
						</div>
					</div>
				</Link>

				<div className="text-center text-4xl font-bold mt-6">
					Empower Your Future with
					<HighlightText text={"Coding Skills"} />
				</div>


				<div className='mt-4 w-[90%] text-center text-lg font-bold text-gray-400'>
					With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a weatlh of resourses, including hands-on projects quizzes, and personalized feedback from Instructor.
				</div>


				<div className='flex flex-row gap-7 mt-8'>
					<CTAButton linkto={"/signup"} active={true}>
						Learn More
					</CTAButton>

					<CTAButton linkto={"/login"} active={false}>
						Book a Demo
					</CTAButton>
				</div>


				<div className='shadow-blue-400 mx-3 my-12 w-[80%]'>
					<video
						muted
						loop
						autoPlay
					>
						<source src={Banner} type="video/mp4" />
					</video>
				</div>
				{/* Codesection 1 */}
				<div>
					<CodeBlocks
						position={"lg:flex-row"}
						heading={
							<div>
								Unlock Your <HighlightText text={"coding potential"} /> with our online courses.
							</div>
						}
						subHeading={
							"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
						}
						ctabtn1={
							{
								btnText: "Try It Yourself",
								linkto: "/signup",
								active: true,
							}
						}
						ctabtn2={
							{
								btnText: "Learn More",
								linkto: "/login",
								active: false,
							}
						}
						codeblock={`<!DOCTYPE html>
									<html lang="en">
									<head>
										<meta charset="utf-8" />
										<title>React App</title>
									</head>
									<body>
										<noscript>You need to enable JavaScript to run this app.</noscript>
										<div id="root"></div>
										</body>
									</html>
						`}
						codeColor={'text-yellow-400'}
						backgroundGradient={<div className="codeblock1 absolute"></div>}
					/>
				</div>


				{/* Codesection 2 */}
				<div>
					<CodeBlocks
						position={"lg:flex-row-reverse"}
						heading={
							<div>
								Unlock Your <HighlightText text={"coding potential"} /> with our online courses.
							</div>
						}
						subHeading={
							"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
						}
						ctabtn1={
							{
								btnText: "Continue Lesson",
								linkto: "/signup",
								active: true,
							}
						}
						ctabtn2={
							{
								btnText: "Learn More",
								linkto: "/login",
								active: false,
							}
						}
						codeblock={`<!DOCTYPE html>
									<html lang="en">
									<head>
										<meta charset="utf-8" />
										<title>React App</title>
									</head>
									<body>
										<noscript>You need to enable JavaScript to run this app.</noscript>
										<div id="root"></div>
										</body>
									</html>
						`}
						codeColor={'text-yellow-400'}
					/>
				</div>

				<ExploreMore />

			</div>


			{/* Section-2 */}
			<div className='bg-white text-gray-700'>

				<div className=''>


					<div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap- mx-auto'>
						<div className='h-[150px]'></div>
						<div className='flex flex-row gap-7 text-white'>
							<CTAButton active={true} linkto={"/signup"}>
								<div className='flex items-center gap-3'>
									Explore Full Catalog
									<FaArrowRight />
								</div>
							</CTAButton>
							<CTAButton active={false} linkto={"/signup"}>
								<div>
									Learn More
								</div>
							</CTAButton>
						</div>
					</div>


					<div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>


						<div className='flex flex-row gap-5 mb-10 mt-[90px]'>
							<div className='text-4xl font-semibold w-1/2'>
								Get the skills you need for a
								<HighlightText text={"Job that is in demand"} />
							</div>
							<div className='flex flex-col gap-10 items-start'>
								<div className='text-[16px]'>
									The modern StudyNotion is the dictates its own terms. Today, to be a competitve specialist requires more than professional skills.
								</div>
								<CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
							</div>
						</div>




						<TimelineSection />


						<LearningLanguageSection />
					</div>


				</div>


			</div>


			{/* Section-3 */}
			<div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 text-white'>
				<InstructorSection />
				<h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>

                <div className='w-11/12'>
                    <ReviewSlider />
                </div>
				
			</div>
                




			{/* Footer*/}
			<Footer />

		</div>
	)
}

export default Home;