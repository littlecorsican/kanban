import { useRef, useEffect, useState } from "react";

export default function NoPage() {

  return (
    <div className="text-center">
        <h2>404</h2>
        <img src="/images/crying.jpg" />
        <h4>The page you are looking for does not exists</h4>
    </div>
  );
};
