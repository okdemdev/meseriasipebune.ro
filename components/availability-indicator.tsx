'use client';

export function AvailabilityIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="text-sm font-medium text-green-600 dark:text-green-500">
        Disponibil pentru lucrări
      </span>
    </div>
  );
}
