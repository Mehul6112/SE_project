import React, { useState } from 'react';
import { Play, FileText, BookOpen } from 'lucide-react';
import { TabButton } from '../ui/TabButton';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

interface Article {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}

const videos: Video[] = [
  {
    id: 'v1',
    title: 'Understanding Stock Market Basics',
    description: 'Learn the fundamentals of stock market investing and trading.',
    duration: '15:30',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&h=225',
  },
  {
    id: 'v2',
    title: 'Mutual Funds Explained',
    description: 'A comprehensive guide to mutual fund investments.',
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=400&h=225',
  },
  {
    id: 'v3',
    title: 'Personal Finance 101',
    description: 'Essential tips for managing your personal finances.',
    duration: '18:20',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&h=225',
  },
];

const articles: Article[] = [
  {
    title: 'Building a Strong Investment Portfolio',
    author: 'Rakesh Jhunjhunwala',
    date: 'March 15, 2024',
    readTime: '8 min',
    category: 'Investment Strategy',
    link: '#',
  },
  {
    title: 'Understanding Market Cycles',
    author: 'Nilesh Shah',
    date: 'March 12, 2024',
    readTime: '12 min',
    category: 'Market Analysis',
    link: '#',
  },
  {
    title: 'Tax-Saving Investment Options',
    author: 'Monika Halan',
    date: 'March 10, 2024',
    readTime: '10 min',
    category: 'Tax Planning',
    link: '#',
  },
];

export function FinancialLiteracy() {
  const [activeTab, setActiveTab] = useState<'videos' | 'articles'>('videos');

  return (
    <div className="p-6">
      <div className="mb-6 flex space-x-4 border-b">
        <TabButton
          active={activeTab === 'videos'}
          onClick={() => setActiveTab('videos')}
        >
          <div className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Video Lessons</span>
          </div>
        </TabButton>
        <TabButton
          active={activeTab === 'articles'}
          onClick={() => setActiveTab('articles')}
        >
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Articles & Research</span>
          </div>
        </TabButton>
      </div>

      {activeTab === 'videos' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{video.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <Play className="h-4 w-4 inline mr-1" />
                    {video.duration}
                  </span>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm font-medium text-blue-600 mb-2 block">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Read</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}