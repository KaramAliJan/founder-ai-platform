import { useState } from "react";
function TaskCreated({ Task }) {
    if (Task) {
        return (
            <div className="Task-list-card"
                style={{
                    marginTop: "14px", borderColor: "#92400E", borderStyle: "solid", borderWidth: "1px", borderRadius: "15px", backgroundColor: "#1C1812"
                }}>
                <p style={{ color: "#6EE7B7", fontWeight: "bold", padding: "0px 10px", marginTop: "15px" }}>8 tasks created — added to your task board</p>
                {Task.map((t) => (
                    <div className="card-content" style={{ padding: "7px 10px" }}>
                        <p>{t.title}({t.priority}-{t.estimated_hours})</p>
                    </div>
                ))}
            </div>
        );
    }
    else {
        return null;
    }
}
export default TaskCreated;