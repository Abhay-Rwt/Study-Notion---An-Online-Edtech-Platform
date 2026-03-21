import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assests/Logo-Full-Light.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

const NavbarLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Catalog",
        // path: '/catalog',
    },
    {
        title: "About Us",
        path: "/about",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
];

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false)

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        setLoading(true);

        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);

            setSubLinks(result.data.allCategory);

            // console.log(result.data.allCategory);
        }
        catch (error) {
            console.log("Cannot fetch the category list");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchSubLinks();
    }, []);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-gray-600">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link to={"/"}>
                    <img src={logo} alt="" width={160} height={32} />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className="flex gap-x-6 text-gray-50">
                        {NavbarLinks.map((e, index) => (
                            <li key={index}>
                                {e.title === "Catalog" ? (
                                    <div className="relative flex flex-row items-center gap-2 group">
                                        <p className="hover:cursor-pointer">{e.title}</p>
                                        <IoIosArrowDown />

                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-50 p-4 text-gray-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                            <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-50"></div>
                                            {loading ? (
                                                <p className="text-center">Loading...</p>
                                            ) : (subLinks && subLinks.length) ? (
                                                <>
                                                    {
                                                        subLinks
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-300"
                                                                    key={i}
                                                                >
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ))
                                                    }
                                                </>
                                            ) : (
                                                <p className="text-center">No Courses Found</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={e?.path}>
                                        <p
                                            className={`${matchRoute(e?.path) ? "text-yellow-400" : "text-white"
                                                }`}
                                        >
                                            {e.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login/Signup/Dashboard */}
                <div className="flex gap-x-4 items-center">
                    {/* Display cart is the user is student */}
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-gray-100" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs font-bold text-yellow-500">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                    {/* Display Login and SignUp button if user is not logined ( token is null ) */}
                    {token === null && (
                        <Link to="/login">
                            <button className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md hover:scale-95 transition-all duration-100">
                                Login
                            </button>
                        </Link>
                    )}

                    {token === null && (
                        <Link to="/signup">
                            <button className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md hover:scale-95 transition-all duration-100">
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {/* If token is not null then display profile drop-down componenet */}
                    {token !== null && <ProfileDropDown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
