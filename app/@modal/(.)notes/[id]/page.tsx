import { getSingleNote } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import Modal from '@/components/Modal/Modal';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const note = await getSingleNote(id);

  return (
    <Modal>
      <NotePreviewClient note={note} />
    </Modal>
  );
}