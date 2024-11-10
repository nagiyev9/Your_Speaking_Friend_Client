import React, { useEffect, useState } from "react";
import Header from "../components/header/Header.jsx";
import Card from "../components/card/Card.jsx";
import FormSubmit from "../components/form submit/FormSubmit.jsx";
import { Spin } from "antd";
import Footer from "../components/footer/Footer.jsx";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          className="fixed inset-0 bg-White bg-opacity-50 flex justify-center items-center z-50"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col justify-center items-center">
            <Spin spinning={loading} size="large" />
            <span className="mt-4 text-xl font-semibold">Loading...</span>
          </div>
        </div>
      )}

      {/* Main Content (Visible after loading) */}
      <div className={loading ? "hidden" : ""}>
        <Header />
        <div
          className="bg-cover bg-fixed mr-5 h-[90vh] flex flex-col justify-center items-center text-center text-white space-y-6 px-6"
          style={{ backgroundImage: "url('img/background-3.png')" }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeIn">
            Welcome to{" "}
            <span className="text-yellow-300">Your Speaking Friend</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-slideUp">
            Elevate your English skills with a global community of language
            learners. Join today!
          </p>
          <a
            href="https://t.me/your_speaking_friend_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-yellow-300 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition ease-in-out duration-300"
          >
            Get Started
          </a>
        </div>

        <div className="container mx-auto px-6 py-12 space-y-16">
          {/* Introduction Section */}
          <section
            id="introduction"
            className="bg-white rounded-lg shadow-lg p-8 space-y-4 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform connects you with partners worldwide to enhance your
              English through engaging conversations. Whether you're aiming to
              boost fluency, expand vocabulary, or enjoy meaningful dialogue, we
              have you covered.
            </p>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <strong>🌐 Dynamic Pairing:</strong> Fresh connections for
                enriching experiences.
              </li>
              <li>
                <strong>💬 Engaging Topics:</strong> Explore thought-provoking
                themes and keep conversations lively.
              </li>
              <li>
                <strong>🗣️ Idioms & Expressions:</strong> Speak naturally with
                new expressions.
              </li>
              <strong>💛 Supportive Community:</strong> A fun, relaxed, and
              motivating environment to learn in.
            </ul>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-8 space-y-4 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-bold">Features</h2>
            <p className="text-white opacity-90 leading-relaxed">
              Ready to improve your English? With <em>Your Speaking Friend</em>,
              you’ll gain:
            </p>
            <ul className="mt-4 space-y-3 text-white opacity-90">
              <li>
                <strong>📝 Test Yourself:</strong> Challenge yourself with
                language tests anytime.
              </li>
              <li>
                <strong>📈 English Level Finder:</strong> Assess your level and
                track progress.
              </li>
              <li>
                <strong>🤝 Make New Friends:</strong> Find companions at your
                skill level.
              </li>
              <li>
                <strong>💡 Fresh Topics:</strong> Enjoy new topics and phrases
                every day.
              </li>
              <li>
                <strong>📚 Vocabulary Building:</strong> Learn new words daily
                to enhance fluency.
              </li>
            </ul>
          </section>

          {/* Command List Section */}
          <section
            id="command-list"
            className="bg-white rounded-lg shadow-lg p-8 space-y-4 transform hover:scale-105 transition duration-500 ease-in-out"
          >
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Command List
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Access bot features directly with these commands:
            </p>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <strong>/chat</strong> – Start a chat.
              </li>
              <li>
                <strong>/end</strong> – End a chat or leave the queue.
              </li>
              <li>
                <strong>/test</strong> – Take an English test.
              </li>
              <li>
                <strong>/myid</strong> – Get your chat ID.
              </li>
              <li>
                <strong>/help</strong> – See the full command list.
              </li>
            </ul>
          </section>

          <section id="actions">
            <div className="container my-5">
              <div className="row">
                <Card
                  title="Contact Us"
                  description="Our Instagram Account"
                  bgColor="bg-success"
                  link="https://www.instagram.com/your.speaking.friend"
                  linkText="Instagram Account"
                />
                <Card
                  title="Telegram Link"
                  description="Our Telegram Bot Link"
                  bgColor="bg-primary"
                  link="https://t.me/your_speaking_friend_bot"
                  linkText="Go to Telegram Bot"
                />
              </div>
            </div>
          </section>
        </div>

        <FormSubmit />
        <Footer />
      </div>
    </>
  );
};

export default Home;
