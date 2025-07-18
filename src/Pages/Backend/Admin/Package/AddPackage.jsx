import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";

// Custom CKEditor build extension for image handling
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve({ default: reader.result });
        };
      });
    });
  }

  abort() {}
}

function CustomUploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    thumbnail: null,
    description: "",
  });

  const [thumbPreview, setThumbPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, description: data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Travel package submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl font-bold text-center text-indigo-700">
          ✈️ Add New Travel Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full p-2 border rounded-lg"
            />
            {thumbPreview && (
              <div className="mt-4 w-1/3">
                <img
                  src={thumbPreview}
                  alt="Thumbnail Preview"
                  className="w-full rounded-xl shadow-md border border-indigo-300"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter package title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Enter package subtitle"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium block mb-2 text-gray-700">Description</label>
            <div className="border border-gray-300 rounded-lg p-2 bg-white">
              <CKEditor
                editor={ClassicEditorBase}
                data={formData.description}
                config={{
                  extraPlugins: [CustomUploadPlugin],
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "|",
                    "insertTable",
                    "blockQuote",
                    "imageUpload",
                    "imageResize",
                    "mediaEmbed",
                    "undo",
                    "redo",
                    "alignment",
                    "outdent",
                    "indent",
                  ],
                  image: {
                    resizeUnit: "%",
                    toolbar: [
                      "imageStyle:alignLeft",
                      "imageStyle:alignCenter",
                      "imageStyle:alignRight",
                      "|",
                      "imageResize",
                      "imageTextAlternative",
                    ],
                    styles: ["alignLeft", "alignCenter", "alignRight"],
                  },
                  mediaEmbed: {
                    previewsInData: true,
                  },
                }}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Submit Package 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
