import { Search, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 p-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl text-white">NeuroTrader AI</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search ticker..."
              value="AAPL - Apple Inc."
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
              readOnly
            />
          </div>
        </div>

        {/* Right side spacer */}
        <div className="w-32"></div>
      </div>
    </header>
  );
}