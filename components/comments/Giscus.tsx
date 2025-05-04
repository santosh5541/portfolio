// components/Giscus.tsx
import React, { useState, useEffect, FormEvent } from 'react';

interface Reply {
  id: string;
  authorEmail: string;
  authorName: string;
  text: string;
  createdAt: string;
}

interface Comment {
  id: string;
  authorEmail: string;
  authorName: string;
  text: string;
  createdAt: string;
  replies: Reply[];
}
const BIN_URL = 'https://api.jsonbin.io/v3/b/6817948f8a456b7966978a10';
const BIN_HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key':
    '$2a$10$1YLJZl9lIrS.PvWSTYnvTudCY2ok.EFzE2T48CqWhS2ytBIamI56q',
};
export default function Giscus() {
  const path = typeof window === 'undefined' ? '/' : window.location.pathname;

  const [email, setEmail] = useState('');
  const [hasSavedEmail, setHasSavedEmail] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [likers, setLikers] = useState<string[]>([]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const nameFromEmail = (e: string) =>
    e
      .split('@')[0]
      .split(/[._-]/)
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(' ');

  // Load data for this path, auto-init if missing
  useEffect(() => {
    (async () => {
      const res = await fetch(BIN_URL, { headers: BIN_HEADERS });
      const { record } = await res.json();
      if (!record[path]) {
        record[path] = { comments: [], likers: [] };
        await fetch(BIN_URL, {
          method: 'PUT',
          headers: BIN_HEADERS,
          body: JSON.stringify(record),
        });
      }
      setComments(record[path].comments);
      setLikers(record[path].likers);
    })();
    const stored = localStorage.getItem('giscus_email');
    if (stored) {
      setEmail(stored);
      setHasSavedEmail(true);
    }
  }, [path]);

  const writeBack = async (newComments: Comment[], newLikers: string[]) => {
    const res = await fetch(BIN_URL, { headers: BIN_HEADERS });
    const { record } = await res.json();
    record[path] = record[path] || { comments: [], likers: [] };
    record[path].comments = newComments;
    record[path].likers = newLikers;
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: BIN_HEADERS,
      body: JSON.stringify(record),
    });
  };

  const onEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const t = email.trim();
    if (!validateEmail(t)) return alert('Enter a valid email');
    localStorage.setItem('giscus_email', t);
    setHasSavedEmail(true);
  };

  const hasCommented = comments.some(c => c.authorEmail === email);
  const hasLiked = likers.includes(email);

  const onCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hasSavedEmail) return alert('Save your email first');
    const txt = draft.trim();
    if (!txt) return;
    if (hasCommented) return alert('You’ve already commented');
    const c: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      authorEmail: email,
      authorName: nameFromEmail(email),
      text: txt,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    const updated = [c, ...comments];
    setComments(updated);
    setDraft('');
    await writeBack(updated, likers);
  };

  const onReplySubmit = async (e: FormEvent, cid: string) => {
    e.preventDefault();
    if (!hasSavedEmail) return alert('Save your email first');
    const txt = (replyDrafts[cid] || '').trim();
    if (!txt) return;
    const r: Reply = {
      id: `${Date.now()}-${Math.random()}`,
      authorEmail: email,
      authorName: nameFromEmail(email),
      text: txt,
      createdAt: new Date().toISOString(),
    };
    const updated = comments.map(c =>
      c.id === cid ? { ...c, replies: [r, ...c.replies] } : c,
    );
    setComments(updated);
    setReplyDrafts(prev => ({ ...prev, [cid]: '' }));
    setActiveReply(null);
    await writeBack(updated, likers);
  };

  const onDeleteComment = async (cid: string) => {
    if (!confirm('Delete your comment?')) return;
    const updated = comments.filter(c => c.id !== cid);
    setComments(updated);
    await writeBack(updated, likers);
  };

  const onLike = async () => {
    if (!hasSavedEmail) return alert('Save your email first');
    if (hasLiked) return;
    const updated = [email, ...likers];
    setLikers(updated);
    await writeBack(comments, updated);
  };

  return (
    <div className='mx-auto max-w-xl rounded border bg-white p-4 dark:bg-gray-800'>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-xl'>
          Comments: <strong>{comments.length}</strong> | Likes:{' '}
          <strong>{likers.length}</strong>
        </h3>
        <button
          onClick={onLike}
          disabled={!hasSavedEmail || hasLiked}
          className='text-blue-600'
        >
          👍
        </button>
      </div>

      {/* Email Entry */}
      {!hasSavedEmail ? (
        <form onSubmit={onEmailSubmit} className='mb-6'>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full rounded border bg-gray-50 p-2 dark:bg-gray-700 dark:text-gray-100'
            placeholder='Your email'
          />
          <button
            type='submit'
            className='mt-2 rounded bg-blue-600 px-4 py-1 text-white'
          >
            Save Email
          </button>
        </form>
      ) : (
        <p className='mb-4 text-gray-900 dark:text-gray-100'>
          You are <strong>{nameFromEmail(email)}</strong> ({email})
        </p>
      )}

      {/* Comments List */}
      <ul className='mb-6 space-y-6'>
        {comments.length === 0 && (
          <li className='text-gray-600 dark:text-gray-400'>No comments yet.</li>
        )}
        {comments.map(c => (
          <li key={c.id} className='border-b pb-4'>
            <div className='flex items-start justify-between'>
              <div>
                <p className='text-gray-900 dark:text-gray-100'>
                  <strong>{c.authorName}</strong>{' '}
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </p>
                <p className='mt-1 text-gray-800 dark:text-gray-200'>
                  {c.text}
                </p>
              </div>
              {hasSavedEmail && c.authorEmail === email && (
                <button
                  onClick={() => onDeleteComment(c.id)}
                  className='text-sm text-red-600 hover:underline'
                >
                  Delete
                </button>
              )}
            </div>
            <button
              onClick={() => setActiveReply(c.id)}
              className='mt-2 text-sm text-blue-600 dark:text-blue-400'
            >
              Reply
            </button>

            {activeReply === c.id && (
              <form
                onSubmit={e => onReplySubmit(e, c.id)}
                className='mt-2 border-l border-gray-200 pl-4 dark:border-gray-700'
              >
                <textarea
                  rows={2}
                  value={replyDrafts[c.id] || ''}
                  onChange={e =>
                    setReplyDrafts(prev => ({
                      ...prev,
                      [c.id]: e.target.value,
                    }))
                  }
                  className='w-full rounded border bg-gray-50 p-2 dark:bg-gray-700 dark:text-gray-100'
                  placeholder='Write a reply…'
                />
                <button
                  type='submit'
                  className='mt-1 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-700'
                >
                  Post Reply
                </button>
              </form>
            )}

            {c.replies.length > 0 && (
              <ul className='mt-4 space-y-4 border-l border-gray-200 pl-4 dark:border-gray-700'>
                {c.replies.map(r => (
                  <li key={r.id}>
                    <p className='text-gray-900 dark:text-gray-100'>
                      <strong>{r.authorName}</strong>{' '}
                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                        {new Date(r.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p className='mt-1 text-gray-800 dark:text-gray-200'>
                      {r.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* New Comment Form */}
      {hasSavedEmail && (
        <form onSubmit={onCommentSubmit} className='mt-6'>
          <h4 className='mb-2 font-semibold text-gray-900 dark:text-gray-100'>
            Leave a comment
          </h4>
          <textarea
            rows={3}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className='mb-2 w-full rounded border bg-gray-50 p-2 dark:bg-gray-700 dark:text-gray-100'
            placeholder={
              hasCommented ? 'You’ve already commented.' : 'Write your comment…'
            }
            disabled={hasCommented}
          />
          <button
            type='submit'
            disabled={hasCommented}
            className={`rounded px-4 py-2 text-white ${
              hasCommented
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {hasCommented ? 'Comment Posted' : 'Post Comment'}
          </button>
        </form>
      )}
    </div>
  );
}
