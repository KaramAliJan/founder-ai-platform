import Message_bubble from "./message_bubble";
import ContradictionAlert from "./contradiction_alert";
const contradiction = {
    date: "August 14",
    past_decision: "We won't raise funding until we reach product-market fit.",
    question: "This new decision may conflict with that position. Has your thinking on PMF changed, or is this a different kind of raise?"
};
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

function Message_list() {
    return (
        <div className="scrollable" style={{ overflowY: "scroll", width: "85vw", height: "76vh", backgroundColor: "#0F1117", flex: "1", position: "relative", top: "90px", marginLeft: "10px" }}>
            <Message_bubble messages={messages} />
        </div>
    );
}
export default Message_list;