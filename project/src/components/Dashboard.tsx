import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LogOut, Save, X } from 'lucide-react';
import { User, Item } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/items');
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError('Failed to fetch items');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]);
        setFormData({ name: '', description: '' });
        setShowAddForm(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add item');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const handleEditItem = async (id: number) => {
    if (!formData.name.trim() || !formData.description.trim()) return;

    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setItems(items.map(item => item.id === id ? updatedItem : item));
        setEditingId(null);
        setFormData({ name: '', description: '' });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update item');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`http://localhost:3001/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete item');
      }
    } catch (err) {
      setError('Network error occurred');
    }
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, description: item.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-300 text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-500/20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-purple-200/70 mt-1">Welcome back, {user.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200"
              data-testid="logout-button"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Add Item Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-violet-700 transition-all duration-200 shadow-lg shadow-purple-500/30"
          data-testid="add-item-button"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-500/20">
            <h2 className="text-xl font-semibold text-purple-200 mb-4">Add New Item</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/20 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                  placeholder="Enter item name"
                  required
                  data-testid="add-name-input"
                />
              </div>
              <div>
                <label className="block text-purple-200 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-black/20 border border-purple-500/30 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 resize-none"
                  placeholder="Enter item description"
                  rows={3}
                  required
                  data-testid="add-description-input"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                  data-testid="save-add-button"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ name: '', description: '' });
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-500/20 border border-gray-500/30 text-gray-300 rounded-xl hover:bg-gray-500/30 transition-all duration-200"
                  data-testid="cancel-add-button"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300">
            {error}
            <button 
              onClick={() => setError('')} 
              className="ml-2 text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="max-w-6xl mx-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-purple-300/50 text-lg">No items found</div>
            <p className="text-purple-400/30 mt-2">Add your first item to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="items-grid">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200"
                data-testid={`item-${item.id}`}
              >
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 text-sm"
                      data-testid={`edit-name-${item.id}`}
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 resize-none text-sm"
                      rows={3}
                      data-testid={`edit-description-${item.id}`}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditItem(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg hover:bg-green-500/30 transition-all duration-200 text-sm"
                        data-testid={`save-edit-${item.id}`}
                      >
                        <Save className="w-3 h-3" />
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-500/20 border border-gray-500/30 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-all duration-200 text-sm"
                        data-testid={`cancel-edit-${item.id}`}
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-purple-200 mb-2" data-testid={`item-name-${item.id}`}>
                      {item.name}
                    </h3>
                    <p className="text-purple-300/70 mb-4 text-sm leading-relaxed" data-testid={`item-description-${item.id}`}>
                      {item.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm"
                        data-testid={`edit-button-${item.id}`}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-500/30 transition-all duration-200 text-sm"
                        data-testid={`delete-button-${item.id}`}
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;