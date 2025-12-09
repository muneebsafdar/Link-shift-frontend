import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link2, Copy, Trash2, ExternalLink, Calendar, MousePointerClick, Check, AlertTriangle } from 'lucide-react';

interface ShortLink {
  _id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  visits: number;
  createdAt: string;
}

export default function HistoryPage() {
  const { user } = useUser();
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch user's links
  useEffect(() => {
    if (user?.id) {
      fetchLinks();
    }
  }, [user]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/short-links/user/${user?.id}`);
      const data = await response.json();

      
      if (data.success) {
        setLinks(data.data);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  // Copy short link to clipboard
  const handleCopy = (shortCode: string, id: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Delete link with confirmation
  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      const response = await fetch(`http://localhost:5000/api/short-links/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLinks(links.filter(link => link._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    } finally {
      setDeleting(null);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF5EE] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFC4C4] border-t-[#EE6983] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#850E35] font-medium">Loading your links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF5EE] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#850E35] mb-2">Your Links</h1>
          <p className="text-[#850E35]/70">Manage and track all your shortened links</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#FFC4C4]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#850E35]/60">Total Links</p>
                <p className="text-3xl font-bold text-[#850E35]">{links.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#FFC4C4]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#850E35]/60">Total Clicks</p>
                <p className="text-3xl font-bold text-[#850E35]">
                  {links.reduce((sum, link) => sum + link.visits, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#FFC4C4]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-linear-to-br from-[#EE6983] to-[#850E35] rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#850E35]/60">Active This Month</p>
                <p className="text-3xl font-bold text-[#850E35]">{links.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Links List */}
        {links.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border-2 border-[#FFC4C4]">
            <div className="w-20 h-20 bg-[#FCF5EE] rounded-full flex items-center justify-center mx-auto mb-4">
              <Link2 className="w-10 h-10 text-[#EE6983]" />
            </div>
            <h3 className="text-2xl font-bold text-[#850E35] mb-2">No links yet</h3>
            <p className="text-[#850E35]/70 mb-6">Create your first shortened link to get started</p>
            <a
              href="/home"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#EE6983] to-[#850E35] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Create Link
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link._id}
                className="bg-white rounded-2xl p-6 border-2 border-[#FFC4C4] hover:border-[#EE6983] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Link Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <a
                        href={`/${link.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-[#850E35] hover:text-[#EE6983] transition-colors flex items-center gap-2"
                      >
                        {/* `/{link.shortCode}` */}
                        {`${import.meta.env.VITE_BACKEND_URL}/${link.shortCode}`}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    
                    <p className="text-[#850E35]/70 text-sm mb-3 truncate">
                      {link.originalUrl}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#850E35]/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(link.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MousePointerClick className="w-4 h-4" />
                        {link.visits} {link.visits === 1 ? 'click' : 'clicks'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(link.shortCode, link._id)}
                      className="p-3 bg-[#FCF5EE] text-[#850E35] rounded-xl hover:bg-[#FFC4C4] transition-colors"
                      title="Copy link"
                    >
                      {copiedId === link._id ? (
                        <Check className="w-5 h-5 text-[#EE6983]" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>

                    <button
                      onClick={() => setDeleteConfirm(link._id)}
                      className="p-3 bg-[#FCF5EE] text-[#850E35] rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Delete link"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === link._id && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl border-2 border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900 mb-1">
                          Delete this link?
                        </p>
                        <p className="text-sm text-red-700 mb-3">
                          This action cannot be undone. All statistics will be lost.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(link._id)}
                            disabled={deleting === link._id}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            {deleting === link._id ? 'Deleting...' : 'Yes, Delete'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-4 py-2 bg-white text-red-600 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}