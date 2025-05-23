import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface SpeechBoxProps {
  user: boolean;
  message: string;
}

const SpeechBox: React.FC<SpeechBoxProps> = ({user, message}) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-3xl shadow-lg w-[50%] h-144">
      {user ? (
        <>
          <h4 className="w-full text-start">You</h4>
          <div
            className="overflow-y-auto h-full"
            onWheel={e => e.stopPropagation()}
          >
            <p className="text-xs">{message}</p>
          </div>
        </>
      ) : (
        <>
          <h4 className="w-full text-end">Atlas (v0.1.1)</h4>
          <div
            className="overflow-y-auto h-full"
            onWheel={e => e.stopPropagation()}
          >
            <p className="text-xs">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {message}
              </ReactMarkdown>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SpeechBox;
