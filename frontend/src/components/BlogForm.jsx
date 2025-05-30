export default function BlogForm({ formData, setFormData, handleSubmit, isEditing }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full p-3 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-textPrimary mb-1">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows="8"
          className="w-full p-3 border border-border rounded text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded font-semibold hover:bg-primaryDark transition"
      >
        {isEditing ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}