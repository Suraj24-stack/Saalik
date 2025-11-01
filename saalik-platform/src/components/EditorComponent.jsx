// EditorComponent.jsx - FINAL CORRECTED VERSION
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, useSlateStatic, useSelected, useFocused, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://saalik-api.prepedo.com/api/v1";

// =====================
// PLUGINS
// =====================

const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] });
};

// =====================
// EDITOR COMPONENT
// =====================

const EditorComponent = ({ value, setValue }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const toggleMark = (format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format) => {
    const isActive = isBlockActive(editor, format);
    const isList = ['numbered-list', 'bulleted-list'].includes(format);

    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && ['numbered-list', 'bulleted-list'].includes(n.type),
      split: true,
    });

    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const isBlockActive = (editor, format) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
      })
    );

    return !!match;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('You must be logged in to upload images');
        setUploadingImage(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/stories/upload-image`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success && response.data.url) {
        insertImage(editor, response.data.url);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      if (error.response?.status === 403) {
        alert('Permission denied. Please check you are logged in as admin.');
      } else {
        alert('Failed to upload image: ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  const handleKeyDown = (event) => {
    if (!event.ctrlKey && !event.metaKey) return;

    switch (event.key) {
      case 'b':
        event.preventDefault();
        toggleMark('bold');
        break;
      case 'i':
        event.preventDefault();
        toggleMark('italic');
        break;
      case 'u':
        event.preventDefault();
        toggleMark('underline');
        break;
      default:
        break;
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 border-b border-gray-300 flex-wrap">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isMarkActive(editor, 'bold')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } font-semibold text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleMark('bold'); }}
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isMarkActive(editor, 'italic')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } italic text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleMark('italic'); }}
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isMarkActive(editor, 'underline')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } underline text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleMark('underline'); }}
            title="Underline (Ctrl+U)"
          >
            U
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Headings */}
        <div className="flex gap-1">
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'heading-one')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } font-semibold text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('heading-one'); }}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'heading-two')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } font-semibold text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('heading-two'); }}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'heading-three')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } font-semibold text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('heading-three'); }}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Lists & Quote */}
        <div className="flex gap-1">
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'bulleted-list')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('bulleted-list'); }}
            title="Bulleted List"
          >
            • List
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'numbered-list')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('numbered-list'); }}
            title="Numbered List"
          >
            1. List
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 rounded border ${
              isBlockActive(editor, 'block-quote')
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            } text-sm transition-colors`}
            onMouseDown={(e) => { e.preventDefault(); toggleBlock('block-quote'); }}
            title="Quote"
          >
            " Quote
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300"></div>

        {/* Image Upload */}
        <label className={`px-3 py-1.5 rounded border bg-white text-gray-700 border-gray-300 hover:bg-gray-100 text-sm cursor-pointer transition-colors ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
          📷 Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploadingImage}
          />
        </label>

        {uploadingImage && (
          <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
            Uploading...
          </span>
        )}
      </div>

      {/* Editor Content */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable
          className="min-h-[400px] max-h-[600px] overflow-y-auto p-5 text-gray-900 text-base leading-relaxed focus:outline-none"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Write your story here... You can paste images directly or use the image button."
          spellCheck
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

// =====================
// ELEMENT RENDERERS
// =====================

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...attributes} className="border-l-4 border-blue-500 pl-4 my-4 bg-gray-50 py-2 text-gray-600 italic">
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul {...attributes} className="list-disc list-inside my-4 pl-4">
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 {...attributes} className="text-3xl font-bold my-4 text-gray-900">
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 {...attributes} className="text-2xl font-semibold my-3 text-gray-900">
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 {...attributes} className="text-xl font-semibold my-2 text-gray-900">
          {children}
        </h3>
      );
    case 'list-item':
      return (
        <li {...attributes} className="my-1">
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol {...attributes} className="list-decimal list-inside my-4 pl-4">
          {children}
        </ol>
      );
    case 'image':
      return <ImageElement {...attributes} element={element}>{children}</ImageElement>;
    default:
      return (
        <p {...attributes} className="my-2 text-gray-900">
          {children}
        </p>
      );
  }
};

const ImageElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes}>
      <div contentEditable={false} className="relative inline-block max-w-full my-4">
        <img
          src={element.url}
          alt="Story content"
          className={`max-w-full h-auto rounded shadow-lg ${selected && focused ? 'ring-4 ring-blue-500' : ''}`}
        />
        {selected && focused && (
          <button
            type="button"
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
            onClick={() => {
              const path = ReactEditor.findPath(editor, element);
              Transforms.removeNodes(editor, { at: path });
            }}
          >
            ✕ Remove
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

// =====================
// LEAF RENDERER
// =====================

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong className="font-bold">{children}</strong>;
  }

  if (leaf.italic) {
    children = <em className="italic">{children}</em>;
  }

  if (leaf.underline) {
    children = <u className="underline">{children}</u>;
  }

  if (leaf.code) {
    children = <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

// =====================
// SERIALIZATION UTILITIES
// =====================

export const serialize = (nodes) => {
  return nodes.map(n => serializeNode(n)).join('');
};

const serializeNode = (node) => {
  if (node.text !== undefined) {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.code) text = `<code>${text}</code>`;
    return text;
  }

  const children = node.children.map(n => serializeNode(n)).join('');

  switch (node.type) {
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'heading-three':
      return `<h3>${children}</h3>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'image':
      return `<img src="${node.url}" alt="Story content" />`;
    default:
      return children;
  }
};

export const deserialize = (html) => {
  if (!html || html.trim() === '') {
    return [{ type: 'paragraph', children: [{ text: '' }] }];
  }

  const document = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(document.body.childNodes).map(node => deserializeNode(node)).flat();
};

const deserializeNode = (node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return { text: node.textContent };
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const children = Array.from(node.childNodes).map(child => deserializeNode(child)).flat().filter(Boolean);

  if (children.length === 0) {
    children.push({ text: '' });
  }

  switch (node.nodeName) {
    case 'BODY':
      return children;
    case 'BR':
      return { text: '\n' };
    case 'BLOCKQUOTE':
      return { type: 'block-quote', children };
    case 'P':
      return { type: 'paragraph', children };
    case 'H1':
      return { type: 'heading-one', children };
    case 'H2':
      return { type: 'heading-two', children };
    case 'H3':
      return { type: 'heading-three', children };
    case 'UL':
      return { type: 'bulleted-list', children };
    case 'OL':
      return { type: 'numbered-list', children };
    case 'LI':
      return { type: 'list-item', children };
    case 'IMG':
      return { type: 'image', url: node.getAttribute('src'), children: [{ text: '' }] };
    case 'STRONG':
    case 'B':
      return children.map(child => ({ ...child, bold: true }));
    case 'EM':
    case 'I':
      return children.map(child => ({ ...child, italic: true }));
    case 'U':
      return children.map(child => ({ ...child, underline: true }));
    case 'CODE':
      return children.map(child => ({ ...child, code: true }));
    default:
      return children;
  }
};

export default EditorComponent;