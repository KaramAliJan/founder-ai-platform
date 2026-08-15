import { useState } from "react";
function ContradictionAlert({ contradiction }) {
    if (contradiction) {
        return (
            <div className="contradiction-list-card"
                style={{
                    marginTop: "14px", borderColor: "#92400E", borderStyle: "solid", borderWidth: "1px", borderRadius: "15px", backgroundColor: "#1C1812"
                }}>
                <div className="card-content" style={{ padding: "15px 10px" }}>
                    <p style={{ color: "#FCD34D", marginBottom: "5px", fontWeight: "bold" }}>Potential conflict detected</p>
                    <p style={{ color: "#F3B875" }}>
                        On {contradiction.date}, you said that "
                        {contradiction.past_decision}".
                        {contradiction.question}
                    </p>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}
export default ContradictionAlert;