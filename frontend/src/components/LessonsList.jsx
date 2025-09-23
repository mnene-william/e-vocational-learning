import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function LessonsList() {
  const [lessons, setLessons] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    api.get("/lessons/").then((response) => {
      setLessons(response.data);
    });

  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Lessons</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         
        {lessons.map((lesson) => (
          

          <div
            key={lesson.id}
            onClick={() => navigate(`/lessons/${lesson.id}`)}
            className="cursor-pointer rounded-2xl shadow hover:shadow-lg transition bg-white border overflow-hidden"
          >


            
            <div className="h-48 w-full overflow-hidden rounded-t-2xl">

              <img src={lesson.placeholder_image ? lesson.placeholder_image : "https://via.placeholder.com/400x250?text=Lesson"} alt={lesson.title} className="w-full h-full object-cover transform hover:scale-105 transition duration-300"/>
            </div>

            
            <div className="p-4">
                
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {lesson.title}
              </h2>

              <p className="text-sm text-gray-500">
                {lesson.category?.name}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default LessonsList;

