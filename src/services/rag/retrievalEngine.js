import { SGSU_KNOWLEDGE_BASE } from './sgsuKnowledgeBase';
import { initialCourses } from '../../data/courses';
import { facultyMembers } from '../../data/faculty';
import { studentClubs, initialStudentProjects } from '../../data/clubsAndProjects';
import { initialNotices } from '../../data/notices';

/**
 * SGSU FutureBot Retrieval & Intent Engine
 * 
 * Implements:
 * 1. Intent Detection across 15+ university domains
 * 2. Conversational Memory & Anaphora / Follow-up Resolution
 * 3. Hybrid Retrieval (Keyword + Semantic synonym expansion + Authority ranking)
 * 4. Grounded Context Construction with Source Citations
 * 5. Actionable Website Link Generators
 */

// Intent Constants
export const INTENTS = {
  UNIVERSITY_INFO: 'UNIVERSITY_INFO',
  ADMISSIONS: 'ADMISSIONS',
  COURSE_SEARCH: 'COURSE_SEARCH',
  COURSE_DETAILS: 'COURSE_DETAILS',
  COMPARE_COURSES: 'COMPARE_COURSES',
  FEES: 'FEES',
  SCHOLARSHIPS: 'SCHOLARSHIPS',
  FACULTY: 'FACULTY',
  CAMPUS: 'CAMPUS',
  PLACEMENTS: 'PLACEMENTS',
  NOTICES: 'NOTICES',
  FUTURE_SKILLS: 'FUTURE_SKILLS',
  CLUBS_PROJECTS: 'CLUBS_PROJECTS',
  CONTACT: 'CONTACT',
  GENERAL_CHAT: 'GENERAL_CHAT',
  UNKNOWN: 'UNKNOWN'
};

// Synonym / Expansion Dictionary for Semantic Query Matching
const SYNONYMS = {
  'ai': ['artificial intelligence', 'machine learning', 'aiml', 'deep learning'],
  'ml': ['machine learning', 'data science', 'ai'],
  'cyber': ['cyber security', 'ethical hacking', 'information security', 'cyber defense'],
  'it': ['information technology', 'software engineering', 'computer science'],
  'fees': ['fee', 'tuition', 'cost', 'charges', 'expenses', 'amount'],
  'scholarship': ['financial aid', 'concession', 'waiver', 'samavesh', 'fellowship'],
  'hostel': ['hostels', 'accommodation', 'residence', 'stay', 'rooms'],
  'placement': ['jobs', 'careers', 'recruitment', 'companies', 'salary', 'package'],
  'faculty': ['professors', 'teachers', 'mentors', 'staff', 'instructors', 'hod', 'dean'],
  'clubs': ['societies', 'guilds', 'teams', 'student activities', 'hackathon'],
  'projects': ['capstone', 'repositories', 'code', 'research'],
  'admission': ['apply', 'eligibility', 'process', 'registration', 'counseling']
};

/**
 * Detect User Intent from query tokens and conversational history
 */
