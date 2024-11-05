import React, { useState } from "react";

export default function UserProfile(prop) {
  const { userData } = prop;
  console.log(userData, "userDate from profile");

  return (
    <div>
      <p>Profile Here</p>
    </div>
  );
}
