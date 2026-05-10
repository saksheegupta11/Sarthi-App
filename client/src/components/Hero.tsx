import React from "react";
import { LucideIcon } from "lucide-react";

interface HeroProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  badgeIcon?: LucideIcon;
}

export default function Hero({ title, description, icon: Icon, badge, badgeIcon: BadgeIcon }: HeroProps) {
  return (
    <div className="rounded-2xl overflow-hidden mb-8 shadow-premium relative h-48 md:h-52 animate-fade-in bg-teal">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute inset-0 flex items-center px-8 md:px-12 z-10">
        <div className="flex items-center gap-8">
          <div className="hidden sm:flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner group transition-all duration-500 hover:scale-105">
            <Icon className="h-12 w-12 text-white transition-transform duration-500 group-hover:rotate-12" />
          </div>
          <div className="space-y-2">
            {(badge || BadgeIcon) && (
              <div className="flex items-center gap-2 mb-1">
                {BadgeIcon && <BadgeIcon className="h-4 w-4 text-amber-300 animate-pulse" />}
                <span className="text-white/90 text-xs font-bold uppercase tracking-widest">
                  {badge}
                </span>
              </div>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
