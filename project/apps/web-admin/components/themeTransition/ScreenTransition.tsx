'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/hooks/useTheme';

export default function ScreenTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'circIn' }}
    >
      {children}
    </motion.div>
  );
}
