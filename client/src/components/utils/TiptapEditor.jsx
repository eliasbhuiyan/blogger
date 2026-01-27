import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import Image from '@tiptap/extension-image'

export default function TiptapEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });
    const addImage = useCallback(() => {
        const url = window.prompt('URL')
        const alt = window.prompt('Alt text')
        const width = window.prompt('Width')
        const height = window.prompt('Height')
        if (url) {
            editor.chain().focus().setImage({ src: url, alt, width, height }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    if (!editor) return null;

    return (
        <div className="border rounded-lg min-h-50">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("bold") ? "bg-gray-300" : "bg-white"
                        }`}
                >
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("italic") ? "bg-gray-300" : "bg-white"
                        }`}
                >
                    Italic
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 1 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 3 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 4 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H4
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 5 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H5
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 6 })
                        ? "bg-gray-300"
                        : "bg-white"
                        }`}
                >
                    H6
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-gray-300" : "bg-white"
                        }`}
                >
                    • List
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-gray-300" : "bg-white"
                        }`}
                >
                    1. List
                </button>
                {/* img */}
                <button
                    type="button"
                    onClick={addImage}
                    className={`px-2 py-1 rounded text-sm ${editor.isActive("image") ? "bg-gray-300" : "bg-white"
                        }`}
                >
                    Image
                </button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
            />
        </div>
    );
}
