import React from 'react';

type ChatMsg = { from: 'me' | 'them'; text: string; ts: string };

const ChatPage: React.FC = () => {
  const [active, setActive] = React.useState<'magiq' | 'dietitian' | 'fitness'>('magiq');
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<Record<string, ChatMsg[]>>({
    magiq: [
      { from: 'them', text: "Hello 👋 I’m here to guide you. What’s on your mind today?", ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ],
    dietitian: [],
    fitness: [],
  });

  const thread = messages[active] || [];

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => ({
      ...prev,
      [active]: [...(prev[active] || []), { from: 'me', text: input.trim(), ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }],
    }));
    setInput('');
  };

  const lastOf = (key: 'magiq' | 'dietitian' | 'fitness'): ChatMsg | undefined => {
    const arr = messages[key] || [];
    return arr[arr.length - 1];
  };

  return (
    <div className="chat chat--nature">
      <section className="chat__thread">
        <header className="chat__header">
          <div className="chat__peer-row">
            <div className={`chat__avatar ${active === 'magiq' ? 'chat__avatar--na' : ''}`}>{active === 'magiq' ? 'MQ' : active === 'dietitian' ? '🥗' : '💪'}</div>
            <div>
              <div className="chat__peer">{active === 'magiq' ? 'MagiQ' : active === 'dietitian' ? 'Dietitian' : 'Fitness'}</div>
              <div className="chat__sub">{active === 'magiq' ? 'Assistant' : 'Coach'}</div>
            </div>
          </div>
        </header>

        <div className="chat__messages">
          {thread.length === 0 && (
            <>
              <div className="chat__day">Today</div>
              <div className="chat__card">
                <div className="chat__card-title">Start the conversation</div>
                <div className="chat__card-body">Say hello or ask a question to begin.</div>
              </div>
            </>
          )}
          {thread.map((m, idx) => (
            <div key={idx} className={`chat__bubble ${m.from === 'me' ? 'chat__bubble--out' : 'chat__bubble--in'} chat__bubble--card`}>
              {m.from === 'them' && (
                <div className="chat__header-info">
                  <div className="chat__avatar chat__avatar--na">{active === 'magiq' ? 'MQ' : active === 'dietitian' ? '🥗' : '💪'}</div>
                  <div className="chat__sender-name">{active === 'magiq' ? 'MagiQ' : active === 'dietitian' ? 'Dietitian' : 'Fitness'}</div>
                </div>
              )}
              <div className="chat__bubble-body">
                <div className="chat__content">
                  <div className="chat__text">{m.text}</div>
                  <div className="chat__time">{m.ts}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="chat__composer">
          <input
            placeholder="Write your message..."
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{ if (e.key === 'Enter') send(); }}
          />
          <button onClick={send}>Send</button>
        </footer>
      </section>

      <aside className="chat__sidebar">
        <div className="chat__conversations">
          <button className={`chat__conversation ${active==='magiq'?'chat__conversation--active':''}`} onClick={()=>setActive('magiq')}>
            <div className="chat__avatar chat__avatar--na">MQ</div>
            <div className="chat__conversation-body">
              <div className="chat__role">Assistant</div>
              <div className="chat__name">MagiQ</div>
              <div className="chat__preview">{lastOf('magiq')?.text || ''}</div>
            </div>
            <div className="chat__conversation-time">{lastOf('magiq')?.ts || ''}</div>
          </button>
          <button className={`chat__conversation ${active==='dietitian'?'chat__conversation--active':''}`} onClick={()=>setActive('dietitian')}>
            <div className="chat__avatar">🥗</div>
            <div className="chat__conversation-body">
              <div className="chat__role">Coach</div>
              <div className="chat__name">Dietitian</div>
              <div className="chat__preview">{lastOf('dietitian')?.text || ''}</div>
            </div>
            <div className="chat__conversation-time">{lastOf('dietitian')?.ts || ''}</div>
          </button>
          <button className={`chat__conversation ${active==='fitness'?'chat__conversation--active':''}`} onClick={()=>setActive('fitness')}>
            <div className="chat__avatar">💪</div>
            <div className="chat__conversation-body">
              <div className="chat__role">Coach</div>
              <div className="chat__name">Fitness</div>
              <div className="chat__preview">{lastOf('fitness')?.text || ''}</div>
            </div>
            <div className="chat__conversation-time">{lastOf('fitness')?.ts || ''}</div>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ChatPage;


