import React from 'react'
import InstructorImage from '../../../assests/InstructorImage.jpg'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
    return (
        <div>
            <div className='flex flex-row gap-20 items-center mt-20'>
                <div className='w[50%]'>
                    <img src={InstructorImage} className='shadow-white w-[700px]'/>
                </div>
                
                <div className='w-[50%] flex flex-col gap-14'>
                    <div className='text-4xl font-semibold w-[30%]'>
                        Become an 
                        <HighlightText text={"Instructor"}/>
                    </div>
                    <p className='font-medium text-[16px] w-[90%] text-gray-500'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>

                    <div className='w-fit'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Start Learning Today
                                <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default InstructorSection