export function detectIntent(query, context = {}) {
  const q = query.toLowerCase().trim();

  // 0. Greetings, Casual Banter & Hinglish (Highest priority for friendly conversational assistant)
  if (
    /^(hi|hello|hey|heyy|namaste|namaskar|pranam|greetings|good morning|good afternoon|good evening|yo|sup)\b/i.test(q) ||
    q.includes('kaise ho') ||
    q.includes('kya haal') ||
    q.includes('how are you') ||
    q.includes('how you doing') ||
    q.includes('how r u') ||
    q.includes('how do you do') ||
    q.includes("what's up") ||
    q.includes('whats up') ||
    q.includes('kya chal raha') ||
    q.includes('sab badhiya') ||
    q.includes('who are you') ||
    q.includes('aap kaun ho') ||
    q.includes('tum kaun ho') ||
    q.includes('koun ho') ||
    q.includes('kya karte ho') ||
    q.includes('thank you') ||
    q.includes('thanks') ||
    q.includes('shukriya') ||
    q.includes('dhanyawad')
  ) {
    return INTENTS.GENERAL_CHAT;
  }

  // 1. Comparison Intent
  if (q.includes('compare') || q.includes('versus') || q.includes(' vs ') || q.includes('difference between')) {
    return INTENTS.COMPARE_COURSES;
  }

  // 2. Fees & Financials
  if (q.includes('fee') || q.includes('tuition') || q.includes('cost') || q.includes('charges') || q.includes('how much does it cost')) {
    return INTENTS.FEES;
  }

  // 3. Scholarships
  if (q.includes('scholarship') || q.includes('financial aid') || q.includes('waiver') || q.includes('samavesh') || q.includes('concession')) {
    return INTENTS.SCHOLARSHIPS;
  }

  // 4. Faculty & Leadership
  if (q.includes('faculty') || q.includes('teacher') || q.includes('professor') || q.includes('pooja') || q.includes('bijlani') || q.includes('prabhakar') || q.includes('karma') || q.includes('mehra') || q.includes('saini') || q.includes('hod') || q.includes('head of school')) {
    return INTENTS.FACULTY;
  }

  // 5. Admissions & Eligibility
  if (q.includes('apply') || q.includes('admission') || q.includes('eligib') || q.includes('documents required') || q.includes('how to join') || q.includes('criteria') || q.includes('process to get')) {
    return INTENTS.ADMISSIONS;
  }

  // 6. Campus & Facilities
  if (q.includes('campus') || q.includes('hostel') || q.includes('facility') || q.includes('facilities') || q.includes('where is sgsu') || q.includes('library') || q.includes('sports') || q.includes('wifi')) {
    return INTENTS.CAMPUS;
  }

  // 7. Placements & Careers
  if (q.includes('placement') || q.includes('package') || q.includes('recruiter') || q.includes('salary') || q.includes('alumni') || q.includes('companies')) {
    return INTENTS.PLACEMENTS;
  }

  // 8. Notices & Circulars
  if (q.includes('notice') || q.includes('circular') || q.includes('exam date') || q.includes('notification') || q.includes('announcement')) {
    return INTENTS.NOTICES;
  }

  // 9. Clubs & Projects
  if (q.includes('club') || q.includes('binary battle') || q.includes('cyber warriors') || q.includes('project') || q.includes('neuralshield') || q.includes('capstone') || q.includes('hackathon')) {
    return INTENTS.CLUBS_PROJECTS;
  }

  // 10. Contact Details
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('helpline') || q.includes('address') || q.includes('toll free') || q.includes('call')) {
    return INTENTS.CONTACT;
  }

  // 11. Courses & Specific Degrees
  if (q.includes('course') || q.includes('programme') || q.includes('program') || q.includes('bca') || q.includes('mca') || q.includes('msc') || q.includes('m.sc') || q.includes('bba') || q.includes('b.com') || q.includes('syllabus') || q.includes('curriculum')) {
    return INTENTS.COURSE_SEARCH;
  }

  // 12. University Overview
  if (q.includes('what is sgsu') || q.includes('about sgsu') || q.includes('established') || q.includes('vision') || q.includes('mission') || q.includes('aisect') || q.includes('university') || q.includes('who is sgsu')) {
    return INTENTS.UNIVERSITY_INFO;
  }

  // Follow-up context fallback (Conversational Memory)
  if (context.lastIntent) {
    return context.lastIntent;
  }

  return INTENTS.UNKNOWN;
}

/**
 * Expand query tokens with semantic synonyms
 */
function expandQuery(query) {
  const words = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const expanded = new Set(words);

  for (const word of words) {
    if (SYNONYMS[word]) {
      SYNONYMS[word].forEach(s => s.split(' ').forEach(token => expanded.add(token)));
    }
  }

  return Array.from(expanded);
}

/**
 * Hybrid Knowledge Retriever
 * Ranks knowledge from SGSU official base + courses + faculty + clubs
 */
