// components/Giscus.tsx
import React, { useState, FormEvent, useEffect } from 'react';

interface Comment {
  email: string;
  text: string;
  createdAt: string;
  replies: Comment[];
}

export default function Giscus() {
  const [email, setEmail] = useState('');
  const [isEmailSet, setIsEmailSet] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState('');
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyDraft, setReplyDraft] = useState('');

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const displayName = (e: string) => {
    const [namePart] = e.split('@');
    return namePart
      ? namePart.charAt(0).toUpperCase() + namePart.slice(1)
      : 'Anonymous';
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValidEmail(email)) setIsEmailSet(true);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !isValidEmail(email)) return;
    setComments([
      {
        email: email.trim(),
        text: draft.trim(),
        createdAt: new Date().toISOString(),
        replies: [],
      },
      ...comments,
    ]);
    setDraft('');
  };

  const handleReplySubmit = (e: FormEvent, idx: number) => {
    e.preventDefault();
    if (!replyDraft.trim() || !isValidEmail(email)) return;
    const updated = comments.map((c, i) =>
      i === idx
        ? {
            ...c,
            replies: [
              {
                email: email.trim(),
                text: replyDraft.trim(),
                createdAt: new Date().toISOString(),
                replies: [],
              },
              ...c.replies,
            ],
          }
        : c,
    );
    setComments(updated);
    setReplyTo(null);
    setReplyDraft('');
  };

  const toggleLike = () => {
    if (!isValidEmail(email)) return;
    const copy = new Set(likes);
    if (copy.has(email)) copy.delete(email);
    else copy.add(email);
    setLikes(copy);
  };

  const userHasLiked = likes.has(email);

  return (
    <div className='mx-auto my-6 max-w-xl rounded border bg-white p-4 dark:bg-gray-800'>
      <h3 className='mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100'>
        Comments & Likes
      </h3>
      {/* Display totals */}
      <div className='mb-4 text-gray-700 dark:text-gray-300'>
        <span className='mr-4'>
          {likes.size} {likes.size === 1 ? 'Like' : 'Likes'}
        </span>
        <span>
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
      </div>

      {/* Email prompt */}
      {!isEmailSet && (
        <form onSubmit={handleEmailSubmit} className='mb-4'>
          <input
            type='email'
            placeholder='you@example.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='mb-2 w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
          />
          <button
            type='submit'
            disabled={!isValidEmail(email)}
            className='rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50'
          >
            Save Email
          </button>
        </form>
      )}

      {/* Like & Comment form */}
      {isEmailSet && (
        <>
          <div className='mb-4 flex items-center space-x-4'>
            <button
              onClick={toggleLike}
              className={`rounded px-4 py-1 ${
                userHasLiked
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {userHasLiked ? '💔 Unlike' : '❤️ Like'}
            </button>
          </div>

          <form onSubmit={handleCommentSubmit} className='mb-6'>
            <p className='mb-2 dark:text-gray-300'>
              Posting as <strong>{displayName(email)}</strong>
            </p>
            <textarea
              rows={3}
              placeholder='Write your comment…'
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className='w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
            />
            <button
              type='submit'
              disabled={!draft.trim()}
              className='mt-2 rounded bg-green-600 px-4 py-1 text-white disabled:opacity-50'
            >
              Post Comment
            </button>
          </form>
        </>
      )}

      {/* Comments & Replies */}
      <ul className='space-y-6'>
        {comments.map((c, i) => (
          <li key={i} className='border-b pb-4'>
            <p className='text-gray-700 dark:text-gray-200'>
              <strong>{displayName(c.email)}</strong>{' '}
              <span className='text-sm text-gray-500'>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </p>
            <p className='mt-1 text-gray-800 dark:text-gray-200'>{c.text}</p>
            <button
              onClick={() => setReplyTo(i)}
              className='mt-2 text-sm text-blue-600 hover:underline'
            >
              Reply
            </button>

            {replyTo === i && (
              <form
                onSubmit={e => handleReplySubmit(e, i)}
                className='mt-2 ml-6 space-y-2'
              >
                <textarea
                  rows={2}
                  placeholder='Write your reply…'
                  value={replyDraft}
                  onChange={e => setReplyDraft(e.target.value)}
                  className='w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                />
                <div className='flex space-x-2'>
                  <button
                    type='submit'
                    disabled={!replyDraft.trim()}
                    className='rounded bg-green-600 px-3 py-1 text-white disabled:opacity-50'
                  >
                    Post Reply
                  </button>
                  <button
                    type='button'
                    onClick={() => {
                      setReplyDraft('');
                      setReplyTo(null);
                    }}
                    className='rounded bg-gray-300 px-3 py-1 text-gray-800'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {c.replies.length > 0 && (
              <ul className='mt-4 ml-6 space-y-4'>
                {c.replies.map((r, ri) => (
                  <li key={ri}>
                    <p className='text-gray-700 dark:text-gray-200'>
                      <strong>{displayName(r.email)}</strong>{' '}
                      <span className='text-sm text-gray-500'>
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
    </div>
  );
}
