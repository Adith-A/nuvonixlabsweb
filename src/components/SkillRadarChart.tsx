/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SkillRadarProps {
  scores: {
    architecture: number;
    speed: number;
    communication: number;
    debugging: number;
    invariants: number;
    systemDesign: number;
  };
  size?: number;
}

export const SkillRadarChart: React.FC<SkillRadarProps> = ({ scores, size = 320 }) => {
  const center = size / 2;
  const radius = size * 0.38;

  const competencies = [
    { key: 'architecture', label: 'Architecture', val: scores.architecture },
    { key: 'speed', label: 'Speed', val: scores.speed },
    { key: 'communication', label: 'Communication', val: scores.communication },
    { key: 'debugging', label: 'Debugging', val: scores.debugging },
    { key: 'invariants', label: 'Invariants', val: scores.invariants },
    { key: 'systemDesign', label: 'System Design', val: scores.systemDesign },
  ];

  const count = competencies.length;
  const angleStep = (Math.PI * 2) / count;

  // Concentric guideline rings at 25%, 50%, 75%, 100%
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value: number, index: number, maxRadius: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Polygon points
  const polygonPoints = competencies
    .map((c, i) => {
      const { x, y } = getCoordinates(c.val, i, radius);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="Candidate competency radar chart"
      >
        <defs>
          <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0088FF" stop-opacity="0.3" />
            <stop offset="50%" stop-color="#00C9B1" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#7ED957" stop-opacity="0.2" />
          </linearGradient>
          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0088FF" flood-opacity="0.25" />
          </filter>
        </defs>

        {/* Concentric Guide Polygons */}
        {levels.map((lvl, lIndex) => {
          const ringPoints = competencies
            .map((_, i) => {
              const { x, y } = getCoordinates(100 * lvl, i, radius);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <polygon
              key={lIndex}
              points={ringPoints}
              fill={lIndex === levels.length - 1 ? '#F8FAFC' : 'none'}
              stroke="#E2E8F0"
              strokeWidth="1"
              strokeDasharray={lIndex === levels.length - 1 ? 'none' : '2,2'}
            />
          );
        })}

        {/* Radial Axes */}
        {competencies.map((_, i) => {
          const { x, y } = getCoordinates(100, i, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth="1"
            />
          );
        })}

        {/* Data Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarFillGrad)"
          stroke="#0088FF"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
        />

        {/* Vertex Markers & Labels */}
        {competencies.map((c, i) => {
          const { x, y } = getCoordinates(c.val, i, radius);
          const labelCoord = getCoordinates(118, i, radius);

          return (
            <g key={c.key}>
              <circle
                cx={x}
                cy={y}
                r="4.5"
                fill="#002046"
                stroke="#0088FF"
                strokeWidth="2"
              />
              <text
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-bold fill-[#002046] tracking-tight select-none"
              >
                {c.label}
              </text>
              <text
                x={labelCoord.x}
                y={labelCoord.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-mono font-semibold fill-[#0088FF] select-none"
              >
                {c.val}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
