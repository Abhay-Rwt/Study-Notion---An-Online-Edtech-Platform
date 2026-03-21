const express = require("express");
const router = express.Router();
const { createCourse, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../controllers/Course");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/Category");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");
const { createRating, getAllRating, getAverageRating } = require("../controllers/RatingAndReview");
const { auth, isAdmin, isInstructor, isStudent } = require("../middlewares/auth");
const { updateCourseProgress } = require("../controllers/courseProgress");


//**************************************************************************************************************************************************
//                                                     Course Routes
//**************************************************************************************************************************************************

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.post("/getCourseDetails", auth, getCourseDetails);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


//**************************************************************************************************************************************************
//                                                     Section Routes
//*************************************************************************************************************************************************

router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

//**************************************************************************************************************************************************
//                                                     Category Routes
//*************************************************************************************************************************************************

router.post("/createCategory", auth, createCategory);
router.get("/showAllCategories", showAllCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);


//**************************************************************************************************************************************************
//                                                     Subsection Routes
//*************************************************************************************************************************************************

router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)


//**************************************************************************************************************************************************
//                                                     Rating Routes
//**************************************************************************************************************************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);


module.exports = router;