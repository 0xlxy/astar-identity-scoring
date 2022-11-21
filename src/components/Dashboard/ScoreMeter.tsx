import { useEffect } from "react";

export default function ScoreMeter() {
  useEffect(() => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
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

    // drawArc   x    y   rad sAng eAng clockwise  line    fill
    drawArc(180, 200, 80, 0, 180, true, "#c1634a", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 262, true, "#dfe7f0", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 264, true, "#e59636", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 287, true, "#dfe7f0", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 289, true, "#e8d932", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 301, true, "#dfe7f0", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 303, true, "#aecd9c", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 314, true, "#dfe7f0", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 316, true, "#8db872", "rgba(255, 255, 255, 0)");
    drawArc(180, 200, 80, 0, 320, true, "#dfe7f0", "rgba(255, 255, 255, 0)");

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
  }, []);

  return (
    <div style={{ backgroundColor: "transparent", height: 135, width: 180 }}>
      <canvas
        id="myCanvas"
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
        658
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
        14 Nov 2022
      </p>
    </div>
  );
}
