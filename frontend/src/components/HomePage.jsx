import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import api from "../api";

export default function HomePage() {
  const [skills, setSkills] = useState([]);
  const [lessons, setLessons] = useState([]);

  const navigate = useNavigate()


  useEffect(() => {
    api.get("/skills/").then((res) => {
      setSkills(res.data);
    }).catch((err) => console.error("Error fetching skills:", err));
  }, []);



  useEffect(() => {
    
    api.get("/lessons/").then((res) => {
      setLessons(res.data);
    }).catch((err) => console.error("Error fetching lessons:", err));
  }, []);

  return (
    <>
      <Navbar />

 
      <main
        className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-4 pt-32 font-display overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Master Skills for Real Life
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            From coding to cooking, tailoring to welding — unlock your potential
            with hands-on lessons
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">

            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105">
              Get Started
            </button>

            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-sm border border-white/30 transition transform hover:scale-105">
              Learn More
            </button>

          </div>
        </div>
      </main>

  
      <section className="py-16 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {skills.map((skill) => (

              <div
                key={skill.id}
                className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:scale-105 transform transition duration-300"
              >
                <span className="text-4xl mb-2"></span>
                <span className="font-semibold">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16 bg-white text-gray-900">
        <div className="container mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Courses
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-gray-100 rounded-xl shadow-lg overflow-hidden transform transition hover:shadow-2xl hover:-translate-y-1"
              >
               
                <img
                  src={`https://via.placeholder.com/400x250?text=${lesson.title}`}
                  alt={lesson.title}
                  className="rounded-t-xl w-full h-48 object-cover"
                />
                <div className="p-6">

                  <h3 className="font-bold text-xl mb-2">{lesson.title}</h3>

                  <p className="text-gray-600 mb-4">
                    Category: {lesson.category?.name}
                  </p>

                  <button 
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >

                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}




