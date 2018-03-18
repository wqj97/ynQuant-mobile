/**
 navigation 详细说明
 http://www.guiyongdong.com/2017/05/20/ReactNative%E5%AF%BC%E8%88%AA%E6%96%B0%E5%AE%A0%E5%84%BFreact-navigation/
 */
import { StackNavigator, TabNavigator } from 'react-navigation'
import React from 'react'
import Screen from './Screens'
import DayAnalysisScreen from '../Information/News/dayAnalysis'
import CustomerTabBar from '../Tabbar/CustomerTabBar'
import { connect } from 'react-redux'

let TabBar = TabNavigator(Screen, {
  // 定义全局 Tabbar 配置, 配置文档: https://reactnavigation.org/docs/tab-navigator.html
  initialRouteName: 'InformationScreen', // 首页名字
  tabBarComponent: CustomerTabBar,
  tabBarOptions: {
    style: {
      // backgroundColor: '#000' // 底部 tab 颜色
    },
    activeTintColor: '#fff', // 选中时文字颜色
    inactiveTintColor: '#9a9a9a', // 未选中时文字颜色
    showIcon: true,
    tabBarPosition: 'bottom', // tab bar的位置
    lazy: false, // 是否懒加载界面，默认一次加载所有的界面,true为懒加载
    labelStyle: {
      // tab 字样式
      fontWeight: 'bold',
      fontSize: 11
    }
  },
  animationEnabled: false // 开启动画
})

const Navigator = StackNavigator(
  {
    TabBar: {
      screen: TabBar
    },
    DayAnalysisScreen: {
      screen: DayAnalysisScreen,
      headerBackTitle: '返回'
    }
  },
  {
    cardStyle: {
      // 为各个页面设置统一的样式
      backgroundColor: '#fff'
    },
    navigationOptions: {
      headerTintColor: '#fff', // 设置导航栏颜色
      gesturesEnabled: true // 支持手滑返回
    }
  }
)

const changeTabBarColor = (backgroundColor) => ({
  type: 'CHANGE_TABBAR_BG_COLOR',
  payload: {
    backgroundColor: backgroundColor
  }
})

function getCurrentRouteName (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

function getCurrentRouteScreenColor (ScreenName) {
  console.log(ScreenName)
  switch (ScreenName) {
    case 'KnowledgeScreen':
      return '#4b525e'
    default:
      return '#000'
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onPageChange: (color) => dispatch(changeTabBarColor(color))
  }
}

class Tabs extends React.Component {
  render () {
    return <Navigator
      onNavigationStateChange={(prevState, currentState) => {
        // const currentScreen = getCurrentRouteName(currentState)
        // const prevScreen = getCurrentRouteName(prevState)

        this.props.onPageChange(getCurrentRouteScreenColor(getCurrentRouteName(currentState)))
      }}
    />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
