import React from 'react';

export default function MeshBackground() {
  return (
    <div className="mesh-bg dark:hidden">
      {/* Top Left Blob */}
      <div 
        className="mesh-blob w-[500px] h-[500px] bg-teal-200/40" 
        style={{ top: '-10%', left: '-10%', animationDuration: '40s' }} 
      />
      
      {/* Bottom Right Blob */}
      <div 
        className="mesh-blob w-[600px] h-[600px] bg-amber-200/40" 
        style={{ bottom: '-15%', right: '-10%', animationDuration: '35s', animationDirection: 'reverse' }} 
      />
      
      {/* Center Blob */}
      <div 
        className="mesh-blob w-[400px] h-[400px] bg-teal-300/30" 
        style={{ top: '30%', right: '20%', animationDuration: '45s' }} 
      />
    </div>
  );
}
