import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { articleHref } from '../lib/articles.js';
import { formatDate } from '../lib/format.js';

// Large card used for the homepage "Featured Writings".
export default function ArticleCard({ article }) {
  return (
    <Link to={articleHref(article)} className="group block h-full">
      <div className="flex flex-col h-full border hairline bg-card hover:border-ochre/40 transition-all duration-500">
        <div className="p-7 md:p-8 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[10px] tracking-[0.25em] uppercase text-ochre font-medium">{article.tag}</span>
            <span className="font-mono text-[11px] text-slate/60">—</span>
          </div>
          <h3 className="font-display text-2xl md:text-[1.7rem] leading-tight text-oxford group-hover:text-ochre transition-colors text-balance">
            {article.title}
          </h3>
          <div className="mt-4 flex-1">
            <p className="text-[15px] leading-relaxed text-slate line-clamp-3">{article.excerpt}</p>
          </div>
          <div className="mt-6 pt-5 border-t hairline flex items-center justify-between">
            <span className="text-xs text-slate/70">{formatDate(article.date)}</span>
            <span className="flex items-center gap-1.5 text-xs text-oxford/70 group-hover:text-ochre transition-colors">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" /> {article.readTime} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
