"use client";

import React, { useState, useEffect, useRef } from "react";

const SpeechToText = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);
  const silenceTimeoutRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening continuously
    recognition.interimResults = true; // Get partial results

    recognition.onresult = (event) => {
      resetSilenceTimeout(); // reset timer whenever speech is detected

      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptChunk + " ");
        } else {
          interimTranscript += transcriptChunk;
        }
      }
      // Optionally, you could show interimTranscript here if you want
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
      clearSilenceTimeout();
    };

    recognition.onend = () => {
      setListening(false);
      clearSilenceTimeout();
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      clearSilenceTimeout();
    };
  }, []);

  const clearSilenceTimeout = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  const resetSilenceTimeout = () => {
    clearSilenceTimeout();
    silenceTimeoutRef.current = setTimeout(() => {
      // Stop recognition after 20 seconds of silence
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setListening(false);
      }
    }, 20000); // 20 seconds
  };

  const startListening = () => {
    if (!listening && recognitionRef.current) {
      setTranscript("");
      setListening(true);
      recognitionRef.current.start();
      resetSilenceTimeout();
    }
  };

  const stopListening = () => {
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      clearSilenceTimeout();
    }
  };

  return (
    <div>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? "Stop 🎤" : "Start 🎤"}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToText;

// "use client";

// import React, { useState } from "react";
// import {
//   Clock,
//   CheckCircle,
//   AlertTriangle,
//   Star,
//   TrendingUp,
//   Award,
//   BookOpen,
//   Target,
//   BarChart3,
//   Download,
//   Share2,
//   RefreshCw,
//   ArrowRight,
//   User,
//   Calendar,
//   Trophy,
//   Lightbulb,
//   MessageSquare,
//   Filter,
//   Search,
//   Eye,
//   MoreVertical,
//   ChevronDown,
//   Play,
// } from "lucide-react";

// const MockInterviewHistory = () => {
//   const [filterBy, setFilterBy] = useState("all");
//   const [sortBy, setSortBy] = useState("recent");
//   const [searchTerm, setSearchTerm] = useState("");

//   // Mock data for interview history
//   const interviewHistory = [
//     {
//       id: "INT-001",
//       technology: "React.js",
//       jobRole: "Frontend Developer",
//       difficulty: "Advanced",
//       interviewType: "Technical",
//       completedAt: "2025-05-27",
//       duration: "12m 34s",
//       overallScore: 85,
//       totalQuestions: 5,
//       status: "completed",
//       feedback: "Excellent performance with strong technical knowledge",
//     },
//     {
//       id: "INT-002",
//       technology: "Node.js",
//       jobRole: "Backend Developer",
//       difficulty: "Intermediate",
//       interviewType: "Technical",
//       completedAt: "2025-05-25",
//       duration: "10m 45s",
//       overallScore: 78,
//       totalQuestions: 4,
//       status: "completed",
//       feedback: "Good understanding, room for improvement in optimization",
//     },
//     {
//       id: "INT-003",
//       technology: "JavaScript",
//       jobRole: "Full Stack Developer",
//       difficulty: "Beginner",
//       interviewType: "Behavioral",
//       completedAt: "2025-05-23",
//       duration: "8m 21s",
//       overallScore: 92,
//       totalQuestions: 3,
//       status: "completed",
//       feedback: "Outstanding communication and problem-solving approach",
//     },
//     {
//       id: "INT-004",
//       technology: "Python",
//       jobRole: "Data Scientist",
//       difficulty: "Advanced",
//       interviewType: "Technical",
//       completedAt: "2025-05-20",
//       duration: "15m 12s",
//       overallScore: 67,
//       totalQuestions: 6,
//       status: "completed",
//       feedback: "Solid foundation, focus on advanced algorithms",
//     },
//     {
//       id: "INT-005",
//       technology: "React.js",
//       jobRole: "Frontend Developer",
//       difficulty: "Intermediate",
//       interviewType: "Mixed",
//       completedAt: "2025-05-18",
//       duration: "9m 56s",
//       overallScore: 74,
//       totalQuestions: 4,
//       status: "completed",
//       feedback: "Good technical skills, improve explanation clarity",
//     },
//     {
//       id: "INT-006",
//       technology: "Java",
//       jobRole: "Backend Developer",
//       difficulty: "Advanced",
//       interviewType: "Technical",
//       completedAt: "2025-05-15",
//       duration: "3m 45s",
//       overallScore: 0,
//       totalQuestions: 1,
//       status: "incomplete",
//       feedback: "Session incomplete - connection lost",
//     },
//   ];

//   const getScoreColor = (score) => {
//     if (score >= 80) return "text-green-600";
//     if (score >= 70) return "text-yellow-600";
//     if (score === 0) return "text-gray-500";
//     return "text-red-600";
//   };

//   const getScoreBg = (score) => {
//     if (score >= 80) return "bg-green-100";
//     if (score >= 70) return "bg-yellow-100";
//     if (score === 0) return "bg-gray-100";
//     return "bg-red-100";
//   };

