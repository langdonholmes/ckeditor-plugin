import React, { Component, useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ckeditor5Dll from 'ckeditor5/build/ckeditor5-dll.js'; // eslint-disable-line no-unused-vars
import ckeditor5EditorClassicDll from '@ckeditor/ckeditor5-editor-classic/build/editor-classic.js'; // eslint-disable-line no-unused-vars

// plugin DLLs
import ckeditor5AlignmentDll from "@ckeditor/ckeditor5-alignment/build/alignment.js";
import ckeditor5AutoformatDll from "@ckeditor/ckeditor5-autoformat/build/autoformat.js";
import ckeditor5BasicStylesDll from "@ckeditor/ckeditor5-basic-styles/build/basic-styles.js"; // eslint-disable-line no-unused-vars
import ckeditor5BlockQuoteDll from "@ckeditor/ckeditor5-block-quote/build/block-quote.js";
import ckeditor5CodeBlockDll from "@ckeditor/ckeditor5-code-block/build/code-block.js";
import ckeditor5EssentialsDll from "@ckeditor/ckeditor5-essentials/build/essentials.js"; // eslint-disable-line no-unused-vars
import ckeditor5FontDll from "@ckeditor/ckeditor5-font/build/font.js";
import ckeditor5HeadingDll from "@ckeditor/ckeditor5-heading/build/heading.js";
import ckeditor5HighlightDll from '@ckeditor/ckeditor5-highlight/build/highlight.js';
import ckeditor5HtmlEmbedDll from "@ckeditor/ckeditor5-html-embed/build/html-embed.js";
import ckeditor5HtmlSupportDll from "@ckeditor/ckeditor5-html-support/build/html-support.js";
import ckeditor5HorizontalLineDll from "@ckeditor/ckeditor5-horizontal-line/build/horizontal-line.js";
import ckeditor5MediaEmbedDll from "@ckeditor/ckeditor5-media-embed/build/media-embed.js";
import ckeditor5ImageDll from "@ckeditor/ckeditor5-image/build/image.js";
import ckeditor5IndentDll from "@ckeditor/ckeditor5-indent/build/indent.js";
import ckeditor5LinkDll from "@ckeditor/ckeditor5-link/build/link.js";
import ckeditor5ListDll from "@ckeditor/ckeditor5-list/build/list.js";
import ckeditor5PasteFromOfficeDll from "@ckeditor/ckeditor5-paste-from-office/build/paste-from-office.js";
import ckeditor5FindAndReplaceDll from "@ckeditor/ckeditor5-find-and-replace/build/find-and-replace.js";
import ckeditor5RemoveFormatDll from "@ckeditor/ckeditor5-remove-format/build/remove-format.js";
import ckeditor5SpecialCharactersDll from "@ckeditor/ckeditor5-special-characters/build/special-characters.js";
import ckeditor5SourceEditingDll from "@ckeditor/ckeditor5-source-editing/build/source-editing.js";
import ckeditor5TableDll from "@ckeditor/ckeditor5-table/build/table.js";
import ckeditor5WordCountDll from "@ckeditor/ckeditor5-word-count/build/word-count.js";
import ckeditor5MaximumLengthDll from "@reinmar/ckeditor5-maximum-length/build/maximum-length.js";

// Development
import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

import { Callout } from './Callout/Callout';
import { CalloutCaption } from "./Callout/CalloutCaption";
import { CalloutToolbar } from "./Callout/CalloutToolbar";

console.log(window);

const editorConfiguration = {
    plugins: [
        window.CKEditor5.alignment.Alignment,
        window.CKEditor5.autoformat.Autoformat,
        window.CKEditor5.basicStyles.Bold,
        window.CKEditor5.basicStyles.Italic,
        window.CKEditor5.basicStyles.Underline,
        window.CKEditor5.basicStyles.Strikethrough,
        window.CKEditor5.basicStyles.Code,
        window.CKEditor5.basicStyles.Subscript,
        window.CKEditor5.basicStyles.Superscript,
        window.CKEditor5.blockQuote.BlockQuote,
        window.CKEditor5.codeBlock.CodeBlock,
        window.CKEditor5.essentials.Essentials,
        window.CKEditor5.findAndReplace.FindAndReplace,
        window.CKEditor5.heading.Heading,
        window.CKEditor5.horizontalLine.HorizontalLine,
        window.CKEditor5.htmlEmbed.HtmlEmbed,
        window.CKEditor5.htmlSupport.GeneralHtmlSupport,
        window.CKEditor5.image.Image,
        window.CKEditor5.image.ImageCaption,
        window.CKEditor5.image.ImageStyle,
        window.CKEditor5.image.ImageToolbar,
        window.CKEditor5.image.ImageUpload,
        window.CKEditor5.image.ImageResize,
        window.CKEditor5.link.Link,
        window.CKEditor5.link.LinkImage,
        window.CKEditor5.list.List,
        window.CKEditor5.list.ListProperties,
        window.CKEditor5.list.TodoList,
        window.CKEditor5.mediaEmbed.MediaEmbed,
        window.CKEditor5.paragraph.Paragraph,
        window.CKEditor5.pasteFromOffice.PasteFromOffice,
        window.CKEditor5.removeFormat.RemoveFormat,
        window.CKEditor5.sourceEditing.SourceEditing,
        window.CKEditor5.specialCharacters.SpecialCharacters,
        window.CKEditor5.specialCharacters.SpecialCharactersEssentials,
        window.CKEditor5.table.Table,
        window.CKEditor5.table.TableToolbar,
        window.CKEditor5.table.TableProperties,
        window.CKEditor5.table.TableCellProperties,
        window.CKEditor5.table.TableColumnResize,
        window.CKEditor5.table.TableCaption,
        window.CKEditor5.wordCount.WordCount,
        window.CKEditor5.highlight.Highlight,
        Callout,
        CalloutCaption,
        CalloutToolbar,
    ],
        toolbar: {
        items: [
            'undo', 'redo',
            '|',
            'heading',
            '|',
            'bold', 'italic', 'underline', 'strikethrough', 'code', 'codeBlock',
            '|',
            'link', 'insertTable', 'horizontalLine', 'blockQuote', 'specialCharacters',
            '|',
            'bulletedList', 'numberedList',
            '-',
            'callout',
            '|',
            'sourceEditing',
        ],
        shouldNotGroupWhenFull: true
        },
        heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        ]
        },
        codeBlock: {
        languages: [
            { language: 'python', label: 'Python' }
        ]
        },
        image: {
        resizeUnit: "%",
        resizeOptions: [{
            name: 'resizeImage:original',
            value: null,
            icon: 'original'
        },
        {
            name: 'resizeImage:25',
            value: '25',
            icon: 'small'
        },
        {
            name: 'resizeImage:50',
            value: '50',
            icon: 'medium'
        },
        {
            name: 'resizeImage:75',
            value: '75',
            icon: 'large'
        }],
        toolbar: [
            'imageStyle:inline', 'imageStyle:block', 'imageStyle:side',
            '|',
            'toggleImageCaption', 'imageTextAlternative',
            '|',
            'linkImage',
            '|',
            'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
        ]
        },
        table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            '|',
            'toggleTableCaption'
        ]
        },
        // wordCount: {
        //   displayCharacters: false,
        //   onUpdate: stats => {
        //     console.log(stats);
        //   }
        // },
        htmlSupport: {
        allow: [
            // Enables all HTML elements and classes (for testing. not safe.)
            {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
            },
            // Enables <div> elements with classes.
            {
            name: /^(div)$/,
            classes: ['column', 'columns']
            },

            {
            name: 'p',
            classes: ['info', 'warning']
            },

            // // Enables <div> with any class attribute (true is a wildcard).
            // {
            //   name: 'div',
            //   attributes: {
            //     class: '*',
            //     style: '*'
            //   }
            // }
        ]
    }
};

const CKEditorInput = ({
    attribute,
    onChange,
    name,
    value,
    disabled,
    labelAction,
    intlLabel,
    required,
    description,
    error
}) => {
    const [editor, setEditorInstance] = useState(null);
    return (
        <CKEditor
            editor={window.CKEditor5.editorClassic.ClassicEditor}
            config={editorConfiguration}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                // setEditorInstance( editor );
                CKEditorInspector.attach(editor);
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
    )
}

CKEditorInput.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: '',
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 from source in React</h2>
                <CKEditorInput />
            </div>
        );
    }
}

export default App;
