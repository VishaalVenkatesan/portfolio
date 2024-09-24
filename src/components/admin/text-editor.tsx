import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BulletList from '@tiptap/extension-bullet-list'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Strikethrough, Code } from 'lucide-react';
import { Editor } from '@tiptap/react';

type SimpleTextEditorProps = {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b pb-2 mb-2 flex flex-wrap gap-2">
      {[
        { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), isActive: () => editor.isActive('bold'), tooltip: 'Bold' },
        { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), isActive: () => editor.isActive('italic'), tooltip: 'Italic' },
        { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), isActive: () => editor.isActive('underline'), tooltip: 'Underline' },
        { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), isActive: () => editor.isActive('strike'), tooltip: 'Strikethrough' },
        { icon: Code, action: () => editor.chain().focus().toggleCode().run(), isActive: () => editor.isActive('code'), tooltip: 'Code' },
        { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.isActive('heading', { level: 1 }), tooltip: 'Heading 1' },
        { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.isActive('heading', { level: 2 }), tooltip: 'Heading 2' },
        { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), isActive: () => editor.isActive('bulletList'), tooltip: 'Bullet List' },
        { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), isActive: () => editor.isActive('orderedList'), tooltip: 'Numbered List' },
        { icon: AlignLeft, action: () => editor.chain().focus().setTextAlign('left').run(), isActive: () => editor.isActive({ textAlign: 'left' }), tooltip: 'Align Left' },
        { icon: AlignCenter, action: () => editor.chain().focus().setTextAlign('center').run(), isActive: () => editor.isActive({ textAlign: 'center' }), tooltip: 'Align Center' },
        { icon: AlignRight, action: () => editor.chain().focus().setTextAlign('right').run(), isActive: () => editor.isActive({ textAlign: 'right' }), tooltip: 'Align Right' },
        { icon: AlignJustify, action: () => editor.chain().focus().setTextAlign('justify').run(), isActive: () => editor.isActive({ textAlign: 'justify' }), tooltip: 'Justify' },
      ].map(({ icon: Icon, action, isActive, tooltip }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={isActive() ? 'secondary' : 'outline'}
              onClick={action}
            >
              <Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};


const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'mb-6 mt-2' 
      },
    };
  },
});

const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'list-disc pl-5 mb-6 mt-2' 
      },
    };
  },
});

const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'mb-2' 
      },
    };
  },
});

export const TiptapEditor: React.FC<SimpleTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        bulletList: false,
        listItem: false,
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      Document,
      CustomParagraph,
      CustomBulletList,
      CustomListItem,
      Text,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none prose-ul:list-disc prose-ul:pl-5',
      },
    },
  });

  return (
    <TooltipProvider>
      <div className="border rounded-md p-2">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="min-h-[300px] max-h-[500px] overflow-y-auto px-4 py-2"
        />
      </div>
    </TooltipProvider>
  );
};