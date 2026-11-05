import { useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
type Props = {
  onClose: () => void;
  onFileSelected: (file: File) => void;
  onStartBlank: () => void;
};
export default function NewDocumentModal({
  onClose,
  onFileSelected,
  onStartBlank,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const select = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    e.target.value = "";
  };
  const drop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelected(file);
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-4"
      onMouseDown={onClose}
    >
      <section
        className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-stone-700 bg-[#211f1c] text-stone-100 shadow-2xl sm:max-w-4xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-document-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-5 py-5 sm:px-9 sm:pt-8">
          <h2
            id="new-document-title"
            className="font-serif text-2xl font-semibold sm:text-3xl"
          >
            New document
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center text-2xl text-stone-400"
          >
            ×
          </button>
        </header>
        <div className="px-5 pb-5 sm:px-9">
          <input
            ref={ref}
            type="file"
            accept=".pdf,.doc,.docx,.json,application/pdf"
            className="hidden"
            onChange={select}
          />
          <button
            type="button"
            onClick={() => ref.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={drop}
            className="flex w-full items-start gap-3 rounded-2xl border border-dashed border-stone-600 p-4 text-left sm:items-center sm:gap-6 sm:px-8 sm:py-7"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-xl sm:h-16 sm:w-16">
              ⇧
            </span>
            <span>
              <b className="block text-lg sm:text-xl">Import a resume</b>
              <span className="mt-1 block text-sm leading-6 text-stone-400 sm:text-base">
                Drop a file here or browse. PDF, Word, Reactive Resume or JSON
                Resume.
              </span>
            </span>
          </button>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="min-h-28 rounded-2xl border border-stone-700 p-4 text-left sm:p-6"
            >
              <b>Copy a resume for a job</b>
              <span className="mt-1 block text-sm text-stone-400">
                Start from one you have.
              </span>
            </button>
            <button
              type="button"
              onClick={onStartBlank}
              className="min-h-28 rounded-2xl border border-stone-700 p-4 text-left sm:p-6"
            >
              <b>Start blank</b>
              <span className="mt-1 block text-sm text-stone-400">
                Open the editor with a blank resume.
              </span>
            </button>
          </div>
        </div>
        <footer className="flex flex-col gap-3 border-t border-stone-700 px-5 py-4 text-sm sm:flex-row sm:justify-between sm:px-9">
          <button type="button" className="text-left text-stone-400">
            New cover letter instead
          </button>
          <button type="button" className="text-left underline">
            Try with a sample resume
          </button>
        </footer>
      </section>
    </div>
  );
}
