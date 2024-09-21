import React from "react";

function Dashboard() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="https://ethglobal-singapore-portfolio.vercel.app/"
        title="Embedded Page"
        style={{ height: "100%", width: "100%", border: "none" }}
      />
    </div>
  );
}

export default Dashboard;
