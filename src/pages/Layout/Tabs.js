/**
  navigation 详细说明
  http://www.guiyongdong.com/2017/05/20/ReactNative%E5%AF%BC%E8%88%AA%E6%96%B0%E5%AE%A0%E5%84%BFreact-navigation/
*/
import { TabNavigator, StackNavigator } from 'react-navigation'
import React from 'react'
import Screen from './Screens'

const TabBar = TabNavigator(Screen, {
  // 定义全局 Tabbar 配置, 配置文档: https://reactnavigation.org/docs/tab-navigator.html
  initialRouteName: 'InformationScreen', // 首页名字
  tabBarOptions: {
    style: {
      backgroundColor: '#000' // 底部 tab 颜色
    },
    activeTintColor: '#fff', // 选中时文字颜色
    inactiveTintColor: '#9a9a9a', // 未选中时文字颜色
    showIcon: true,
    lazy: true // 是否懒加载界面，默认一次加载所有的界面,true为懒加载
  },
  animationEnabled: false // 开启动画
})

const Navigator = StackNavigator(
  {
    TabBar: {
      screen: TabBar
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#000'
      },
      headerTintColor: '#fff'
    }
  }
)
export default class Tabs extends React.Component {
  render () {
    return <Navigator />
  }
}
