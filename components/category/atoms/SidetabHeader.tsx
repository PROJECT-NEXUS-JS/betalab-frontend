import React from 'react';

export interface SidetabHeaderProps {
  children: React.ReactNode;
}

export default function SidetabHeader({ children }: SidetabHeaderProps) {
  return <h3 className="text-subtitle-02 text-Black font-bold py-2">{children}</h3>;
}
