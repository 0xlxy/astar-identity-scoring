import { useEffect } from "react";

export default function ScoreMeter({
  id,
  score,
}: {
  id: string;
  score: number;
}) {
  useEffect(() => {
    var canvas = document.getElementById(id) as HTMLCanvasElement;
    var context = canvas.getContext("2d");

    // drawArcShadow   x    y   rad sAng eAng clockwise  line    fill
    drawArcShadow(180, 200, 60, 0, 180, true, "#f3f4f7", "white");

    function drawArcShadow(
      xPos: number,
      yPos: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      clockwise: boolean,
      lineColor: string,
      fillColor: string
    ) {
      var startAngle = startAngle * (Math.PI / 180);
      var endAngle = endAngle * (Math.PI / 180);

      var radius = radius;

      if (context) {
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = 12;
        context.beginPath();
        context.arc(xPos, yPos, radius, startAngle, endAngle, clockwise);
        context.fill();
        context.stroke();
      }
    }

    var angle = score * 0.179 + 180;

    // drawArc   x    y   rad sAng eAng clockwise  line    fill
    drawArc(180, 200, 80, 0, 180, true, "#c1634a", "rgba(255, 255, 255, 0)"); //red

    if (angle > 242) {
      drawArc(180, 200, 80, 0, 242, true, "#dfe7f0", "rgba(255, 255, 255, 0)"); // gray
      drawArc(180, 200, 80, 0, 244, true, "#e59636", "rgba(255, 255, 255, 0)"); // orange
    }
    if (angle > 270) {
      drawArc(180, 200, 80, 0, 270, true, "#dfe7f0", "rgba(255, 255, 255, 0)"); // gray
      drawArc(180, 200, 80, 0, 272, true, "#e8d932", "rgba(255, 255, 255, 0)"); // yellow
    }
    if (angle > 285) {
      drawArc(180, 200, 80, 0, 285, true, "#dfe7f0", "rgba(255, 255, 255, 0)"); // gray
      drawArc(180, 200, 80, 0, 287, true, "#aecd9c", "rgba(255, 255, 255, 0)"); // gray green
    }
    if (angle > 305) {
      drawArc(180, 200, 80, 0, 305, true, "#dfe7f0", "rgba(255, 255, 255, 0)"); // gray
      drawArc(180, 200, 80, 0, 307, true, "#8db872", "rgba(255, 255, 255, 0)"); // green
    }
    drawArc(180, 200, 80, 0, angle, true, "#dfe7f0", "rgba(255, 255, 255, 0)"); // gray

    function drawArc(
      xPos: number,
      yPos: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      clockwise: boolean,
      lineColor: string,
      fillColor: string
    ) {
      var startAngle = startAngle * (Math.PI / 180);
      var endAngle = endAngle * (Math.PI / 180);

      var radius = radius;

      if (context) {
        context.strokeStyle = lineColor;
        context.fillStyle = fillColor;
        context.lineWidth = 12;
        context.beginPath();
        context.arc(xPos, yPos, radius, startAngle, endAngle, clockwise);
        context.fill();
        context.stroke();
      }
    }
  }, [score]);

  const formatScore = (score: number) => {
    if (score < 10) return `00${score}`;
    else if (score < 100) return `0${score}`;
    else return Number(score).toString();
  };

  const getDate = () => {
    const date = new Date();
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, " ");
    return formattedDate;
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        height: 135,
        width: 180,
        overflow: "hidden",
      }}
    >
      <canvas
        id={id}
        style={{ position: "relative", top: -85, left: -93 }}
        height="350"
        width="400"
      ></canvas>
      <p
        style={{
          fontWeight: 600,
          fontSize: 24,
          position: "relative",
          top: -280,
          left: 65,
        }}
      >
        {formatScore(score)}
      </p>
      <p
        style={{
          fontSize: 8,
          position: "relative",
          top: -280,
          left: 59,
          borderRadius: "6px 6px 0 0",
          backgroundColor: "#647699",
          color: "#F9F9FF",
          width: "min-content",
          whiteSpace: "nowrap",
          padding: "2px 5px",
        }}
      >
        {getDate()}
      </p>
    </div>
  );
}
