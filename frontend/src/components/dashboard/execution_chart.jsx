import LinearProgress from "@mui/material/LinearProgress";
import { color, flex, typography } from "@mui/system";
import { useRef, useEffect } from "react";

const metrics = [{ value: "72", week: "21", color: "#4B5563" }, { value: "88", week: "22", color: "#6B7280" }, { value: "32", week: "23", color: "#9CA3AF" }, { value: "67", week: "24", color: "#D1D5DB" }, { value: "90", week: "25", color: "#7C6EFF" }];

function Execution_Metric_Card() {
    useEffect(() => {
        const Bar = document.getElementById("lastBar");
        if (Bar) {
            Bar.style.color = "#7C6EFF"
        }
    }, [])
    return (
        <div
            style={{
                width: "67vw",
                minHeight: "270px",
                backgroundColor: "#161B27",
                marginTop: "20px",
                borderRadius: "15px",
                borderColor: "#1F2537",
                borderWidth: "1px",
                borderStyle: "solid",
                marginRight: "16px",




            }}
        >
            <p style={{ color: "#E5E7EB", marginLeft: "20px", marginTop: "20px", fontSize: "14px", fontWeight: "bold", marginBottom: "10px" }}>Weekly Execution Trend</p>
            {metrics.map((metric, index) => (
                <div style={{}}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ color: "#6B7280", marginLeft: "20px", fontSize: "12px", marginBottom: "2px" }}>Week {metric.week}</p>
                        <p id={index === 4 ? "lastBar" : undefined} style={{ color: "#6B7280", fontSize: "14px", marginBottom: "0px", marginRight: "25px", padding: "0" }}>{metric.value}</p>
                    </div>

                    <LinearProgress
                        key={index}
                        variant="determinate"
                        value={metric.value}
                        sx={{ maxWidth: "57vw", height: "5px", marginBottom: "10px", marginLeft: "20px", borderRadius: "3px", backgroundColor: "#1F2537", "& .MuiLinearProgress-bar": { backgroundColor: metric.color } }}
                    />
                </div>
            ))}
            <hr style={{ backgroundColor: "#1F2537", height: "3px", border: "none", width: "58vw", marginTop: "19px" }} />
            <p style={{ color: "#6B7280", marginLeft: "20px", fontSize: "12px", marginBottom: "0px", marginTop: "10px" }}>Behavioral Pattern</p>
            <p style={{ color: "#D1D5DB", marginLeft: "20px", fontSize: "14px", marginTop: "2px", marginBottom: "20px" }}>Over-planner — you created 18 tasks but only completed 13. Consider creating fewer, higher-priority tasks next week.</p>

        </div>

    );
}

export default Execution_Metric_Card;