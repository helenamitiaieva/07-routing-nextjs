'use client';

import { useRouter } from 'next/navigation';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

type Props = {
  note: Note;
};

export default function NotePreviewClient({ note }: Props) {
  const router = useRouter();
  const close = () => router.back();

  const date = new Date(note.updatedAt ?? note.createdAt).toLocaleString();

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={close}>Close</button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>

        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{date}</p>
      </div>
    </div>
  );
}