import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseService } from '../services/courseService';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { CourseEnrollModal } from '../components/modals/CourseEnrollModal';
import {
  ArrowLeft,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Circle,
  BookOpen,
  Terminal,
  Award,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { earnPoints, showToast } = useApp();
  const [course, setCourse] = useState(() => courseService.getById(id));
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({});

  useEffect(() => {
    const loaded = courseService.getById(id);
    setCourse(loaded);
  }, [id]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">The requested course track does not exist or has been archived.</p>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs shadow-md shadow-sky-500/20 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course Catalog
        </Link>
      </div>
    );
  }

  const toggleLesson = (lessonName) => {
    if (!course.enrolled) {
      setIsEnrollModalOpen(true);
      return;
    }

    const nextState = !completedLessons[lessonName];
    setCompletedLessons(prev => ({ ...prev, [lessonName]: nextState }));

    // Count total lessons
    let total = 0;
    let completedCount = 0;
    course.syllabus.forEach(mod => {
      mod.lessons.forEach(l => {
        total++;
        if (l === lessonName ? nextState : completedLessons[l]) {
          completedCount++;
        }
      });
    });

    const newProg = Math.round((completedCount / total) * 100);
    const updated = courseService.updateProgress(course.id, newProg);
    setCourse(updated);

    if (nextState) {
      earnPoints(25, `Completed lesson: ${lessonName}`);
      showToast(`Lesson finished: +25 XP earned!`, 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back button */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>
      </div>

      {/* Hero Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="cyan" size="sm">{course.category}</Badge>
            <Badge variant="primary" size="sm">{course.difficulty}</Badge>
            {course.enrolled && (
              <Badge variant="emerald" size="sm">✓ Enrolled</Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {course.technologies.map((t, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-sky-700 dark:text-sky-300 border border-slate-300 dark:border-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Enrolled Progress Bar */}
          {course.enrolled && (
            <div className="glass-panel p-5 rounded-2xl border border-sky-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Your Completion Progress</span>
                <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{course.progress}%</span>
              </div>
              <ProgressBar progress={course.progress} color="from-sky-500 to-indigo-500" size="lg" />
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                Check off lessons in the syllabus below to advance your progress and earn XP.
              </p>
            </div>
          )}
        </div>

        {/* Enrollment Card Sidebar */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Duration</span>
              <span className="text-slate-900 dark:text-white font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Rating</span>
              <span className="text-amber-500 dark:text-amber-400 font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating} ({course.enrolledCount} enrolled)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Start Date</span>
              <span className="text-slate-700 dark:text-slate-200 font-mono">{course.startDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Tuition</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase">100% Free / University Access</span>
            </div>
          </div>

          {/* Instructor Block */}
          <div className="space-y-1 text-xs">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lead Instructor</span>
            <p className="text-slate-900 dark:text-white font-semibold text-sm">{course.instructor}</p>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">Future Skills Department Fellow</p>
          </div>

          {/* Action Button */}
          {course.enrolled ? (
            <div className="space-y-2">
              <Link
                to="/labs"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <Terminal className="w-4 h-4" /> Open Course Lab Workstation
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Enroll In Track Free
            </button>
          )}

          {/* Prerequisites */}
          <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-300 block mb-1">Prerequisites:</span>
            <p className="leading-relaxed">{course.prerequisites}</p>
          </div>
        </div>
      </div>

      {/* Syllabus Modules */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">Detailed Curriculum</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Course Syllabus & Practical Modules</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click lesson circles to mark completed exercises and earn XP points.
          </p>
        </div>

        <div className="space-y-4">
          {course.syllabus.map((mod, modIdx) => (
            <div key={modIdx} className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-mono">
                  {modIdx + 1}
                </span>
                {mod.module}
              </h3>
              <div className="space-y-2 pt-1">
                {mod.lessons.map((lesson, lesIdx) => {
                  const isDone = !!completedLessons[lesson];
                  return (
                    <div
                      key={lesIdx}
                      onClick={() => toggleLesson(lesson)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <span className="text-xs font-medium">{lesson}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {isDone ? "+25 XP Earned" : "25 XP"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <CourseEnrollModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        course={course}
        onConfirmed={(cid) => {
          courseService.enroll(cid);
          setCourse(courseService.getById(cid));
        }}
      />

    </div>
  );
};
