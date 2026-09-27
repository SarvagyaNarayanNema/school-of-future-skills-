import React from 'react';
import { Trophy, Calendar, Award, ExternalLink, Users } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AchievementCard = ({ item }) => {
  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'Hackathon Winners': return 'amber';
      case 'Certifications': return 'cyan';
      case 'Internships': return 'emerald';
      case 'Student Innovations': return 'purple';
      default: return 'primary';
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800/90 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 group">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={getCategoryVariant(item.category)} size="xs">
            {item.category}
          </Badge>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            {item.date}
          </span>
        </div>

        {/* Award Highlight Badge */}
        <div className="mb-2">
          <span className="inline-block text-xs font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
            {item.awardBadge}
          </span>
        </div>

        {/* Achievement Title */}
        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug">
          {item.achievement}
        </h3>

        {/* Competition / Organization */}
        <div className="text-xs text-sky-400 font-medium mb-3 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{item.competitionOrg}</span>
        </div>

        {/* Student Team */}
        <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{item.studentTeam}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Footer Link */}
      {item.link && (
        <div className="pt-3 border-t border-slate-800/80">
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors"
          >
            <span>Verification Record</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
