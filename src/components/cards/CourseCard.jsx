import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, BarChart3, Star, CheckCircle, ArrowRight, User } from 'lucide-react';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export const CourseCard = ({ course, onEnrollClick }) => {
  const getDifficultyVariant = (diff) => {
    switch (diff.toLowerCase()) {
      case 'beginner': return 'emerald';
      case 'intermediate': return 'primary';
      case 'advanced': return 'purple';
      default: return 'default';
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800/90 hover:border-sky-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/5 group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="cyan" size="xs">
            {course.category}
          </Badge>
          <Badge variant={getDifficultyVariant(course.difficulty)} size="xs">
            {course.difficulty}
          </Badge>
        </div>

        {/* Title */}
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors line-clamp-2 mb-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
          {course.technologies.length > 3 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700/40">
              +{course.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Meta Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 py-3 border-t border-b border-slate-200 dark:border-slate-800/80 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
            <span className="text-slate-800 dark:text-slate-200 font-medium">{course.rating}</span>
            <span className="text-slate-500 dark:text-slate-400">({course.enrolledCount})</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 text-slate-600 dark:text-slate-400 truncate">
            <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            <span className="truncate">{course.instructor}</span>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {course.enrolled && (
          <div className="mb-4">
            <ProgressBar progress={course.progress} showLabel={true} size="sm" />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <Link
          to={`/courses/${course.id}`}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-colors border border-slate-300 dark:border-slate-700"
        >
          View Syllabus
        </Link>
        {course.enrolled ? (
          <Link
            to={`/courses/${course.id}`}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Continue ({course.progress}%)
          </Link>
        ) : (
          <button
            onClick={() => onEnrollClick(course)}
            className="flex-1 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-sky-500/20"
          >
            Enroll Free <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
