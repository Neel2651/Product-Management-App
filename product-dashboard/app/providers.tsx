'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  // Create a new QueryClient instance for managing server state with tanstack query
  // This client will be used to provide context for all components that need to access server state
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
