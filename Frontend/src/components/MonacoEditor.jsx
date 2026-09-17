import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import './MonacoEditor.css';

export default function MonacoEditor({
  code,
  onChange,
  language = 'javascript',
  onReset,
}) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, _monaco) => {
    editorRef.current = editor;
  };

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div className="monaco-editor-wrapper">
      <div className="monaco-editor-header">
        <div className="monaco-editor-tab">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#f7df1e' }}>
            javascript
          </span>
          <span>solution.js</span>
        </div>
        <div className="monaco-editor-controls">
          <button
            type="button"
            className="editor-btn-icon"
            onClick={handleFormat}
            title="Format Code"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              format_align_left
            </span>
            Format
          </button>
          {onReset && (
            <button
              type="button"
              className="editor-btn-icon"
              onClick={onReset}
              title="Reset to Original Buggy Code"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                restart_alt
              </span>
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="monaco-editor-container">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            lineNumbers: 'on',
            wordWrap: 'on',
            lineDecorationsWidth: 10,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
}
