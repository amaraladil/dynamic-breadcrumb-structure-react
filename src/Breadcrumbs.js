import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props;
  const pathnames = pathname.split("/").filter(x => x);
  pathnames.shift();
  return (
    <MUIBreadcrumbs separator="›" aria-label="breadcrumb">
      {pathnames.length > 0 ? ( 
        //Root becomes LINK element, the path is farther than the root folder
        <Link onClick={() => history.push("/path")}>Root</Link>
      ) : ( 
        // Else Root stays as non-link
        <Typography> Root </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/path/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          //Last element becomes as a non-link
          <Typography key={name}>{name}</Typography>
        ) : (
          //Other elements become a link for going to past section of the folder
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);