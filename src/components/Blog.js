import React from 'react';

const blogs = [
  {
    id: 1,
    title: 'Django: From Zero to getting your first job',
    summary: 'A beginner-friendly guide to Django and how to get your first job as a Django developer.',
    url: 'https://learningblogs.ue.r.appspot.com/posts/'
  },
];

const Blog = () => {
  return (
    
    <div className="container mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Blogs</h2>
      {blogs.map(blog => (
        <div key={blog.id} className="mb-4">
          <h3 className="font-bold text-lg"><a href={blog.url} className="hover:underline text-blue-500">{blog.title}</a></h3>
          <p className="text-gray-700">{blog.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
