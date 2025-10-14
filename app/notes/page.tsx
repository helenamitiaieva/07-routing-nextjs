import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined>; }) {
  const page = Number(searchParams.page ?? 1);
  const search = (searchParams.search as string) ?? '';
  const perPage = 12;

  const qc = getQueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () => getNotes({ page, perPage, search }),
  });

  const state = dehydrate(qc);

  return (
    <HydrationBoundary state={state}>
      <NotesClient 
      initialPage={page} 
      perPage={perPage} 
      initialSearch={search} 
      />
    </HydrationBoundary>
  );
}