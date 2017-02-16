import React, { PropTypes } from 'react'

/**
 * list search
 */
export default class Search extends React.Component {
  static propTypes = {
  }

  render () {

    return (
      <div id="operations-search-container" className="ui action left icon mini input">
        <i className="search icon"></i>
        <input type="text" placeholder="搜索..." />

        <button className="ui mini basic icon button">
          更多搜索
        </button>
      </div>
    )
  }
}
