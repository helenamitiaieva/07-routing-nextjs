'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './page.module.css';



import { getNotes } from '@/lib/api';
import { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

interface NotesClientProps {
  initialPage: number;
  perPage: number;
  initialSearch: string;
  tag?: string;
}

export default function NotesClient({
  initialPage,
  perPage,
  initialSearch,
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['notes', debouncedSearch, page],
  queryFn: () => getNotes({ page, perPage, search: debouncedSearch }),
  placeholderData: (previousData) => previousData,
});

  const notes: Note[] = data?.notes ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  const handleOpenModal = (): void => setIsModalOpen(true);
  const handleCloseModal = (): void => setIsModalOpen(false);

  const handleSearchChange = (value: string): void => {
    setPage(1);
    setSearch(value);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleCreated = async (): Promise<void> => {
    await refetch();
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}

        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні</p>}

      {notes.length > 0 && (
       <NoteList 
          notes={notes} 
          queryKey={['notes', debouncedSearch, page]} 
        />
      )}

  {isModalOpen && (
  <Modal onClose={handleCloseModal}>
    <NoteForm onClose={handleCloseModal} onCreated={handleCreated} />
  </Modal>
)}
    </div>
  );
}