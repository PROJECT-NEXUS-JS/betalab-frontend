import React from 'react';

export default function RankingArticle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="44"
      height="54"
      viewBox="0 0 44 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.26022 53.7329L20.9398 44.3029C21.6 43.9508 22.4 43.9508 23.0602 44.3029L40.7398 53.7329C42.206 54.5149 44 53.4862 44 51.8634V0H0V51.8634C0 53.4862 1.79402 54.5149 3.26022 53.7329Z"
        fill="url(#paint0_linear_2515_21836)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2515_21836"
          x1="22"
          y1="0"
          x2="22"
          y2="106"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0E62FF" />
          <stop offset="1" stopColor="#4AE37A" />
        </linearGradient>
      </defs>
    </svg>
  );
}
