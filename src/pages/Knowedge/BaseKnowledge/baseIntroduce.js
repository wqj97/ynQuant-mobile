import React from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { NavigationActions, SafeAreaView } from 'react-navigation'

class BaseIntroduce extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  _replaceTo () {
    const replaceAction = NavigationActions.replace({
      key: this.props.navigation.state.key,
      routeName: 'BaseDetail',
      params: {
        id: this.props.navigation.state.params.id,
        title: this.props.navigation.state.params.title,
        currentPage: this.props.navigation.state.params.user_page_tag === 0 ? 0 : this.props.navigation.state.params.user_page_tag - 1
      },
      immediate: true
    })
    this.props.navigation.dispatch(replaceAction)
  }

  render () {
    const { goBack, state } = this.props.navigation
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentWrap}>
          <Image
            source={require('../../../images/knowledge/foreignExchange.png')}
            style={styles.img}
          />
          <Text style={styles.title}>{state.params.title}</Text>
          <Text style={styles.contentText}>{state.params.content}</Text>
          <Text onPress={() => goBack()} style={[styles.btnText, styles.backColor]}>
            返回
          </Text>
          <Text onPress={() => this._replaceTo()} style={[styles.btnText, styles.continueColor]}>
            开始
          </Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363c46',
    paddingTop: Platform.OS === 'ios' ? 25 : 0 // 处理iOS状态栏
  },
  contentWrap: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
    marginBottom: 20
  },
  img: {
    width: '100%',
    height: 284
  },
  content: {
    justifyContent: 'center'
  },
  title: {
    fontSize: 29,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  contentText: {
    marginRight: 35,
    marginLeft: 35,
    fontSize: 17,
    color: '#777777',
    lineHeight: 27,
    position: 'relative'
  },
  btnText: {
    fontSize: 17,
    position: 'absolute',
    bottom: 30
  },
  backColor: {
    color: '#777777',
    left: 68
  },
  continueColor: {
    color: '#000',
    right: 68
  }
})
export default BaseIntroduce
