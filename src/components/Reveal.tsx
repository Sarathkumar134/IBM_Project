import type { ReactNode } from 'react';
import { useInView } from '@/hooks';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span';
}

export default function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
