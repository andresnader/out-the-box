import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({ title, value, change, icon: Icon, color = "rose" }: any) => {
    const colorClasses: any = {
        rose: "bg-rose-50 text-rose-600",
        emerald: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
        amber: "bg-amber-50 text-amber-600"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-2xl font-black text-gray-900">{value}</h3>
                    {change && (
                        <div className={`flex items-center mt-2 text-xs font-bold ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span className="ml-1">{change} vs mes anterior</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color] || colorClasses.rose}`}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
};
