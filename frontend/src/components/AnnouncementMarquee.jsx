import React from 'react';
import '../marquee.css';

function AnnouncementMarquee({ announcements }) {
  if (!announcements || announcements.length === 0) return null;
  const text = announcements.map(a => `${a.title}: ${a.summary}`).join('   ***   ');
  return (
    <div className="marquee">
      <div className="marquee-content">{text}</div>
    </div>
  );
}

export default AnnouncementMarquee;
