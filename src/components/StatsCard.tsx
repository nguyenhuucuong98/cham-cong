import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  mainVal: string;
  subVal?: string;
  badgeVal?: string;
  trendText: string;
  trendType: 'up' | 'down' | 'warning';
}

export default function StatsCard({ title, mainVal, subVal, badgeVal, trendText, trendType }: StatsCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs font-semibold text-gray-500">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-black text-gray-900">{mainVal}</span>
        {subVal && <span className="text-xs font-medium text-gray-400">{subVal}</span>}
        {badgeVal && (
          <span className="ml-auto bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-100">
            {badgeVal}
          </span>
        )}
      </div>
      <p className={`text-xs flex items-center gap-1 mt-3 font-semibold ${
        trendType === 'up' ? 'text-emerald-600' : trendType === 'down' ? 'text-rose-500' : 'text-amber-500'
      }`}>
        {trendType === 'down' ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
        {trendText}
      </p>
    </div>
  );
}