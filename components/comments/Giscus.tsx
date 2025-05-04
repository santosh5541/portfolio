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

export default function Giscus() {
  const [email, setEmail] = useState('');
  const [hasSavedEmail, setHasSavedEmail] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [likers, setLikers] = useState<string[]>([]);

  const EMAIL_KEY = 'giscus_email';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const COMMENTS_KEY = `comments_${path}`;
  const LIKERS_KEY = `likers_${path}`;

  // Email validation and name derivation
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const nameFromEmail = (e: string) =>
    e
      .split('@')[0]
      .split(/[._-]/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  // Load from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedEmail = localStorage.getItem(EMAIL_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setHasSavedEmail(true);
    }
    const rawC = localStorage.getItem(COMMENTS_KEY);
    if (rawC) setComments(JSON.parse(rawC));
    const rawL = localStorage.getItem(LIKERS_KEY);
    if (rawL) setLikers(JSON.parse(rawL));
  }, []);

  // Persist via localStorage
  const persistEmail = (e: string) => {
    localStorage.setItem(EMAIL_KEY, e);
    setHasSavedEmail(true);
  };
  const persistComments = (list: Comment[]) => {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(list));
    setComments(list);
  };
  const persistLikers = (list: string[]) => {
    localStorage.setItem(LIKERS_KEY, JSON.stringify(list));
    setLikers(list);
  };

  // Handlers
  const onEmailSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const trimmed = email.trim();
    if (!validateEmail(trimmed)) {
      alert('Please enter a valid email.');
      return;
    }
    persistEmail(trimmed);
  };

  const hasCommented = comments.some(c => c.authorEmail === email);
  const hasLiked = likers.includes(email);

  const onCommentSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!hasSavedEmail) {
      alert('Please save your email first.');
      return;
    }
    const text = draft.trim();
    if (!text) return;
    if (hasCommented) {
      alert('You’ve already commented.');
      return;
    }
    const c: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      authorEmail: email,
      authorName: nameFromEmail(email),
      text,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    persistComments([c, ...comments]);
    setDraft('');
  };

  const onLike = () => {
    if (!hasSavedEmail) {
      alert('Please save your email first.');
      return;
    }
    if (hasLiked) return;
    persistLikers([email, ...likers]);
  };

  const openReplyBox = (cid: string) => setActiveReply(cid);
  const onReplyChange = (cid: string, val: string) =>
    setReplyDrafts(prev => ({ ...prev, [cid]: val }));
  const onReplySubmit = (evt: FormEvent, cid: string) => {
    evt.preventDefault();
    if (!hasSavedEmail) {
      alert('Please save your email first.');
      return;
    }
    const text = (replyDrafts[cid] || '').trim();
    if (!text) return;
    const r: Reply = {
      id: `${Date.now()}-${Math.random()}`,
      authorEmail: email,
      authorName: nameFromEmail(email),
      text,
      createdAt: new Date().toISOString(),
    };
    const updated = comments.map(c =>
      c.id === cid ? { ...c, replies: [r, ...c.replies] } : c,
    );
    persistComments(updated);
    setReplyDrafts(prev => ({ ...prev, [cid]: '' }));
    setActiveReply(null);
  };

  const onDeleteComment = (cid: string) => {
    if (!confirm('Delete your comment permanently?')) return;
    const updated = comments.filter(c => c.id !== cid);
    persistComments(updated);
  };

  return (
    <div className='mx-auto max-w-xl rounded border bg-white p-4 dark:bg-gray-800'>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-xl'>
          Comments: <strong>{comments.length}</strong> | Blog Likes:{' '}
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

      {/* Email Form */}
      {!hasSavedEmail ? (
        <form onSubmit={onEmailSubmit} className='mb-6'>
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full rounded border p-2'
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
        <p className='mb-4'>
          You are <strong>{nameFromEmail(email)}</strong> ({email})
        </p>
      )}

      {/* Comments List */}
      <ul className='mb-6 space-y-6'>
        {comments.length === 0 ? (
          <li>No comments yet.</li>
        ) : (
          comments.map(c => (
            <li key={c.id} className='border-b pb-4'>
              <div className='flex items-start justify-between'>
                <div>
                  <p>
                    <strong>{c.authorName}</strong>{' '}
                    <span className='text-sm text-gray-500'>
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className='mt-1'>{c.text}</p>
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
                onClick={() => openReplyBox(c.id)}
                className='mt-2 text-sm text-blue-600'
              >
                Reply
              </button>
              {activeReply === c.id && (
                <form
                  onSubmit={e => onReplySubmit(e, c.id)}
                  className='mt-2 border-l pl-4'
                >
                  <textarea
                    rows={2}
                    value={replyDrafts[c.id] || ''}
                    onChange={e => onReplyChange(c.id, e.target.value)}
                    className='w-full rounded border p-2'
                    placeholder='Write a reply…'
                  />
                  <button
                    type='submit'
                    className='mt-1 rounded bg-indigo-600 px-3 py-1 text-white'
                  >
                    Post Reply
                  </button>
                </form>
              )}
              {c.replies.length > 0 && (
                <ul className='mt-4 space-y-4 border-l pl-4'>
                  {c.replies.map(r => (
                    <li key={r.id}>
                      <p>
                        <strong>{r.authorName}</strong>{' '}
                        <span className='text-sm text-gray-500'>
                          {new Date(r.createdAt).toLocaleString()}
                        </span>
                      </p>
                      <p className='mt-1'>{r.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        )}
      </ul>

      {/* New Comment Form */}
      {hasSavedEmail && (
        <form onSubmit={onCommentSubmit} className='mt-6'>
          <h4 className='mb-2 font-semibold text-gray-800'>Leave a comment</h4>
          <textarea
            rows={3}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className='mb-2 w-full rounded border p-2'
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
