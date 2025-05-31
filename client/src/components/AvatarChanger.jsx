import React, { useRef, useState } from 'react';
import axios from 'axios';

const AvatarChanger = ({ avatarImgUrl }) => {
  const [avatarUrl, setAvatarUrl] = useState(
    avatarImgUrl ||
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSnBhfNH6mX2_H7uYCrPmZSbDINLzsdzDbrrqlfTsZnlAgO2dVcr7_Hc9ImWn7gi9UpZUzNQF2tcHgskLB0LfLZPLW7Yb41HYBtRzB94UNaU_Z-4KqLMBvI'
  );
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickChange = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    fileInputRef.current.value = null;
  };

  const handleSaveAvatar = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newAvatarUrl = response.data.url;
      setAvatarUrl(newAvatarUrl);
      setPreviewUrl(null);
      fileInputRef.current.value = null;
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={previewUrl || avatarUrl}
          alt="Avatar"
          className="max-w-150 h-150  object-cover border mb-4"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {!previewUrl ? (
          <button
            type='button'
            onClick={handleClickChange}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đổi ảnh đại diện
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              type='button'
              onClick={handleSaveAvatar}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Cập nhật
            </button>
            <button
              type='button'
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarChanger;