//   const getStatusBadge = (status, score) => {
//     if (status === "incomplete") {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//           <AlertTriangle className="w-3 h-3 mr-1" />
//           Incomplete
//         </span>
//       );
//     }

//     if (score >= 80) {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//           <Award className="w-3 h-3 mr-1" />
//           Excellent
//         </span>
//       );
//     }

//     if (score >= 70) {
//       return (
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//           <Star className="w-3 h-3 mr-1" />
//           Good
//         </span>
//       );
//     }

//     return (
//       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//         <TrendingUp className="w-3 h-3 mr-1" />
//         Needs Work
//       </span>
//     );
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//       case "beginner":
//         return "bg-green-100 text-green-800";
//       case "intermediate":
//         return "bg-yellow-100 text-yellow-800";
//       case "advanced":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const completedTests = interviewHistory.filter(
//     (test) => test.status === "completed"
//   ).length;
//   const averageScore = Math.round(
//     interviewHistory
//       .filter((test) => test.status === "completed")
//       .reduce((sum, test) => sum + test.overallScore, 0) / completedTests
//   );
//   const totalTimeSpent = "2h 15m"; // This would be calculated from all durations
//   const bestScore = Math.max(
//     ...interviewHistory.map((test) => test.overallScore)
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
//       <div className="w-full max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-8">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                     <BarChart3 className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h1 className="text-3xl font-bold">Interview History</h1>
//                     <p className="text-red-100 mt-1">
//                       Track your progress and performance over time
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 lg:mt-0">
//                 <button className="bg-white text-red-600 font-medium py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-red-50 transition-colors shadow-lg">
//                   <Play className="w-5 h-5" />
//                   Start New Interview
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-600">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">
//                   Total Interviews
//                 </p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {interviewHistory.length}
//                 </p>
//                 <p className="text-xs text-green-600 mt-1">+2 this week</p>
//               </div>
//               <MessageSquare className="w-8 h-8 text-red-600" />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">Completed</p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {completedTests}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {((completedTests / interviewHistory.length) * 100).toFixed(
//                     0
//                   )}
//                   % completion rate
//                 </p>
//               </div>
//               <CheckCircle className="w-8 h-8 text-green-500" />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">
//                   Average Score
//                 </p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {averageScore}%
//                 </p>
//                 <p className="text-xs text-blue-600 mt-1">+5% improvement</p>
//               </div>
//               <Trophy className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">Best Score</p>
//                 <p className="text-2xl font-bold text-gray-800">{bestScore}%</p>
//                 <p className="text-xs text-purple-600 mt-1">Personal best</p>
//               </div>
//               <Award className="w-8 h-8 text-purple-500" />
//             </div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="relative">
//                 <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by technology, role..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-full sm:w-64"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <select
//                   value={filterBy}
//                   onChange={(e) => setFilterBy(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="completed">Completed</option>
//                   <option value="incomplete">Incomplete</option>
//                 </select>

//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 >
//                   <option value="recent">Most Recent</option>
//                   <option value="score">Highest Score</option>
//                   <option value="duration">Duration</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Interview History Table/Cards */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Recent Interviews
//             </h2>
//             <p className="text-gray-600 text-sm mt-1">
//               Your complete interview history and performance
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Interview Details
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Technology
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Difficulty
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Score
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Duration
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {interviewHistory.map((interview, index) => (
//                   <tr
//                     key={interview.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {interview.jobRole}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {interview.interviewType} Interview
//                         </div>
//                         <div className="text-xs text-gray-400">
//                           {interview.completedAt}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {interview.technology}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
//                           interview.difficulty
//                         )}`}
//                       >
//                         {interview.difficulty}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div
//                           className={`text-sm font-bold ${getScoreColor(
//                             interview.overallScore
//                           )}`}
//                         >
//                           {interview.status === "incomplete"
//                             ? "N/A"
//                             : `${interview.overallScore}%`}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4 text-gray-400" />
//                         {interview.duration}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStatusBadge(interview.status, interview.overallScore)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex items-center gap-2">
//                         <button className="text-red-600 hover:text-red-900 transition-colors p-1 rounded">
//                           <Eye className="w-4 h-4" />
//                         </button>
//                         <button className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded">
//                           <Download className="w-4 h-4" />
//                         </button>
//                         <button className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded">
//                           <MoreVertical className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//             <div className="flex-1 flex justify-between sm:hidden">
//               <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Previous
//               </button>
//               <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                 Next
//               </button>
//             </div>
//             <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//               <div>
//                 <p className="text-sm text-gray-700">
//                   Showing <span className="font-medium">1</span> to{" "}
//                   <span className="font-medium">6</span> of{" "}
//                   <span className="font-medium">{interviewHistory.length}</span>{" "}
//                   results
//                 </p>
//               </div>
//               <div>
//                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     Previous
//                   </button>
//                   <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-red-50 text-sm font-medium text-red-600">
//                     1
//                   </button>
//                   <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MockInterviewHistory;
