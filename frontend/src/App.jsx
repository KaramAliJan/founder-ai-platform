import { useState } from 'react'
import Top_bar from './components/layout/top_bar';
//import './index.css'
import Preview_card from './components/dashboard/metric_card';
//import Metric_card from './components/dashboard/metric_card';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Execution_Metric_Card from './components/dashboard/execution_chart';
import Recent_decisions from './components/dashboard/recent_decisions';
import Chat from './pages/ Chat';
import Message_bubble from './components/chat/message_bubble';

const messages = [
    {
        content: "hi how are",
        role: "user"
    },
    {
        content: "I am fine",
        role: "assistant"
    }
];

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>

        <Top_bar />

        {/*     <div style={{ flex: 1 }}>
 //        <Preview_card />
  //      <div style={{ display: "flex" }}>
   //      <Execution_Metric_Card />
     // <Recent_decisions />
       // </div>
     // </div>*/}
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>

  );

}

export default App
