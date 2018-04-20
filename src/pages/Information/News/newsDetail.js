import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { getLineBreak } from '../../../config/utils'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { newsDetail, newsComments } from '../../../service/getData'
import Comment from '../../../components/Comment/Comment'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Echarts from 'native-echarts'

const width = Dimensions.get('window').width

// TODO:返回页面刷新
class NewsDetail extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      refreshState: RefreshState.Idle,
      commentData: [],
      data: [],
      isStar: false,
      star: 0
    }
    const { params } = props.navigation.state
    this.params = params
    this.page = 1
  }

  _keyExtractor = (item, index) => item.id + ''
  _renderItem = data => {
    return <Comment data={data.item} />
  }
  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing })
    this.page++
    newsComments(this.page, this.params.id)
      .then(res => {
        console.log(res)
        if (res.data.length !== 0) {
          let data = [...this.state.commentData]
          data = data.concat(res.data)
          console.log(data)
          this.setState({ commentData: data, refreshState: RefreshState.Idle })
        } else {
          this.setState({ refreshState: RefreshState.NoMoreData })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  _star = () => {
    this.setState({ isStar: !this.state.isStar })
    if (!this.state.isStar) {
      this.setState({ star: this.state.star + 1 })
    } else {
      this.setState({ star: this.state.star - 1 })
    }
  }
  onHeaderRefresh = () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing })
    this.page = 1
    newsComments(this.page, this.params.id)
      .then(res => {
        this.setState({ commentData: res.data, refreshState: RefreshState.Idle })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount () {
    const { params } = this.props.navigation.state
    this.params = params
    newsDetail(params.id)
      .then(res => {
        this.setState({ commentData: res.comments, data: res })
      })
      .catch(err => console.log(err))
  }

  _renderEmptyLayout () {
    return <Text style={{ alignSelf: 'center', marginTop: 20 }}>暂无数据</Text>
  }

  _renderHeaderLayout () {
    const analysis = this.props.navigation.state.params.content.analysis
    let selected = parseInt(Math.floor(analysis.negative * 100)) >  parseInt(Math.floor(analysis.positive * 100))
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['利空', '利好']
      },
      series: [
        {
          name: '预测',
          type: 'pie',
          roseType: true,
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {name: '利空', value: parseInt(Math.floor(analysis.negative * 100))},
            {name: '利好', value: parseInt(Math.floor(analysis.positive * 100))}
          ]
        }
      ]
    }
    return (
      <View style={{ marginTop: 16 }}>
        <Echarts option={option} height={300} />
        <Text style={styles.textStyle}>
          {getLineBreak(this.params.content.content, /\n/g, '\n\n')}
        </Text>
        <Text style={styles.commentText}>评论</Text>
      </View>
    )
  }

  _renderFooterLayout () {
    return <View style={{ height: 60 }} />
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.textWrap}>
          <RefreshListView
            renderItem={this._renderItem}
            data={this.state.commentData}
            initialNumToRender={10}
            refreshState={this.state.refreshState}
            onFooterRefresh={this.onFooterRefresh}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this._renderEmptyLayout}
            onHeaderRefresh={this.onHeaderRefresh}
            keyExtractor={this._keyExtractor}
            ListHeaderComponent={() => this._renderHeaderLayout()}
            ListFooterComponent={() => this._renderFooterLayout()}
          />
        </View>
        <View style={styles.bottomBarWrap}>
          <View
            style={[
              styles.bottomBarIconWarp,
              {
                marginLeft: 37
              }
            ]}
          >
            <Image
              source={require('../../../images/Information/watch.png')}
              style={styles.watchIcon}
            />
            <Text style={styles.bottomBarText}>{this.state.data.views_count}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.bottomBarIconWarp,
              {
                position: 'absolute',
                left: width / 2 - 12
              }
            ]}
            onPress={() => {
              let { navigate } = this.props.navigation
              navigate('WriteComment', {
                type: 0,
                id: this.params.id
              })
            }}
          >
            <Image
              source={require('../../../images/Information/comment.png')}
              style={styles.commentIcon}
            />
            <Text style={styles.bottomBarText}>{this.state.data.comments_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.bottomBarIconWarp,
              {
                position: 'absolute',
                right: 53
              }
            ]}
            onPress={this._star}
          >
            <Image
              source={
                this.state.isStar
                  ? require('../../../images/Information/Star-active.png')
                  : require('../../../images/Information/Star.png')
              }
              style={styles.starIcon}
            />
            <Text style={[styles.bottomBarText, {
              position: 'absolute',
              left: 20
            }]}>{this.state.star}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrap: {
    marginRight: 16,
    marginLeft: 16,
    paddingBottom: 16
  },
  commentText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  textStyle: {
    fontSize: 20
  },
  bottomBarWrap: {
    width: '100%',
    ...ifIphoneX(
      {
        height: 59
      },
      {
        height: 49
      }
    ),
    backgroundColor: 'rgba(9, 76, 144, 1.000)',
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomBarIconWarp: {
    flexDirection: 'row',
    ...ifIphoneX({
      marginBottom: 10
    })
  },
  bottomBarText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 3
  },
  watchIcon: {
    width: 21.98,
    height: 16.9
  },
  commentIcon: {
    width: 22,
    height: 20
  },
  starIcon: {
    height: 20,
    width: 20
  }
})
export default NewsDetail
