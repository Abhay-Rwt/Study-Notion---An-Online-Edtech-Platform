import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/pageAndComponenetData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'

const Catalog = () => {
    const { catalogName } = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [active, setActive] = useState(1)

    // fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)

                const matchedCategory = res?.data?.allCategory?.find(
                    (ct) =>
                        ct.name.split(" ").join("-").toLowerCase() ===
                        catalogName.toLowerCase()
                )

                if (!matchedCategory) {
                    console.log("Category not found for:", catalogName)
                    return
                }

                setCategoryId(matchedCategory._id)
            } catch (error) {
                console.log(error)
            }
        }

        getCategories()
    }, [catalogName])

    // get courses for category
    useEffect(() => {
        if (!categoryId) return;

        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId)

                // console.log("RES.................", res);

                setCatalogPageData(res)
            } catch (error) {
                console.log(error)
            }
        }

        getCategoryDetails()
    }, [categoryId])

    return (
        <>
            {/* Hero Section */}
            <div className=" box-content bg-gray-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-gray-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-500">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-gray-50">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-gray-200">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Section 1 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-2xl font-bold text-gray-50 lg:text-4xl">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-gray-600 text-sm">
                    <p
                        className={`px-4 py-2 ${active === 1
                                ? "border-b border-b-yellow-500 text-yellow-500"
                                : "text-gray-50"
                            } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`px-4 py-2 ${active === 2
                                ? "border-b border-b-yellow-500 text-yellow-500"
                                : "text-gray-50"
                            } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>
            {/* Section 2 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-2xl font-bold text-gray-50 lg:text-4xl">
                    Top courses in {catalogPageData?.data?.differentCategory?.name}
                </div>
                <div className="py-8">
                    <CourseSlider
                        Courses={catalogPageData?.data?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 3 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="text-2xl font-bold text-gray-50 lg:text-4xl">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {catalogPageData?.data?.mostSellingCourses
                            ?.slice(0, 4)
                            .map((course, i) => (
                                <Course_Card course={course} key={i} Height={"h-[400px]"} />
                            ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Catalog