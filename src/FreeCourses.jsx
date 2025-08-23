import { useState } from "react";

export default function FreeCourses() {
    const [courses] = useState([
        {
            id: 1,
            title: "Python Basics",
            description: "Learn the fundamentals of Python programming.",
            thumbnail: "https://via.placeholder.com/400x200",
            category: "Programming",
            duration: "3h 20m",
            level: "Beginner",
        },
        {
            id: 2,
            title: "Web Development",
            description: "HTML, CSS, JavaScript basics for beginners.",
            thumbnail: "https://via.placeholder.com/400x200",
            category: "Web",
            duration: "5h",
            level: "Beginner",
        },
        {
            id: 3,
            title: "Data Analysis",
            description: "Introduction to data analysis with Excel & Python.",
            thumbnail: "https://via.placeholder.com/400x200",
            category: "Data",
            duration: "4h 10m",
            level: "Intermediate",
        },
    ]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">🎓 Free Courses</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="rounded-2xl shadow-md hover:shadow-lg transition bg-white"
                    >
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-40 object-cover rounded-t-2xl"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{course.title}</h2>
                            <p className="text-gray-600 text-sm mt-1">
                                {course.description.slice(0, 80)}...
                            </p>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>{course.category}</span>
                                <span>{course.duration}</span>
                            </div>
                            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                                View Course
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
