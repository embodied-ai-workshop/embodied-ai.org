// import React, { useState, useEffect } from "react";
import * as React from "react";

import { navigate } from "gatsby";

const IndexPage = () => {
  const currentYear = new Date().getFullYear();
  const redirectYear = process.env.GATSBY_REDIRECT_YEAR || currentYear;  // default to the current year

  React.useEffect(() => {
    navigate(`/cvpr${redirectYear}/`);
  }, [redirectYear]);
  
  return <p>Redirecting to CVPR {redirectYear} ...</p>
};

export default IndexPage;
