import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import PropTypes from 'prop-types'
import { getDay, getMonth, getTime } from '../config/utils'
import { newsList } from '../service/getData'

const propTypes = {
  navigation: PropTypes.object.isRequired
  // onHeaderRefresh: PropTypes.func.isRequired,
  // onFooterRefresh: PropTypes.func.isRequired,
  // data: PropTypes.array.isRequired
}

class TimeLine extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      refreshState: RefreshState.Idle,
      data: []
    }
    this.page = 1
  }
  _keyExtractor = (item, index) => item.id + ''
  componentDidMount () {
    newsList(this.page)
      .then(res => {
        let data = []
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            data.push({
              time: key,
              month: getMonth(key),
              day: getDay(key),
              content: res[key]
            })
          }
        }
        this.setState({ data: data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  _renderEmptyLayout () {
    return <Text style={{ alignSelf: 'center', marginTop: 20 }}>暂无数据，刷新试试？</Text>
  }

  onHeaderRefresh = () => {
    this.setState({ refreshState: RefreshState.HeaderRefreshing })
    this.page = 1
    newsList(this.page)
      .then(res => {
        let data = []
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            data.push({
              time: key,
              month: getMonth(key),
              day: getDay(key),
              content: res[key]
            })
          }
        }
        this.setState({
          data: data,
          refreshState: RefreshState.Idle
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onFooterRefresh = () => {
    this.setState({ refreshState: RefreshState.FooterRefreshing })
    this.page++
    newsList(this.page)
      .then(res => {
        let data = [...this.state.data]
        if (res.length !== 0) {
          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].time === key) {
                  data[i].content = data[i].content.concat(res[key])
                  this.setState({
                    data: data,
                    refreshState: RefreshState.Idle
                  })
                  break
                } else {
                  data.push({
                    time: key,
                    month: getMonth(key),
                    day: getDay(key),
                    content: res[key]
                  })
                  this.setState({
                    data: data,
                    refreshState: RefreshState.Idle
                  })
                  break
                }
              }
            }
          }
        } else {
          this.setState({ refreshState: RefreshState.NoMoreData })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderRow = (rowData, navigation) => {
    let { navigate } = navigation
    let array = [...rowData.content]
    let firstContent = array.splice(0, 1) // 获取第一个内容
    let content = array // 获取其余内容
    return (
      <View style={styles.row} key={firstContent[0].id}>
        <View style={styles.date}>
          <Text style={[styles.fontColor, styles.dayFont]}>{rowData.day}</Text>
          <Text style={[styles.fontColor, styles.monthFont]}>{rowData.month}月</Text>
        </View>
        <TouchableOpacity
          style={styles.contentWrap}
          onPress={() => {
            navigate('NewsDetail', {
              content: firstContent[0],
              id: firstContent[0].id
            })
          }}
        >
          <View style={styles.time}>
            <Text style={[styles.fontColor, styles.timeFont]}>
              {getTime(firstContent[0].news_time)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentFont}>{firstContent[0].title}</Text>
          </View>
        </TouchableOpacity>

        {content.map(data => {
          return (
            <View style={styles.commonWrap} key={data.id}>
              <TouchableOpacity
                style={styles.contentWrap}
                onPress={() => {
                  navigate('NewsDetail', {
                    content: data,
                    id: data.id
                  })
                }}
              >
                <View style={styles.time}>
                  <Text style={[styles.fontColor, styles.timeFont]}>{getTime(data.news_time)}</Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.contentFont}>{data.title}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.dotOutWard}>
                <View style={styles.dotInWard} />
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <RefreshListView
          data={this.state.data}
          renderItem={({ item }) => this.renderRow(item, this.props.navigation)}
          initialNumToRender={6}
          keyExtractor={this._keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          ListEmptyComponent={this._renderEmptyLayout}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'column',
    paddingBottom: 10,
    paddingLeft: 20,
    borderLeftWidth: 1.3,
    borderLeftColor: '#e0e0e0',
    marginLeft: 30,
    marginRight: 12,
    marginTop: 15,
    position: 'relative'
  },
  contentWrap: {
    flex: 1,
    marginBottom: 25,
    marginLeft: 13
  },
  commonWrap: {
    flex: 1,
    flexDirection: 'column'
  },
  content: {
    marginTop: 10
  },
  contentFont: {
    color: '#808080'
  },
  dayFont: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  monthFont: {
    fontSize: 11,
    textAlign: 'center'
  },
  date: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#7ddaff',
    backgroundColor: '#fff',
    position: 'absolute',
    left: -18.5
  },
  time: {
    position: 'relative',
    top: -1
  },
  timeFont: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  fontColor: {
    color: '#31c4ff'
  },
  dotOutWard: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#7ddaff',
    position: 'absolute',
    left: -27.9,
    top: -1
  },
  dotInWard: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#31c4ff',
    position: 'absolute',
    left: 3.5,
    top: 3.5
  }
})

TimeLine.propTypes = propTypes

export default TimeLine
