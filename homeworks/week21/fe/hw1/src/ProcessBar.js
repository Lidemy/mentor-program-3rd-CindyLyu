/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { PureComponent } from 'react';


class ProcessBar extends PureComponent {
  render() {
    const { data } = this.props;
    const percentage = data || 0; // 一載入頁面讀不到初始的值，先暫時用 OR 取代
    const style = { width: `${percentage}%` };
    return (
      <section className="todolist__process progress">
        <div className="progress-bar bg-info" role="progressbar" style={style}>
          {percentage}
          %
        </div>
      </section>
    );
  }
}


export default ProcessBar;
