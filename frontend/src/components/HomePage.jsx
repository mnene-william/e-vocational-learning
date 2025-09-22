import React from "react";
import Navbar from "./Navbar";

function HomePage() {
  const skills = [
    { name: "Coding", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { name: "Tailoring", icon: "✂️", color: "from-pink-500 to-rose-500" },
    { name: "Cooking", icon: "🍳", color: "from-orange-500 to-yellow-500" },
    { name: "Welding", icon: "🔧", color: "from-gray-600 to-gray-800" },
    { name: "Design", icon: "🎨", color: "from-purple-500 to-indigo-500" },
    { name: "Entrepreneurship", icon: "📈", color: "from-green-500 to-emerald-500" },

  ];

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

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in-up">

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Master Skills for Real Life.
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80">
            From coding to cooking, tailoring to welding — unlock your potential
            with hands-on lessons powered by AI.
          </p>

        </div>
      </main>

      {/* Skills Categories */}
      <section className="py-16 bg-gray-50 text-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Skills
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">

            {skills.map((skill, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-gradient-to-br ${skill.color} text-white hover:scale-105 transform transition`}
              >

                <span className="text-4xl mb-2">{skill.icon}</span>
                <span className="font-semibold">{skill.name}</span>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-white text-gray-900">

        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Courses
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gray-100 rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
              <img
                src="https://images.unsplash.com/photo-1581092160622-1e7e6f90c3b2?auto=format&fit=crop&w=800&q=80"
                alt="Coding"
                className="rounded-lg mb-4"
              />

              <h3 className="font-bold text-xl mb-2">Intro to Coding</h3>

              <p className="text-gray-600 mb-4">
                Learn programming basics and build your first app.
              </p>
              
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
                Start Learning
              </button>

            </div>

            <div className="bg-gray-100 rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
              <img
                src="https://images.unsplash.com/photo-1586277998461-8ec9a6eaa5a5?auto=format&fit=crop&w=800&q=80"
                alt="Cooking"
                className="rounded-lg mb-4"
              />

              <h3 className="font-bold text-xl mb-2">Cooking Basics</h3>

              <p className="text-gray-600 mb-4">
                Master kitchen skills and delicious recipes step by step.
              </p>

              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                Start Learning
              </button>

            </div>

            <div className="bg-gray-100 rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
              <img
                src="https://images.unsplash.com/photo-1601039641849-3e80a25f3a5a?auto=format&fit=crop&w=800&q=80"
                alt="Welding"
                className="rounded-lg mb-4"
              />

              <h3 className="font-bold text-xl mb-2">Welding Basics</h3>

              <p className="text-gray-600 mb-4">
                Get started with metalwork, safety, and welding techniques.
              </p>

              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                Start Learning
              </button>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;




