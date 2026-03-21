import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from '../../../assests/knowYourProgress.png'
import CTAButton from '../HomePage/Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-10'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={"learning any language"}></HighlightText>
        </div>

        <div className='text-center text-gray-700 mx-auto text-base font-medium w-[70%]'>
          Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>


        <div className='mt-5 flex flex-row items-center w-11/12'>
          <img src={knowYourProgress}></img>
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"} >Learn More</CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection;