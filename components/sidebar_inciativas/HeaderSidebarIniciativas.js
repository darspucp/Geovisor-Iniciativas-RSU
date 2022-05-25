import React from "react";

import cn from "classnames";

import styles from "./HeaderSidebarIniciativas.module.scss";

class HeaderSidebarIniciativas extends React.Component {
  render() {
    return (
      <div
        className={cn(
          styles.contenedor_header,
          this.props.children && this.props.children.length > 1
            ? "flex-between-center"
            : "flex-end-center"
        )}
      >
        {this.props.children}
      </div>
    );
  }
}

export default HeaderSidebarIniciativas;
