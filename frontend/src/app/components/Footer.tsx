'use client';

import { themeColors } from "@/app/providers";

export default function Footer() {

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-8 py-4" 
      style={{ 
        backgroundColor: themeColors.background
      }}>
      <div className="text-sm" style={{ color: themeColors.text + '99' }}>
        <span><b>Built</b> with ❤️ by Hitarth, Ali & Divyansh</span>
      </div>
      <div className="text-sm" style={{ color: themeColors.text + '99' }}>
        <span><b>Powered</b> by Flare</span>
      </div>
    </div>
  );
} 