import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-800 text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center px-6 py-20 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Learn. Practice. Grow.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl mb-8 text-gray-100">
          Master new skills with interactive lessons, AI-powered quizzes, and progress tracking – all in one place.
        </p>
        <div className="flex space-x-4">
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg hover:bg-gray-100"
            >
              Get Started
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg border border-white px-6 py-3 font-semibold text-white shadow-lg hover:bg-white hover:text-indigo-600"
            >
              Log In
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="px-6 py-16 bg-white text-gray-800 rounded-t-3xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gray-100 p-6 shadow-md text-center"
          >
            <h3 className="text-xl font-semibold mb-3">📚 Interactive Lessons</h3>
            <p className="text-gray-600">
              Learn with structured, easy-to-follow lessons designed for your growth.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gray-100 p-6 shadow-md text-center"
          >
            <h3 className="text-xl font-semibold mb-3">📝 AI-Powered Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with smart quizzes that adapt to your level.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gray-100 p-6 shadow-md text-center"
          >
            <h3 className="text-xl font-semibold mb-3">⭐ Reviews & Feedback</h3>
            <p className="text-gray-600">
              Share insights, give feedback, and learn from others in the community.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-xl bg-gray-100 p-6 shadow-md text-center"
          >
            <h3 className="text-xl font-semibold mb-3">📈 Track Your Progress</h3>
            <p className="text-gray-600">
              Stay motivated by tracking your learning journey in real time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="px-6 py-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Your Learning Journey Today 🚀
        </h2>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg hover:bg-gray-100"
          >
            Join Now
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
}

export default HomePage;
