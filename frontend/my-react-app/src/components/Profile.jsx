import React, { useState } from 'react';
import './styles/Profile.css';

const Profile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* <div className="profile-avatar-wrapper">
          <img 
            src={user?.avatar || 'default-avatar.png'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <button className="profile-avatar-upload">
            <span>Update Photo</span>
          </button>
        </div> */}
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>
            <div className="profile-actions">
              <button type="submit" className="button">Save Changes</button>
              <button 
                type="button" 
                className="button button--secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-section">
              <h2>About</h2>
              <p>{user?.bio || 'No bio added yet.'}</p>
            </div>
            <button 
              className="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;