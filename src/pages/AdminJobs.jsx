// src/pages/AdminJobs.jsx
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Simple slugify
const slugify = (str) =>
    str
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

export default function AdminJobs() {
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("IT");
    const [description, setDescription] = useState("");
    const [applyLink, setApplyLink] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [editingId, setEditingId] = useState(null);
    const [editingImagePath, setEditingImagePath] = useState(null);

    // Fetch jobs
    const fetchJobs = async () => {
        try {
            const snap = await getDocs(collection(db, "jobs"));
            const list = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => {
                    const aTime = a.createdAt?.toDate?.() || new Date(0);
                    const bTime = b.createdAt?.toDate?.() || new Date(0);
                    return bTime - aTime;
                });
            setJobs(list);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // ensure unique slug
    const makeUniqueSlug = async (base) => {
        const s = slugify(base);
        const q = query(collection(db, "jobs"), where("slug", "==", s));
        const snap = await getDocs(q);
        if (snap.empty) return s;
        return `${s}-${Date.now()}`;
    };

    const resetForm = () => {
        setCompany("");
        setRole("");
        setLocation("");
        setCategory("IT");
        setDescription("");
        setApplyLink("");
        setImageFile(null);
        setEditingId(null);
        setEditingImagePath(null);
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!company || !role || !applyLink) {
            alert("Company, Role, and Apply Link are required!");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = "";
            let imagePath = "";

            if (imageFile) {
                imagePath = `jobs/${Date.now()}_${imageFile.name}`;
                const storageRef = ref(storage, imagePath);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            if (editingId) {
                const docRef = doc(db, "jobs", editingId);
                const updateData = { company, role, location, category, description, applyLink };
                if (imageFile) {
                    if (editingImagePath) await deleteObject(ref(storage, editingImagePath)).catch(console.warn);
                    updateData.imageUrl = imageUrl;
                    updateData.imagePath = imagePath;
                }
                await updateDoc(docRef, updateData);
                alert("Job updated successfully!");
            } else {
                const slug = await makeUniqueSlug(`${company} ${role}`);
                await addDoc(collection(db, "jobs"), {
                    company,
                    role,
                    location,
                    category,
                    description,
                    applyLink,
                    imageUrl: imageUrl || "",
                    imagePath: imagePath || "",
                    slug,
                    createdAt: serverTimestamp(),
                });
                alert("Job added successfully!");
            }

            resetForm();
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert("Failed to save job!");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (job) => {
        setEditingId(job.id);
        setCompany(job.company || "");
        setRole(job.role || "");
        setLocation(job.location || "");
        setCategory(job.category || "IT");
        setDescription(job.description || "");
        setApplyLink(job.applyLink || "");
        setEditingImagePath(job.imagePath || null);
        setImageFile(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (job) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            if (job.imagePath) await deleteObject(ref(storage, job.imagePath)).catch(console.warn);
            await deleteDoc(doc(db, "jobs", job.id));
            alert("Job deleted successfully!");
            fetchJobs();
        } catch (err) {
            console.error(err);
            alert("Delete failed!");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{editingId ? "Edit Job" : "Add Job"}</h2>

            <form onSubmit={handleAddOrUpdate} className="grid gap-3 bg-white p-4 rounded shadow">
                <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" className="border px-3 py-2 rounded" />
                <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="border px-3 py-2 rounded" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="border px-3 py-2 rounded" />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded">
                    <option value="IT">IT</option>
                    <option value="Non-IT">Non-IT</option>
                    <option value="Govt">Govt</option>
                </select>
                <input value={applyLink} onChange={(e) => setApplyLink(e.target.value)} placeholder="Apply Link" className="border px-3 py-2 rounded" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" className="border px-3 py-2 rounded min-h-[100px]" />
                <div>
                    <label className="inline-block mb-1 font-medium">Image (optional)</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0] || null)} />
                    {editingImagePath && !imageFile && <p className="text-sm text-gray-600 mt-1">Existing image will remain unless replaced.</p>}
                </div>

                <div className="flex gap-2">
                    <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">{loading ? "Saving..." : editingId ? "Update Job" : "Add Job"}</button>
                    <button type="button" onClick={resetForm} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
                </div>
            </form>

            <h3 className="text-xl font-semibold mt-8 mb-4">All Jobs</h3>
            <div className="grid gap-4">
                {jobs.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg bg-white flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-lg">{job.company} — <span className="font-medium text-sm">{job.role}</span></h4>
                            <p className="text-sm text-gray-600">{job.location} • {job.category}</p>
                            <p className="text-xs text-gray-400 mt-1">slug: <code>{job.slug}</code></p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(job)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
                            <button onClick={() => handleDelete(job)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
