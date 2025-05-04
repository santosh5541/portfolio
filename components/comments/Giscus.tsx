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

// JSON-Bin endpoint and headers
const BIN_URL = 'https://api.jsonbin.io/v3/b/6817948f8a456b7966978a10';
const BIN_HEADERS = {
  'Content-Type': 'application/json',
  'X-Master-Key':
    '$2a$10$1YLJZl9lIrS.PvWSTYnvTudCY2ok.EFzE2T48CqWhS2ytBIamI56q',
};

export default function Giscus() {
  // Use current path as key for isolation
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
      // Initialize bucket if not present
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
    // load email locally
    const stored = localStorage.getItem('giscus_email');
    if (stored) {
      setEmail(stored);
      setHasSavedEmail(true);
    }
  }, [path]);

  // Write back only this path data
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
      {/* ...rest of UI unchanged... */}
    </div>
  );
}
