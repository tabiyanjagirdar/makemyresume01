import { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PostCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const [otherCategory, setOtherCategory] = useState("");
    const [courses, setCourses] = useState([]);

    const categories = ["Web Development", "Data Science", "AI & ML", "Programming", "Other"];

    const fetchCourses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "courses"));
            const now = new Date();
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(now.getDate() - 7);

            const allCourses = querySnapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                return { id: docSnap.id, ...data };
            });

            // Auto-delete old courses (>7 days)
            allCourses.forEach(async (course) => {
                if (course.createdAt) {
                    const courseDate = course.createdAt.toDate ? course.createdAt.toDate() : new Date(course.createdAt);
                    if (courseDate < oneWeekAgo) {
                        await deleteDoc(doc(db, "courses", course.id));
                    }
                }
            });

            // Filter courses newer than 7 days
            const filteredCourses = allCourses.filter((course) => {
                if (!course.createdAt) return true;
                const courseDate = course.createdAt.toDate ? course.createdAt.toDate() : new Date(course.createdAt);
                return courseDate >= oneWeekAgo;
            });

            // Sort newest first
            const sortedCourses = filteredCourses.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA;
            });

            setCourses(sortedCourses);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = "";
            if (image) {
                const imageRef = ref(storage, `courseImages/${Date.now()}_${image.name}`);
                await uploadBytes(imageRef, image);
                imageUrl = await getDownloadURL(imageRef);
            }

            const finalCategory = category === "Other" ? otherCategory : category;

            await addDoc(collection(db, "courses"), {
                title,
                description,
                link,
                imageUrl,
                category: finalCategory,
                createdAt: new Date(),
            });

            alert("✅ Course added successfully!");
            setTitle("");
            setDescription("");
            setLink("");
            setImage(null);
            setCategory("");
            setOtherCategory("");
            fetchCourses();
        } catch (err) {
            console.error("Error adding course:", err);
            alert("❌ Failed to add course");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await deleteDoc(doc(db, "courses", id));
            setCourses(courses.filter((c) => c.id !== id));
            alert("✅ Course deleted successfully!");
        } catch (err) {
            console.error("Error deleting course:", err);
            alert("❌ Failed to delete course");
        }
    };

    const getDateLabel = (date) => {
        const courseDate = date?.toDate ? date.toDate() : new Date(date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (
            courseDate.getDate() === today.getDate() &&
            courseDate.getMonth() === today.getMonth() &&
            courseDate.getFullYear() === today.getFullYear()
        ) return "Today";

        if (
            courseDate.getDate() === yesterday.getDate() &&
            courseDate.getMonth() === yesterday.getMonth() &&
            courseDate.getFullYear() === yesterday.getFullYear()
        ) return "Yesterday";

        return courseDate.toLocaleDateString();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Panel - Add Course</h2>

            <form className="flex flex-col gap-3 max-w-md" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="Course Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Course Link (YouTube / Website)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border p-2 rounded"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                {category === "Other" && (
                    <input
                        type="text"
                        placeholder="Enter category"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        required
                        className="border p-2 rounded"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Course
                </button>
            </form>

            <h3 className="text-xl font-semibold mt-8 mb-4">All Courses</h3>
            {courses.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course.id} className="p-4 border rounded shadow relative">
                            {course.imageUrl && (
                                <img
                                    src={course.imageUrl}
                                    alt={course.title}
                                    className="w-full h-40 object-cover rounded mb-2"
                                />
                            )}
                            <h4 className="font-semibold">{course.title}</h4>
                            <p className="text-gray-600 text-sm">{course.description}</p>
                            <p className="text-xs text-gray-500 italic">
                                {course.category} | {getDateLabel(course.createdAt)}
                            </p>
                            <a
                                href={course.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline text-sm mt-1 inline-block"
                            >
                                Go to Course
                            </a>
                            <button
                                onClick={() => handleDelete(course.id)}
                                className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
}

export default PostCourse;
