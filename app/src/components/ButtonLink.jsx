import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variants = {
  dark: 'bg-oxford text-background hover:bg-ochre',
  accent: 'bg-ochre text-background hover:bg-background hover:text-oxford',
};

// Solid call-to-action link with the sliding arrow.
export default function ButtonLink({ to, children, variant = 'dark', wide = false }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 ${wide ? 'px-8' : 'px-7'} py-4 transition-colors ${variants[variant]}`}
    >
      <span className="text-sm tracking-wide font-medium">{children}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </Link>
  );
}
