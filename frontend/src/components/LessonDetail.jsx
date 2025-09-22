import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {

    api.get(`/lessons/${id}/`).then((response) => {

      setLesson(response.data);
    });

  }, [id]);

  if (!lesson) {

    return <p className="text-center mt-10 text-gray-500">Loading lesson...</p>;
  }




function formatYouTubeUrl(url) {
  if (!url) return null;


  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // handle youtu.be short links
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url; // fallback
}

// Extract video ID for thumbnail
function extractYouTubeId(url) {
    
  if (!url) return null;

  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1].split("&")[0];
  }

  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1].split("?")[0];
  }

  return null;
}


  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {lesson.title}
      </h1>

      <p className="text-gray-600 mb-6">
        Category: <span className="font-medium">{lesson.category?.name}</span>
      </p>



      {lesson.video_url && (
          <div className="mb-6 relative">

             <iframe
                className="w-full h-64 sm:h-96 rounded-lg shadow"
                src={formatYouTubeUrl(lesson.video_url)}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen

              onError={(e) => {
                 e.target.style.display = "none"; // hide iframe

                 const thumbnail = document.getElementById(`thumb-${lesson.id}`);

                 if (thumbnail) thumbnail.style.display = "block"; // show thumbnail

               }}
            ></iframe>

    {/* Thumbnail Fallback */}
            <img
               id={`thumb-${lesson.id}`}
               src={`https://img.youtube.com/vi/${extractYouTubeId(lesson.video_url)}/hqdefault.jpg`}

              alt={`${lesson.title} thumbnail`}

              className="hidden w-full h-64 sm:h-96 object-cover rounded-lg shadow"
            />
          </div>
  )}


      {/* Notes */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Lesson Notes</h2>

        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
          {lesson.content}
        </div>

      </div>
    </div>
  );
}
