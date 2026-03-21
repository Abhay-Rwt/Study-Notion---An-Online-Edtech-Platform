import React, { useState } from 'react'
import HighlightText from './HighlightText';

const tabNames = [
    "Free", "New to coding", "Most popular", "Skill Paths", "Career paths"
];

const data = [
    {
        tag: "Free",
        courses: [
            {
                heading: "HTML Basics",
                description: "Learn the fundamentals of HTML and build simple web pages.",
                level: "Beginner",
                lessionNumber: 6
            },
            {
                heading: "CSS Basics",
                description: "Understand styling, colors, layouts, and responsive design.",
                level: "Beginner",
                lessionNumber: 8
            },
            {
                heading: "JavaScript Intro",
                description: "Get started with JavaScript and basic programming concepts.",
                level: "Beginner",
                lessionNumber: 10
            },
            {
                heading: "Git & GitHub",
                description: "Learn version control and how to use GitHub effectively.",
                level: "Beginner",
                lessionNumber: 5
            }
        ]
    },
    {
        tag: "New to coding",
        courses: [
            {
                heading: "HTML",
                description: "Learn how to structure web pages using HTML.",
                level: "Beginner",
                lessionNumber: 6
            },
            {
                heading: "CSS",
                description: "Style your web pages and create beautiful layouts.",
                level: "Beginner",
                lessionNumber: 7
            },
            {
                heading: "JavaScript Basics",
                description: "Understand variables, loops, and functions in JavaScript.",
                level: "Beginner",
                lessionNumber: 9
            },
            {
                heading: "Programming Logic",
                description: "Learn how to think like a programmer and solve problems.",
                level: "Beginner",
                lessionNumber: 5
            }
        ]
    },
    {
        tag: "Most popular",
        courses: [
            {
                heading: "JavaScript",
                description: "Master JavaScript concepts used in real-world applications.",
                level: "Intermediate",
                lessionNumber: 15
            },
            {
                heading: "React",
                description: "Build modern user interfaces using React.",
                level: "Intermediate",
                lessionNumber: 12
            },
            {
                heading: "Node.js",
                description: "Create backend applications using Node.js.",
                level: "Intermediate",
                lessionNumber: 10
            },
            {
                heading: "SQL",
                description: "Learn how to work with relational databases using SQL.",
                level: "Intermediate",
                lessionNumber: 8
            }
        ]
    },
    {
        tag: "Skill Paths",
        courses: [
            {
                heading: "Frontend Development",
                description: "Learn HTML, CSS, JavaScript, and frontend frameworks.",
                level: "Beginner",
                lessionNumber: 20
            },
            {
                heading: "Backend Development",
                description: "Understand servers, databases, and APIs.",
                level: "Intermediate",
                lessionNumber: 18
            },
            {
                heading: "Full Stack",
                description: "Become a full stack developer with hands-on projects.",
                level: "Intermediate",
                lessionNumber: 25
            },
            {
                heading: "Problem Solving",
                description: "Improve coding logic using DSA and challenges.",
                level: "Intermediate",
                lessionNumber: 14
            }
        ]
    },
    {
        tag: "Career paths",
        courses: [
            {
                heading: "Web Developer",
                description: "Prepare for a career as a professional web developer.",
                level: "Intermediate",
                lessionNumber: 30
            },
            {
                heading: "Software Engineer",
                description: "Learn core CS concepts required for software roles.",
                level: "Advanced",
                lessionNumber: 28
            },
            {
                heading: "Frontend Engineer",
                description: "Specialize in frontend technologies and UI development.",
                level: "Intermediate",
                lessionNumber: 22
            },
            {
                heading: "Backend Engineer",
                description: "Focus on backend systems, APIs, and databases.",
                level: "Advanced",
                lessionNumber: 24
            }
        ]
    }
];


const ExploreMore = () => {
    const [currTab, setCurrTab] = useState(tabNames[0]);
    const [courses, setCourses] = useState(data[0].courses);
    const [currentCard, setCurrentCard] = useState(data[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrTab(value);
        const result = data.filter((e) => e.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses.heading);
    }


    return (
        <div className='flex flex-col items-center'>
            <div className='font-semibold text-4xl'>
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>

            <p className='text-gray-400 text-center mt-6 text-base'>Learn to build anything you can imagine</p>

            <div className='flex flex-row items-center bg-gray-800 p-1 rounded-full gap-4 mt-8 w-fit '>
                {
                    tabNames.map((tab, index) => (
                        <div key={index} className={`text-[16px] flex flex-row items-center py-2 px-3 ${currTab === tab
                            ? "bg-gray-900 text-white font-medium"
                            : "text-gray-400 bg-gray-800"} rounded-full transition-all duration-200 cursor-pointer hover:bg-gray-900`}
                            onClick={() => setMyCards(tab)}
                        >
                            {tab}
                        </div>
                    ))
                }
            </div>

            <div className='h-[180px]'></div>

                <div className='flex gap-10 w-[80%]'>
                    {
                        courses.map((e, index) => (
                            <div key={index} className={`flex flex-col justify-between p-4 w-[400px] h-[290px] rounded-md cursor-pointer hover:scale-95 transition-all duration-200 ${currentCard === e.heading ? "bg-white text-black" : "bg-gray-800 text-gray-400"}`}
                                onClick={() => setCurrentCard(e.heading)}
                            >
                                <div className='flex gap-8 flex-col'>
                                    <h2 className='text-2xl font-bold'>{e.heading}</h2>
                                    <p>{e.description}</p>
                                </div>
                                <div className='flex justify-between text-blue-700'>
                                    <div>{e.level}</div>
                                    <div>{e.lessionNumber} Lessons</div>
                                </div>
                            </div>
                        ))
                    }
                </div>

        </div>
    )
}

export default ExploreMore