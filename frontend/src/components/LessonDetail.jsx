import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";
import Reviews from "./Reviews";

function LessonDetail() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);
  const [prevLesson, setPrevLesson] = useState(null);

  useEffect(() => {



    api.get(`/lessons/${id}/`).then((response) => {
      setLesson(response.data);

      const currentLessonId = parseInt(id);

      api
        .get(`/lessons/${currentLessonId + 1}/`)

        .then((response) => setNextLesson(response.data))
        .catch(() => setNextLesson(null));

      api
        .get(`/lessons/${currentLessonId - 1}/`)
        .then((response) => setPrevLesson(response.data))
        .catch(() => setPrevLesson(null));
    });



    api
      .get(`/reviews/?lesson=${id}`)
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]));


    const trackProgress = async () => {
      try {

        await api.post("/track-progress/", {

          lesson_id: id,
          progress_percentage: 10, 

        });
      } catch (err) {


        console.error("Progress tracking failed:", err);

      }
    };

    if (id) {
      trackProgress();
    }
  }, [id]);


  const handleNewReview = (review) => {

    setReviews((prev) => [...prev, review]);

  };

  if (!lesson) {

    return <p className="text-center mt-10 text-gray-500">Loading lesson...</p>;

  }

  function formatYouTubeLink(url) {

    if (!url) return null;

    if (url.includes("watch?v=")) {

      return url.replace("watch?v=", "embed/");
    }


    if (url.includes("youtu.be/")) {

      const videoId = url.split("youtu.be/")[1].split("?")[0];

      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }

  return (
    <>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10">


        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>

          <p className="text-indigo-100">

            Category:{" "}

            <span className="font-semibold">{lesson.category?.name}</span>
          </p>

        </div>
      </div>


      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">


        <div className="lg:col-span-2 space-y-8">

          {lesson.video_url && (
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">

              <iframe
                className="w-full h-full"
                src={formatYouTubeLink(lesson.video_url)}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

            </div>
          )}


          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Lesson Notes
            </h2>
            <div className="prose prose-indigo max-w-none">{lesson.content}</div>
          </div>



          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Student Reviews
            </h2>

            <Reviews
              lessonId={id}
              reviews={reviews}
              onNewReview={handleNewReview}
            />
          </div>
        </div>


        <aside className="space-y-6">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Lesson Info
            </h3>

            <ul className="text-gray-700 space-y-2">

              <li>
                <span className="font-medium">Category:</span>{" "}
                {lesson.category?.name}
              </li>

              <li>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(lesson.created_at).toLocaleDateString()}
              </li>

            </ul>
          </div>


          {nextLesson && (
            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Next Lesson
              </h3>

              <Link
                to={`/lessons/${parseInt(id) + 1}`}
                className="block p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
              >

                <p className="font-medium text-indigo-600">
                  {nextLesson.title}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {nextLesson.category?.name}
                </p>

              </Link>

            </div>
          )}

          
          <div className="bg-white p-6 rounded-xl shadow">

            <Link
              to="/lessons"
              className="block w-full text-center rounded-lg bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
            >

              Back to Lessons
            </Link>

          </div>
        </aside>

      </div>

      {/* Bottom Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-10 flex justify-between">

        {prevLesson ? (
          <Link
            to={`/lessons/${parseInt(id) - 1}`}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >

            ← Previous Lesson
          </Link>
        ) : (
          <div></div>
        )}

        {nextLesson ? (

          <Link
            to={`/lessons/${parseInt(id) + 1}`}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Next Lesson →
          </Link>
        ) : (
          <div></div>
        )}
        
      </div>
    </>
  );
}

export default LessonDetail;




