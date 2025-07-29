import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserProvider } from "./context/UserContext";
import { ProgressProvider } from "./context/ProgressContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AchievementsProvider } from "./context/AchievementsContext";
import { SidebarProvider } from "./context/SidebarContext";
import { StudyTimeProvider } from "./context/StudyTimeContext";
import { PersonalizationProvider } from "./context/PersonalizationContext";
import { SocialProvider } from "./context/SocialContext";
import { HintsProvider } from "./context/HintsContext";
import { ReviewProvider } from "./context/ReviewContext";
import { MotivationProvider } from "./context/MotivationContext";
import Navbar from "./components/Navbar";
import ProgressMap from "./components/ProgressMap";
import LessonStats from "./components/LessonStats";
import Home from "./pages/Home";
import Level from "./pages/Level";
import Reference from "./pages/Reference";
import AchievementsPage from "./pages/AchievementsPage";
import SocialPage from "./pages/SocialPage";
import Support from "./components/Support/Support";
import Premium from "./components/Premium/Premium";
import AdvancedPractice from "./components/AdvancedPractice";
import ProjectPractice from "./components/ProjectPractice";
import MotivationSystem from "./components/MotivationSystem";
import Level1Unit1 from "./pages/lessons/Level1Unit1";
import Level1Unit2 from "./pages/lessons/Level1Unit2";
import Level1Unit3 from "./pages/lessons/Level1Unit3";
import Level1Unit4 from "./pages/lessons/Level1Unit4";
import Level1Unit5 from "./pages/lessons/Level1Unit5";
import Level1Unit6 from "./pages/lessons/Level1Unit6";
import Level1Unit7 from "./pages/lessons/Level1Unit7";
import Level1Unit8 from "./pages/lessons/Level1Unit8";
import Level1Unit9 from "./pages/lessons/Level1Unit9";
import Level1Unit10 from "./pages/lessons/Level1Unit10";
import Level1Unit11 from "./pages/lessons/Level1Unit11";
import Level2Unit1 from "./pages/lessons/Level2Unit1";
import Level2Unit2 from "./pages/lessons/Level2Unit2";
import Level2Unit3 from "./pages/lessons/Level2Unit3";
import Level2Unit4 from "./pages/lessons/Level2Unit4";
import Level2Unit5 from "./pages/lessons/Level2Unit5";
import Navigation from "./components/Navigation";
import ReviewNotifications from "./components/ReviewNotifications";
import ReviewSystem from "./components/ReviewSystem";
import ReviewStats from "./components/ReviewStats";
import CustomFlashcards from "./components/CustomFlashcards";
import SocialChat from "./components/SocialChat";
import GroupTasks from "./components/GroupTasks";
import Review from "./components/Review";
import Chat from "./components/Chat";
import Leaderboard from "./components/Leaderboard";
import Achievements from "./components/Achievements";
import Practice from "./pages/Practice";
import Progress from "./components/Progress";
import VisualEditor from "./components/VisualEditor";
import InterviewPrep from "./pages/InterviewPrep";
import ResumeBuilder from "./pages/ResumeBuilder";
import DOMVisualizer from "./components/DOMVisualizer";
import CodeVsDesign from "./components/CodeVsDesign";
import ErrorAnalysis from "./components/ErrorAnalysis";
import "./App.css";
import Profile from "./pages/Profile";
import AvatarWrapper from "./components/AvatarWrapper";
import PersonalizationSettings from "./components/PersonalizationSettings";
import MiniSite from "./components/MiniSite";
import CollaborationHub from "./components/CollaborationHub";
import PythonCourse from "./pages/PythonCourse";
import HTMLCourse from "./pages/HTMLCourse";
import HTMLLesson1 from "./pages/html-lessons/HTMLLesson1";
import CSSCourse from "./pages/CSSCourse";
import JavaScriptCourse from "./pages/JavaScriptCourse";
import JSLibrariesCourse from "./pages/JSLibrariesCourse";
import Courses from "./pages/Courses";
import Login from "./components/Login";
import Register from "./components/Register";
import FriendsProgress from "./components/FriendsProgress";
import FriendsProgressPage from "./pages/FriendsProgressPage";
import CryptoTradingCourse from "./pages/CryptoTradingCourse";
import CryptoLesson1 from "./pages/crypto-lessons/CryptoLesson1";
import CryptoLesson2 from "./pages/crypto-lessons/CryptoLesson2";
import ExpressLesson1 from "./pages/express-lessons/ExpressLesson1";
import ExpressLesson2 from "./pages/express-lessons/ExpressLesson2";
import WebSocketLesson1 from "./pages/websocket-lessons/WebSocketLesson1";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProgressProvider>
          <AchievementsProvider>
            <HintsProvider>
              <SocialProvider>
                <ReviewProvider>
                  <MotivationProvider>
                    <PersonalizationProvider>
                      <SidebarProvider>
                        <StudyTimeProvider>
                          <Router>
                            <AppContent />
                          </Router>
                        </StudyTimeProvider>
                      </SidebarProvider>
                    </PersonalizationProvider>
                  </MotivationProvider>
                </ReviewProvider>
              </SocialProvider>
            </HintsProvider>
          </AchievementsProvider>
        </ProgressProvider>
      </UserProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  // Показываем загрузку
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-xl">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Если пользователь не авторизован, показываем страницы авторизации
  // if (!user) {
  //   return (
  //     <Routes>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="*" element={<Navigate to="/login" replace />} />
  //     </Routes>
  //   );
  // }

  // Если пользователь авторизован, показываем полное приложение
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/friends-progress" element={<FriendsProgressPage />} />
          <Route path="/support" element={<Support />} />
          {/* <Route path="/premium" element={<Premium />} /> */}
          <Route path="/advanced-practice" element={<AdvancedPractice />} />
          <Route path="/projects" element={<ProjectPractice />} />
          <Route path="/motivation" element={<MotivationSystem />} />
          <Route path="/level/:levelId" element={<Level />} />
          <Route path="/level/1/unit/1" element={<Level1Unit1 />} />
          <Route path="/level/1/unit/2" element={<Level1Unit2 />} />
          <Route path="/level/1/unit/3" element={<Level1Unit3 />} />
          <Route path="/level/1/unit/4" element={<Level1Unit4 />} />
          <Route path="/level/1/unit/5" element={<Level1Unit5 />} />
          <Route path="/level/1/unit/6" element={<Level1Unit6 />} />
          <Route path="/level/1/unit/7" element={<Level1Unit7 />} />
          <Route path="/level/1/unit/8" element={<Level1Unit8 />} />
          <Route path="/level/1/unit/9" element={<Level1Unit9 />} />
          <Route path="/level/1/unit/10" element={<Level1Unit10 />} />
          <Route path="/level/1/unit/11" element={<Level1Unit11 />} />
          <Route path="/level/2/unit/1" element={<Level2Unit1 />} />
          <Route path="/level/2/unit/2" element={<Level2Unit2 />} />
          <Route path="/level/2/unit/3" element={<Level2Unit3 />} />
          <Route path="/level/2/unit/4" element={<Level2Unit4 />} />
          <Route path="/level/2/unit/5" element={<Level2Unit5 />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/stats" element={<ReviewStats />} />
          <Route path="/review/custom" element={<CustomFlashcards />} />
          <Route path="/social/chat" element={<Chat />} />
          <Route path="/social/tasks" element={<GroupTasks />} />
          <Route path="/social/leaderboard" element={<Leaderboard />} />
          <Route path="/social/achievements" element={<Achievements />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/visual-editor" element={<VisualEditor />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/dom-visualizer" element={<DOMVisualizer />} />
          <Route path="/code-vs-design" element={<CodeVsDesign />} />
          <Route path="/error-analysis" element={<ErrorAnalysis />} />
          <Route path="/personalization" element={<PersonalizationSettings />} />
          <Route path="/mini-site" element={<MiniSite />} />
          <Route path="/collaboration" element={<CollaborationHub />} />
          <Route path="/python-course" element={<PythonCourse />} />
          <Route path="/html-course" element={<HTMLCourse />} />
          <Route path="/html-course/lesson/1" element={<HTMLLesson1 />} />
          <Route path="/css-course" element={<CSSCourse />} />
                  <Route path="/javascript-course" element={<JavaScriptCourse />} />
        <Route path="/js-libraries-course" element={<JSLibrariesCourse />} />
        <Route path="/js-libraries-course/:libraryId/lesson/:lessonId" element={<JSLibrariesCourse />} />
        <Route path="/js-libraries-course/express/lesson/1" element={<ExpressLesson1 />} />
        <Route path="/js-libraries-course/express/lesson/2" element={<ExpressLesson2 />} />
        <Route path="/js-libraries-course/websocket/lesson/1" element={<WebSocketLesson1 />} />
        <Route path="/crypto-trading-course" element={<CryptoTradingCourse />} />
        <Route path="/crypto-trading-course/unit/1" element={<CryptoLesson1 />} />
        <Route path="/crypto-trading-course/unit/2" element={<CryptoLesson2 />} />
        <Route path="/crypto-trading-course/unit/:unitId" element={<CryptoTradingCourse />} />
        <Route path="/courses" element={<Courses />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* <Navigation /> */}
      <ReviewNotifications />
      <AvatarWrapper />
    </div>
  );
}

export default App;
