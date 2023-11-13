import React, { Component, useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ckeditor5Dll from 'ckeditor5/build/ckeditor5-dll.js'; // eslint-disable-line no-unused-vars
// import ckeditor5EditorClassicDll from '@ckeditor/ckeditor5-editor-classic/build/editor-classic.js'; // eslint-disable-line no-unused-vars
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// plugin DLLs
// import ckeditor5AlignmentDll from "@ckeditor/ckeditor5-alignment/build/alignment.js";
// import ckeditor5AutoformatDll from "@ckeditor/ckeditor5-autoformat/build/autoformat.js";
import ckeditor5BasicStylesDll from "@ckeditor/ckeditor5-basic-styles/build/basic-styles.js"; // eslint-disable-line no-unused-vars
// import ckeditor5BlockQuoteDll from "@ckeditor/ckeditor5-block-quote/build/block-quote.js";
// import ckeditor5CodeBlockDll from "@ckeditor/ckeditor5-code-block/build/code-block.js";
import ckeditor5EssentialsDll from "@ckeditor/ckeditor5-essentials/build/essentials.js"; // eslint-disable-line no-unused-vars
// import ckeditor5FontDll from "@ckeditor/ckeditor5-font/build/font.js";
// import ckeditor5HeadingDll from "@ckeditor/ckeditor5-heading/build/heading.js";
// import ckeditor5HighlightDll from '@ckeditor/ckeditor5-highlight/build/highlight.js';
// import ckeditor5HtmlEmbedDll from "@ckeditor/ckeditor5-html-embed/build/html-embed.js";
// import ckeditor5HorizontalLineDll from "@ckeditor/ckeditor5-horizontal-line/build/horizontal-line.js";
// import ckeditor5MarkdownDll from '@ckeditor/ckeditor5-markdown-gfm/build/markdown-gfm';
// import ckeditor5MediaEmbedDll from "@ckeditor/ckeditor5-media-embed/build/media-embed.js";
// import ckeditor5ImageDll from "@ckeditor/ckeditor5-image/build/image.js";
// import ckeditor5IndentDll from "@ckeditor/ckeditor5-indent/build/indent.js";
// import ckeditor5LinkDll from "@ckeditor/ckeditor5-link/build/link.js";
// import ckeditor5ListDll from "@ckeditor/ckeditor5-list/build/list.js";
// import ckeditor5PasteFromOfficeDll from "@ckeditor/ckeditor5-paste-from-office/build/paste-from-office.js";
// import ckeditor5FindAndReplaceDll from "@ckeditor/ckeditor5-find-and-replace/build/find-and-replace.js";
// import ckeditor5RemoveFormatDll from "@ckeditor/ckeditor5-remove-format/build/remove-format.js";
// import ckeditor5SpecialCharactersDll from "@ckeditor/ckeditor5-special-characters/build/special-characters.js";
// import ckeditor5TableDll from "@ckeditor/ckeditor5-table/build/table.js";
// import ckeditor5MaximumLengthDll from "@reinmar/ckeditor5-maximum-length/build/maximum-length.js";

// import { Callout } from './Callout/Callout';

const editorConfiguration = {
    plugins: [
        // window.CKEditor5.autoformat.Autoformat,
        window.CKEditor5.basicStyles.Bold,
        window.CKEditor5.basicStyles.Italic,
        window.CKEditor5.essentials.Essentials,
        // window.CKEditor5.heading.Heading,
        // window.CKEditor5.image.Image,
        // window.CKEditor5.image.ImageCaption,
        // window.CKEditor5.image.ImageStyle,
        // window.CKEditor5.image.ImageToolbar,
        // window.CKEditor5.image.ImageUpload,
        // window.CKEditor5.indent.Indent,
        // window.CKEditor5.link.Link,
        // window.CKEditor5.list.List,
        // window.CKEditor5.paragraph.Paragraph,
        // window.CKEditor5.pasteFromOffice.PasteFromOffice,
        // window.CKEditor5.table.Table,
        // window.CKEditor5.table.TableToolbar,
        // window.CKEditor5.table.TableColumnResize,
        // window.CKEditor5.table.TableCaption,
    ],
    toolbar: ['bold', 'italic']
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 from source in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    config={ editorConfiguration }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default App;
