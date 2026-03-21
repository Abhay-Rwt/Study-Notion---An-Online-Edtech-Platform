import React from 'react'
import Logo1 from '../../../assests/Logo1.jpg'
import Logo2 from '../../../assests/Logo2.png'
import Logo3 from '../../../assests/Logo3.jpg'
import Logo4 from '../../../assests/Logo4.jpg'
import TimelineImage from '../../../assests/TimelineImage.jpg'

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success of the company",
    },
    {
        Logo: Logo2,
        heading: "Teamwork",
        Description: "Working together to achieve common goals",
    },
    {
        Logo: Logo3,
        heading: "Innovation",
        Description: "Creating smart and effective solutions",
    },
    {
        Logo: Logo4,
        heading: "Integrity",
        Description: "Honest and transparent in every action",
    }
]


const TimelineSection = () => {
    return (
        <div>
            <div className='flex flex-row gap-14 items-center'>
                <div className='w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map((elem, index) => (
                            <div key={index} className='flex flex-row gap-6'>
                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={elem.Logo} />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{elem.heading}</h2>
                                    <p className='text-sm'>{elem.Description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='relative shadow-blue-200'>
                    <img src={TimelineImage} className='w-[800px] object-cover shadow-white rounded-md'/>

                    <div className='left-[50%] translate-x-[-50%] translate-y-[-50%] absolute bg-green-900 flex flex-row text-white uppercase py-7'>
                        <div className='flex flex-row gap-5 items-center border-r border-green-400 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-green-300 text-sm'>Years of Experience</p>
                        </div>

                        <div className='flex gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-green-300 text-sm'>Type of Courses</p>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}

export default TimelineSection