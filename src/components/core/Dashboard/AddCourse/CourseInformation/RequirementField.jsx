import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
    name,
    label,
    register,
    setValue,
    errors,
    getValues,
}) {
    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementsList, setRequirementsList] = useState([])

    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, requirementsList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementsList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirements = [...requirementsList]
        updatedRequirements.splice(index, 1)
        setRequirementsList(updatedRequirements)
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-50" htmlFor={name}>
                {label} <sup className="text-red-600">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="rounded-lg bg-gray-700 p-3 text-[16px] leading-[24px] text-gray-50 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none w-full"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-400"
                >
                    Add
                </button>
            </div>
            {requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementsList.map((requirement, index) => (
                        <li key={index} className="flex items-center text-gray-50">
                            <span>{requirement}</span>
                            <button
                                type="button"
                                className="ml-2 text-xs text-pure-greys-300 "
                                onClick={() => handleRemoveRequirement(index)}
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                    {label} is required
                </span>
            )}
        </div>
    )
}