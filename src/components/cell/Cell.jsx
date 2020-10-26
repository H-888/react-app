import { Flex,  WingBlank } from 'antd-mobile'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import "./cell.scss"
 class Cell extends Component {
    static defaultProps = {
        goods:[]
    }
    static propTypes = {
        goods:PropTypes.array
    }
    render() {
        return (
          <WingBlank>
          {/* WingBlank：左右留白 size表示留白的程度 */}
          {/* 采用flex布局 */}
          <Flex
              justify="between"
              wrap={"wrap"}
          >
              {
                  this.props.goods.length && this.props.goods.map(v => (
                    <div key={v.goods_id} className={"good"}>
                        <div className="good_content"
                        onClick = {()=>{
                            console.log(this.props);
                            this.props.history.push(`/goodsdetail/${v.goods_id}`)
                        }}
                        >
                            <img src={v.goods_small_logo} alt="" />
                            <div className="describe ellipsis-1">{v.goods_name}</div>
                            <div className="price">&yen;{v.goods_price}</div>
                        </div>
                        <button className={"search-similar"}
                        onClick={()=>this.props.history.push('/searchgoods/cid=' + v.cat_id)}
                        >
                            找相似
                        </button>
                    </div>
                ))
              }
          </Flex>
      </WingBlank>
        )
    }
}

export default withRouter(Cell)
