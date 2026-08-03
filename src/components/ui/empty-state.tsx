import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { GlassCard } from '@/components/ui/glass-card';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionLink?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <Sparkles className="w-10 h-10 text-[#F5D061]" />,
  title,
  description,
  actionText,
  onAction,
  actionLink,
}) => {
  return (
    <GlassCard variant="dark" className="p-12 text-center space-y-6 max-w-md mx-auto border border-white/15">
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-inner">
        {icon}
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">{description}</p>
      </div>

      {(actionText && (onAction || actionLink)) && (
        <div className="pt-2">
          {actionLink ? (
            <a href={actionLink}>
              <LuxuryButton variant="gold" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                {actionText}
              </LuxuryButton>
            </a>
          ) : (
            <LuxuryButton variant="gold" size="md" onClick={onAction} icon={<ArrowRight className="w-4 h-4" />}>
              {actionText}
            </LuxuryButton>
          )}
        </div>
      )}
    </GlassCard>
  );
};
