import React from 'react'
import { View, Text, StyleSheet, Linking, StatusBar } from 'react-native'
import ProgressBar from '../../../components/ProgressBar'
import Echarts from 'native-echarts'
import { getLineBreak } from '../../../config/utils'

class DayAnalysisScreen extends React.Component {
  render () {
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
            { name: '利空', value: 0.4 },
            { name: '利好', value: 0.6 }
          ]
        }
      ]
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#000' />
        {/* <Text style={styles.content}> */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp; 据天空新闻：<Text */}
        {/* onPress={() => Linking.openURL('https://www.baidu.com')} */}
        {/* style={styles.keyword} */}
        {/* > */}
        {/* 英国首相 */}
        {/* </Text>特雷莎·梅将在格林威治时间16:30（北京时间13日00:30）在：<Text */}
        {/* onPress={() => Linking.openURL('https://www.baidu.com')} */}
        {/* style={styles.keyword} */}
        {/* > */}
        {/* 英国首相 */}
        {/* </Text>发表声明 */}
        {/* </Text> */}
        <Text style={styles.content}>
          市场情绪平稳，周二A股市场大体上涨。上证指数收于2363.87点，涨0.26%；深圳成指收8080.35点，跌0.03%。两市A股1438股票上涨，808只股票下跌。成交金额小幅下降，上海市场从上一交易日的1711亿元下降至1669亿元；深圳市场从上一交易日的2033亿元下降至1835亿元。据今日投资“在线分析师”数据显示，当前A股市场中期趋势（看涨），安全持仓线上升100%，市场天气为晴天。
        </Text>
        <View style={{padding: 16}}>
          <Echarts option={option} height={300} />
        </View>
        {/* <View style={styles.wordWightWarp}> */}
        {/* <Text style={styles.title}>词权重</Text> */}
        {/* <View style={styles.chartWrap}> */}
        {/* <View style={styles.row}> */}
        {/* <Text style={styles.keywordFont}>dssdf222</Text> */}
        {/* <ProgressBar color='green' num={1} total={4} /> */}
        {/* </View> */}
        {/* <View style={styles.row}> */}
        {/* <Text style={styles.keywordFont}>dssdf</Text> */}
        {/* <ProgressBar color='green' num={1} total={4} /> */}
        {/* </View> */}
        {/* <View style={styles.row}> */}
        {/* <Text style={styles.keywordFont}>dssdf</Text> */}
        {/* <ProgressBar color='green' num={1} total={4} /> */}
        {/* </View> */}
        {/* <View style={styles.row}> */}
        {/* <Text style={styles.keywordFont}>dssdf</Text> */}
        {/* <ProgressBar color='green' num={1} total={4} /> */}
        {/* </View> */}
        {/* </View> */}
        {/* </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    fontSize: 24,
    margin: 16
  },
  keyword: {
    textDecorationLine: 'underline',
    color: '#5497e4'
  },
  wordWightWarp: {
    flex: 1,
    marginLeft: 25,
    marginRight: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 26,
    marginBottom: 30
  },
  chartWrap: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20
  },
  keywordFont: {}
})
export default DayAnalysisScreen
