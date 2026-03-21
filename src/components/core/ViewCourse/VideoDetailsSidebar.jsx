import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"


const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    const location = useLocation();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) {
                return;
            }

            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-gray-700 bg-gray-800">
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold text-gray-50">
                    <div className="flex w-full items-center justify-between ">
                        
                        {/* back button */}
                        <div
                            onClick={() => {
                                navigate(`/dashboard/enrolled-courses`)
                            }}
                            className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-gray-100 p-1 text-gray-700 hover:scale-90 cursor-pointer"
                            title="back"
                        >
                            <IoIosArrowBack size={30} />
                        </div>

                        {/* add review button */}
                        <IconBtn
                            text="Add Review"
                            customClasses="ml-auto"
                            onclick={() => setReviewModal(true)}
                        />
                    </div>

                    {/* completed lectures / total no. of lectures */}
                    <div className="flex flex-col">
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-gray-500">
                            {completedLectures?.length} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>

                {/* all sections */}
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {courseSectionData.map((course, index) => (
                        <div
                            className="mt-2 cursor-pointer text-sm text-gray-50"
                            onClick={() => setActiveStatus(course?._id)}
                            key={index}
                        >
                            {/* Section */}
                            <div className="flex flex-row justify-between bg-gray-600 px-5 py-4">
                                <div className="w-[70%] font-semibold">
                                    {course?.sectionName}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`${activeStatus === course?._id
                                                ? "rotate-180"
                                                : "rotate-0"
                                            } transition-all duration-500`}
                                    >
                                        <BsChevronDown />
                                    </span>
                                </div>
                            </div>


                            {/* Sub Sections */}
                            {activeStatus === course?._id && (
                                <div className="transition-[height] duration-500 ease-in-out">
                                    {course.subSection.map((topic, i) => (
                                        <div
                                            className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                                                    ? "bg-yellow-400 font-semibold text-gray-800"
                                                    : "hover:bg-gray-900"
                                                } `}
                                            key={i}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                )
                                                setVideoBarActive(topic._id)
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(topic?._id)}
                                                onChange={() => { }}
                                            />
                                            {topic.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default VideoDetailsSidebar