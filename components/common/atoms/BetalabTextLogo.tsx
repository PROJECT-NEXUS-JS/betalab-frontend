import React from 'react';
import BetalabLogo from '../svg/BetalabLogo';
import Link from 'next/link';

export default function BetalabTextLogo() {
  return (
    <Link href="/" passHref>
      <BetalabLogo className="w-25 h-6 cursor-pointer" />
    </Link>
  );
}
