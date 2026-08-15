import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
const metrics = [
    { label: "Execution Score", value: "72", sub: "↑ +8 from last week", subColor: "#10B981" },
    { label: "Task Completed", value: "10/13", sub: "5 overdue", subColor: "#F59E0B" },
    { label: "Decision logged", value: "7", sub: "this week", subColor: "#10B981" },
    { label: "Contradictions", value: "2", sub: "needs review", subColor: "#F87171" },
]

function Metric_card({ label, value, sub, subcolor }) {
    return (
        <div style={{ display: "flex", gap: "15px", maxHeight: "100px", marginLeft: "0px", }}>

            <Card sx={{ minWidth: "21vw", maxHeight: "12vh", backgroundColor: "#161B27", borderRadius: "12px", borderColor: "#1F2537", borderWidth: "1px", borderStyle: "solid" }}>
                <CardContent sx={{ padding: 0 }}>
                    <Typography variant="body2" paragraph={false} sx={{ color: "#D1D5DB", mt: "10px", ml: "15px" }} >{label}</Typography>
                    <Typography variant="h5" sx={{ ml: "15px", color: "#E5E7EB" }}>{value}</Typography>
                    <Typography sx={{ color: subcolor, ml: "15px" }}>{sub}</Typography>

                </CardContent>
            </Card>
        </div>
    )
}
function Preview_card() {
    return (
        <div style={{ display: "flex", gap: "15px", maxHeight: "100px" }}>
            {metrics.map((metrics, index) => (
                <Metric_card
                    key={index}
                    value={metrics.value}
                    label={metrics.label}
                    sub={metrics.sub}
                    subcolor={metrics.subColor}
                />

            ))}
        </div>
    );


}
//export default Metric_card;
export default Preview_card;