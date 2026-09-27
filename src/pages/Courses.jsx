import React, { useState } from 'react';
import { initialCourses, COURSE_CATEGORIES } from '../data/courses';
import { CourseCard } from '../components/cards/CourseCard';
import { CourseEnrollModal } from '../components/modals/CourseEnrollModal';
import { EmptyState } from '../components/common/EmptyState';
import { courseService } from '../services/courseService';
import { Search, Filter, BookOpen, Sparkles, SlidersHorizontal } from 'lucide-react';

export const Courses = () => {
  const [courses, setCourses] = useState(() => courseService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'popular' | 'title'
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnrollConfirmed = (courseId) => {
    courseService.enroll(courseId);
    setCourses(courseService.getAll());
  };

  // Filter and sort
  const filteredCourses = courses.filter(course => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = course.title.toLowerCase().includes(q) ||
                          course.description.toLowerCase().includes(q) ||
                          course.technologies.some(t => t.toLowerCase().includes(q)) ||
                          course.instructor.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return (b.enrolledCount || 0) - (a.enrolledCount || 0);
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Department Curriculum & Specializations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Future Skills Courses
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Industry-aligned course tracks designed to take students from foundational principles to advanced deployment and architectural mastery.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Field */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or technology (e.g., PyTorch, Zero Trust, React)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="rating">Sort by: Highest Rated</option>
              <option value="popular">Sort by: Most Enrolled</option>
              <option value="title">Sort by: Alphabetical</option>
            </select>
          </div>

        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-800/80">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Result Grid */}
      {filteredCourses.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <span className="text-white font-bold">{filteredCourses.length}</span> course tracks</span>
            <span>Category: <span className="text-sky-400 font-semibold">{selectedCategory}</span></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onEnrollClick={(course) => setSelectedCourse(course)}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title="No courses matched your query"
          description="Try broadening your search term or resetting the category and difficulty filters."
          onReset={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSelectedDifficulty('All');
          }}
        />
      )}

      {/* Course Enrollment Modal */}
      <CourseEnrollModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        course={selectedCourse}
        onConfirmed={handleEnrollConfirmed}
      />

    </div>
  );
};
