import React from "react";

function Buttons() {
  return (
    <div style={{ height: "100vh", width: "100%", margin: 0, padding: 0 }}>
      <iframe
        src="http://localhost:3000/"
        title="Embedded Page"
        style={{ height: "100%", width: "100%", border: "none" }}
      />
    </div>
  );
}

export default Buttons;
