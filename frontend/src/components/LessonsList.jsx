import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    api.get("/lessons/").then((response) => {

      setLessons(response.data);
    });
     
  }, []);

  return (
    <>
     

      
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 mb-8">

        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Available Lessons</h1>

          <p className="mt-2 text-indigo-100">

            Browse through all lessons and start learning today.
          </p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 pb-12">

        {lessons.length === 0 ? (

          <p className="text-center text-gray-500">No lessons available.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {lessons.map((lesson) => (

              <div
                key={lesson.id}
                onClick={() => navigate(`/lessons/${lesson.id}`)}
                className="group cursor-pointer rounded-2xl bg-white border shadow-sm hover:shadow-xl transition overflow-hidden">
              

                
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={
                      lesson.placeholder_image ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={lesson.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                </div>


                
                <div className="p-5 flex flex-col justify-between h-40">
                  <div>

                    <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                      {lesson.title}
                    </h2>

                    <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full">
                      {lesson.category?.name || "General"}
                    </span>

                  </div>

                  <button className="mt-4 w-full rounded-lg bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-700 transition"
                    
                    onClick={(e) => {

                      e.stopPropagation(); 

                      navigate(`/lessons/${lesson.id}`);
                    }}
                  >

                    View Lesson →
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default LessonsList;


