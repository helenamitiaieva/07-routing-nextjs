import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await getSingleNote(id);

  return (
    <Modal onClose={() => history.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
          </div>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>

          <button
            className={css.backBtn}
            type="button"
            onClick={() => history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}