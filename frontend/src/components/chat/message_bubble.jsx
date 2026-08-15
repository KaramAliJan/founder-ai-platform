import { FaCircle } from "react-icons/fa6";
import "./message.css";
import ContradictionAlert from "./contradiction_alert";
import { useEffect } from "react";
import TaskCreated from "./TasksCreatedCard";
const contradiction = {
    date: "August 14",
    past_decision: "We won't raise funding until we reach product-market fit.",
    question: "This new decision may conflict with that position. Has your thinking on PMF changed, or is this a different kind of raise?"
};
const Task = [{ title: "Update pitch deck — investor narrative", priority: "P1", estimated_hours: "4 hrs" }, { title: "Build investor target list — 50 names ", priority: "P2", estimated_hours: "1.5hrs" }, { title: "Set up data room on Notion ", priority: "P3", estimated_hours: "2 hrs" }, { title: "Build investor target list — 50 names ", priority: "P2", estimated_hours: "10 hrs" }, { title: "Update pitch deck — investor narrative", priority: "P1", estimated_hours: "5 hrs" }];

function Message_bubble({ messages }) {

    return (
        <div className="chat-window">

            {messages.map((message, index) => {

                const isUser = message.role === "user";

                return (
                    <div
                        key={index}
                        className={isUser ? "message user" : "message assistant"}
                    >
                        <div
                            className={
                                isUser
                                    ? "bubble user"
                                    : "bubble assistant"
                            }
                            style={{ maxWidth: "70%" }}
                        >

                            <FaCircle size="30px" />

                            <div style={{
                                backgroundColor: "#1F2537",
                                padding: "20px 20px",
                                borderRadius: "12px",
                                width: "fit-content",
                            }}
                            >
                                <div style={{ marginLeft: "10px" }} >
                                    {message.content}
                                </div>
                                <div>{
                                    !isUser &&
                                    <ContradictionAlert contradiction={contradiction} />
                                }
                                </div>
                                <div>{
                                    !isUser &&
                                    <TaskCreated Task={Task} />
                                }
                                </div>
                                <div>

                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}

        </div>
    );
}


export default Message_bubble;