export function retrieveKnowledge(rawQuery, context = {}) {
  // If follow-up query is contextual (e.g. "What is the eligibility?"), inject previous subject
  let effectiveQuery = rawQuery;
  if (context.lastProgram && !rawQuery.toLowerCase().includes(context.lastProgram.toLowerCase())) {
    effectiveQuery = `${rawQuery} ${context.lastProgram}`;
  }

  const intent = detectIntent(effectiveQuery, context);
  const tokens = expandQuery(effectiveQuery);
  const lowerQuery = effectiveQuery.toLowerCase();

  const results = [];

  // ----------------------------------------------------
  // 1. Search SGSU Official Knowledge Base
  // ----------------------------------------------------
  SGSU_KNOWLEDGE_BASE.forEach(chunk => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    // Exact phrase match in title or content
    if (lowerTitle.includes(lowerQuery)) score += 20;
    if (lowerContent.includes(lowerQuery)) score += 10;

    // Keyword matches
    chunk.keywords.forEach(kw => {
      if (lowerQuery.includes(kw)) score += 15;
    });

    // Token frequency score
    tokens.forEach(tok => {
      if (tok.length > 2) {
        if (lowerTitle.includes(tok)) score += 4;
        if (lowerContent.includes(tok)) score += 2;
      }
    });

    // Category / Intent alignment boost
    if (
      (intent === INTENTS.UNIVERSITY_INFO && chunk.category === 'University') ||
      (intent === INTENTS.CAMPUS && chunk.category === 'Campus') ||
      (intent === INTENTS.ADMISSIONS && chunk.category === 'Admissions') ||
      (intent === INTENTS.FEES && chunk.title.toLowerCase().includes('fee')) ||
      (intent === INTENTS.SCHOLARSHIPS && chunk.title.toLowerCase().includes('scholarship')) ||
      (intent === INTENTS.FACULTY && chunk.category === 'Faculty') ||
      (intent === INTENTS.PLACEMENTS && chunk.category === 'Placements') ||
      (intent === INTENTS.CONTACT && chunk.category === 'Contact')
    ) {
      score += 15;
    }

    // Official Source Priority Weight (Authority Level 1 gets 1.5x)
    if (chunk.authority_level === 1) {
      score *= 1.5;
    }

    if (score > 4) {
      results.push({
        type: 'sgsu_doc',
        id: chunk.id,
        score,
        title: chunk.title,
        category: chunk.category,
        source: chunk.source,
        source_type: chunk.source_type,
        authority_level: chunk.authority_level,
        url: chunk.url,
        summary: chunk.summary,
        content: chunk.content,
        data: chunk
      });
    }
  });

  // ----------------------------------------------------
  // 2. Search Official Courses Catalog (45 Programmes)
  // ----------------------------------------------------
  const matchedCourses = [];
  initialCourses.forEach(course => {
    let cScore = 0;
    const progLower = course.programme.toLowerCase();
    const schoolLower = course.school.toLowerCase();
    const descLower = (course.description || '').toLowerCase();

    if (progLower.includes(lowerQuery)) cScore += 30;
    if (descLower.includes(lowerQuery)) cScore += 12;

    tokens.forEach(tok => {
      if (tok.length > 2) {
        if (progLower.includes(tok)) cScore += 6;
        if (schoolLower.includes(tok)) cScore += 3;
        if (descLower.includes(tok)) cScore += 2;
      }
    });

    if (course.tags && course.tags.some(t => lowerQuery.includes(t.toLowerCase()))) {
      cScore += 8;
    }

    if (cScore > 5) {
      matchedCourses.push({ ...course, matchScore: cScore });
    }
  });

  if (matchedCourses.length > 0) {
    matchedCourses.sort((a, b) => b.matchScore - a.matchScore);
    const topCourses = matchedCourses.slice(0, 4);

    results.push({
      type: 'course_catalog',
      id: 'courses-matched',
      score: topCourses[0].matchScore,
      title: `SGSU Programmes Catalog (${matchedCourses.length} Matches Found)`,
      category: 'Courses',
      source: 'SGSU School of Future Skills & IT Official Session Sheet',
      source_type: 'official',
      authority_level: 1,
      url: 'https://sgsuniversity.ac.in/programmes/',
      content: topCourses.map(c => `• ${c.programme} (${c.school}, Duration: ${c.duration}, Level: ${c.level || c.degreeLevel}) - ${c.description?.slice(0, 140)}...`).join('\n'),
      courses: topCourses
    });
  }

  // ----------------------------------------------------
  // 3. Search Verified Faculty Directory
  // ----------------------------------------------------
  const matchedFaculty = [];
  facultyMembers.forEach(fac => {
    let fScore = 0;
    const nameLower = fac.name.toLowerCase();
    const bioLower = fac.bio.toLowerCase();
    const specLower = (fac.specialization || '').toLowerCase();

    if (nameLower.includes(lowerQuery)) fScore += 35;
    if (specLower.includes(lowerQuery)) fScore += 15;
    if (bioLower.includes(lowerQuery)) fScore += 8;

    tokens.forEach(tok => {
      if (tok.length > 2) {
        if (nameLower.includes(tok)) fScore += 5;
        if (specLower.includes(tok)) fScore += 3;
      }
    });

    if (fScore > 6) {
      matchedFaculty.push({ ...fac, matchScore: fScore });
    }
  });

  if (matchedFaculty.length > 0) {
    matchedFaculty.sort((a, b) => b.matchScore - a.matchScore);
    results.push({
      type: 'faculty_matched',
      id: 'faculty-matched',
      score: matchedFaculty[0].matchScore,
      title: `Verified FSIT Faculty Profiles (${matchedFaculty.length} Matches)`,
      category: 'Faculty',
      source: 'SGSU FSIT Faculty Dossier & Directorate',
      source_type: 'official',
      authority_level: 1,
      url: 'https://sgsuniversity.ac.in/fsit/faculty/',
      content: matchedFaculty.map(f => `• ${f.name} - ${f.designation} (${f.department}): ${f.qualification}. Specialization: ${f.specialization || f.bio.slice(0, 100)}`).join('\n'),
      faculty: matchedFaculty
    });
  }

  // ----------------------------------------------------
  // 4. Search Student Societies & Projects
  // ----------------------------------------------------
  if (intent === INTENTS.CLUBS_PROJECTS || tokens.some(t => ['club', 'warriors', 'binary', 'project', 'capstone'].includes(t))) {
    results.push({
      type: 'clubs_matched',
      id: 'clubs-data',
      score: 18,
      title: 'FSIT Student Technical Societies',
      category: 'Student Support',
      source: 'SGSU Student Affairs & FSIT Guilds',
      source_type: 'official',
      authority_level: 1,
      url: '/clubs-and-projects',
      content: studentClubs.map(c => `• ${c.name} (${c.category}): ${c.description} Meets ${c.schedule} at ${c.venue}.`).join('\n'),
      clubs: studentClubs
    });
  }

  // ----------------------------------------------------
  // 5. Search Official Notices
  // ----------------------------------------------------
  if (intent === INTENTS.NOTICES || lowerQuery.includes('notice') || lowerQuery.includes('circular') || lowerQuery.includes('hackathon')) {
    results.push({
      type: 'notices_matched',
      id: 'notices-data',
      score: 20,
      title: 'SGSU Verified Circulars & Notices',
      category: 'Notices',
      source: 'SGSU Registrar & FSIT Bulletin Board',
      source_type: 'official',
      authority_level: 1,
      url: '/notices',
      content: initialNotices.slice(0, 3).map(n => `• [${n.priority}] ${n.title} (Published: ${n.date}) - Category: ${n.category}`).join('\n'),
      notices: initialNotices.slice(0, 3)
    });
  }

  // Sort descending by calculated hybrid score
  results.sort((a, b) => b.score - a.score);

  // Determine Overall Retrieval Confidence
  let confidence = 'INSUFFICIENT';
  if (results.length > 0) {
    const topScore = results[0].score;
    if (topScore >= 20) confidence = 'HIGH';
    else if (topScore >= 10) confidence = 'MEDIUM';
    else if (topScore >= 5) confidence = 'LOW';
  }

  return {
    query: effectiveQuery,
    intent,
    confidence,
    sourcesCount: results.length,
    topResults: results.slice(0, 5),
    matchedCourses: matchedCourses.slice(0, 4),
    matchedFaculty: matchedFaculty.slice(0, 3)
  };
}

/**
 * Course Comparison Generator
 */
export function compareCourses(progNameA, progNameB) {
  const findCourse = (name) => {
    const lower = name.toLowerCase();
    return initialCourses.find(c => c.programme.toLowerCase().includes(lower)) || initialCourses[0];
  };

  const courseA = findCourse(progNameA);
  const courseB = findCourse(progNameB);

  return {
    courseA,
    courseB,
    comparisonTable: [
      { feature: 'Programme Title', valA: courseA.programme, valB: courseB.programme },
      { feature: 'Academic School', valA: courseA.school, valB: courseB.school },
      { feature: 'Degree Duration', valA: courseA.duration, valB: courseB.duration },
      { feature: 'Admission Eligibility', valA: courseA.prerequisites || '10+2 with 50% marks', valB: courseB.prerequisites || '10+2 with 50% marks' },
      { feature: 'Industry Alliances', valA: courseA.industryPartner || 'Scope Industry Lab', valB: courseB.industryPartner || 'Scope Industry Lab' },
      { feature: 'Tuition Portal Access', valA: '100% Free Access', valB: '100% Free Access' }
    ]
  };
}
