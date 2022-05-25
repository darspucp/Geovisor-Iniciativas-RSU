import React from "react";
import cn from "classnames";

import styles from "./BaseMapSidebar.module.scss";

class BaseMapSidebar extends React.Component {
  render() {
    return (
      <div
        className={cn(
          styles.container_base_map,
          styles.container_base_map_margin
        )}
      >
        <h2 className={styles.title_base_map}>BASE MAP</h2>
      </div>
    );
  }
}

export default BaseMapSidebar;
