"use strict";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  ShieldCheck, 
  AlertTriangle,
  Send,
  Flag,
  Phone
} from "lucide-react";

const TOXIC_WORDS = ["hate", "stupid", "idiot", "kill", "abuse"];

const SAFETY_RESOURCES = [
  { name: "National Domestic Violence Hotline", phone: "1-800-799-SAFE (7233)", link: "https://www.thehotline.org/" },
  { name: "Cyber Civil Rights Initiative", phone: "1-844-878-CCRI (2274)", link: "https://www.cybercivilrights.org/" },
  { name: "Crisis Text Line", phone: "Text HOME to 741741", link: "https://www.crisistextline.org/" },
];

// Mock Data
const INITIAL_POSTS = [
  {
    id: "1",
    author: "Sarah J.",
    avatar: "bg-blue-200 text-blue-700",
    time: "2 hours ago",
    category: "Mental Wellness",
    title: "Dealing with anxiety during my cycle",
    content: "Has anyone else noticed their anxiety spiking right before their period? I've been trying meditation but looking for other tips that might help.",
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: "2",
    author: "Emily R.",
    avatar: "bg-indigo-200 text-indigo-700",
    time: "4 hours ago",
    category: "Cycle Health",
    title: "Best natural remedies for cramps?",
    content: "I'm trying to reduce my intake of painkillers. What natural teas or remedies have worked for you ladies?",
    likes: 45,
    comments: 12,
    isLiked: true,
  },
  {
    id: "3",
    author: "Anonymous",
    avatar: "bg-slate-200 text-slate-700",
    time: "6 hours ago",
    category: "Safety",
    title: "Stay safe while jogging at night",
    content: "Just wanted to share a great app I found for safety tracking when I go for my evening runs. It's called...",
    likes: 112,
    comments: 5,
    isLiked: false,
  },
];

const CATEGORIES = ["All", "Mental Wellness", "Cycle Health", "Safety", "General", "Advice"];

export default function CommunityPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [reportedPosts, setReportedPosts] = useState<string[]>([]);

  const handleLike = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleReport = (id: string) => {
    if (confirm("Are you sure you want to report this post for violating community guidelines?")) {
      setReportedPosts([...reportedPosts, id]);
      alert("Post reported. Our moderation team will review it shortly.");
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    // AI Moderation Check
    const combinedText = `${newPostTitle} ${newPostContent}`.toLowerCase();
    const hasToxicContent = TOXIC_WORDS.some(word => combinedText.includes(word));

    if (hasToxicContent) {
      alert("Your post contains words that violate our community guidelines. Please revise it.");
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      author: "You",
      avatar: "bg-primary/20 text-primary",
      time: "Just now",
      category: newPostCategory,
      title: newPostTitle,
      content: newPostContent,
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsCreatingPost(false);
  };

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Safe Space</h1>
          <p className="text-muted-foreground mt-1">Connect, share, and support each other in a safe environment.</p>
        </div>
        <button 
          onClick={() => setIsCreatingPost(true)}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post Form (Collapsible) */}
          <AnimatePresence>
            {isCreatingPost && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-foreground">Start a Discussion</h3>
                    <button onClick={() => setIsCreatingPost(false)} className="text-muted-foreground hover:text-foreground">
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="What's on your mind?"
                        rows={4}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                        className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {CATEGORIES.filter(c => c !== "All").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Post
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${post.avatar}`}>
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.time} • {post.category}</p>
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                </div>

                <div className="mt-6 flex items-center gap-6 pt-4 border-t border-border">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      post.isLiked ? "text-pink-500" : "text-muted-foreground hover:text-pink-500"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <MessageSquare className="h-5 w-5" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                  <button 
                    onClick={() => handleReport(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ml-auto ${
                      reportedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                    }`}
                    disabled={reportedPosts.includes(post.id)}
                  >
                    <Flag className="h-5 w-5" />
                    {reportedPosts.includes(post.id) ? "Reported" : "Report"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Resources Card */}
          <div className="bg-red-50/50 dark:bg-red-950/20 rounded-xl p-6 border border-red-100 dark:border-red-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Phone className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-red-900 dark:text-red-100">Safety & Support</h3>
            </div>
            <p className="text-sm text-red-800 dark:text-red-200 mb-4">
              If you are feeling unsafe or need immediate support, these resources are available 24/7.
            </p>
            <ul className="space-y-3">
              {SAFETY_RESOURCES.map((resource, idx) => (
                <li key={idx} className="text-sm">
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="font-medium text-red-700 dark:text-red-300 hover:underline block">
                    {resource.name}
                  </a>
                  <span className="text-red-600 dark:text-red-400">{resource.phone}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Guidelines Card */}
          <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Community Guidelines</h3>
            </div>
            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                Be respectful and kind to others.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                No hate speech or harassment.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                Protect your personal information.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                Support each other in a safe space.
              </li>
            </ul>
          </div>

          {/* Trending Topics */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Important Alerts
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                <p className="text-sm font-medium text-amber-900 dark:text-amber-100">Cyber Safety Workshop</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Join us this Friday for a workshop on online safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}