import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core"
import Breadcrumbs from "./Breadcrumbs";

// The root folder structure
const root = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        myname: {
          type: "dir",
          children: {
            "filea.txt": {
              type: "file",
            },
            "fileb.txt": {
              type: "file",
            },
            "projects": {
              type: "dir",
              children: {
                mysupersecretproject: {
                  type: "dir",
                  children: {
                    mysupersecretfile: {
                      type: "file",
                    },
                    extraSecretFolder: {
                      type: "dir",
                      children: {

                      }
                    }
                  },
                }
              }//End Projects children
            }
          }
        },//End myname
        "randomFileA.txt": {
          type: "file",
        },
      }//End Home Children
    },//End Home
    network: {
      type: "dir",
      children: {
        wireless: {
          type: "dir",
          children: {
            "Config": {
              type: "file"
            }
          }
        },
        Ethernet: {
          type: "dir",
          children: {
            "Config": {
              type: "file"
            }
          }
        }
      }
    }
  }
};

const Navigation = props => {
  const {
    history,
    location: { pathname }
  } = props
  const pathnames = pathname.split("/").filter(x => x);
  //removes first element "path"
  pathnames.shift();

  let currentRoot = root["children"];
  let currentType = "dir"

  try {
    //Navigate through the folder structure
    pathnames.map(currentNav => {
      currentType = currentRoot[currentNav]['type']
      currentRoot = currentRoot[currentNav]["children"]
      return null;
    });
  } catch (error) {
    //Any bad navigation would redirect back to root
    return( <Redirect to={{ pathname: "/path"}} />)
  }
 

  return (
    <>
      <Breadcrumbs />
      {/* Folder Display */}
      {currentType === "dir" && (
        <>
          {/* Folder name is either the last path name or root */}
          <h1>Folder: {(pathnames.length === 0 ) ? "Root" : pathnames[pathnames.length - 1] }</h1>
          {/* Buttons for all child content */}
          {Object.entries(currentRoot).map(([key,value],i) =>
            <div>
              <Button onClick={() => history.push(`${pathname}/${key}`)}>
                {key}
                {" | "}
                {value["type"]}
              </Button>
            </div>
          )}
        </>
      )}
      {/* Files Display */}
      {currentType === "file" && (
        <>
          <h1>THIS IS A FILE: {pathnames[pathnames.length - 1]}</h1>
        </>
      )}
    </>
  );
};

export const RoutingSection = () => {
  return (
    <Switch>
      <Route path={`/path`} render={props => <Navigation {...props} />} />
    </Switch>
  );
};
