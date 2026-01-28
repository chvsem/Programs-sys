import { ReactNode } from 'react';

interface MacWindowProps {
  title: string;
  children: ReactNode;
}

export function MacWindow({ title, children }: MacWindowProps) {
  return (
    <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Mac Window Title Bar */}
      <div className="bg-[#dddddd] border-b-2 border-black p-3 flex items-center gap-3">
        <div className="flex gap-2">
          <button className="w-4 h-4 rounded-full bg-white border-2 border-black hover:bg-gray-200 transition-colors"></button>
          <button className="w-4 h-4 rounded-full bg-white border-2 border-black hover:bg-gray-200 transition-colors"></button>
          <button className="w-4 h-4 rounded-full bg-white border-2 border-black hover:bg-gray-200 transition-colors"></button>
        </div>
        <div className="flex-1 text-center font-bold text-sm">
          {title}
        </div>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>
      
      {/* Window Content */}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
