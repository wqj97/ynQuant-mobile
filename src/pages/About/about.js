import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-navigation'

const mapStateToProps = state => {
  return {
    user: state.Login.user
  }
}

class AboutScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        source={
          focused ? require('../../images/about-active2.png') : require('../../images/about.png')
        }
        style={{ width: 23, height: 25 }}
      />
    ),
    activeTintColor: 'rgba(137, 172, 249, 1.000)',
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomColor: '#fff'
    },
    title: '我的',
    headerBackTitle: '返回',
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20, width: 20, height: 20 }}
        onPress={navigation.state.params ? navigation.state.params.goToSetting : null}
      >
        <Image source={require('../../images/about/setting.png')} />
      </TouchableOpacity>
    )
  })

  componentDidMount () {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff')
    })
    this.props.navigation.setParams({
      goToSetting: this.goToSetting
    })
  }

  componentWillUnmount () {
    this._navListener.remove()
  }

  goToSetting = () => {
    this.props.navigation.navigate('Setting')
  }

  render () {
    let user = this.props.user
    let { navigate } = this.props.navigation
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.authorWrap}>
          <View style={styles.authorImgShadow}>
            <Image source={user ? require('../../images/about/author.png') : require('../../images/about/un-login.png')}
              style={styles.authorImg}
            />
          </View>
          {user ? (
            <Text style={styles.authorName}>{user.name}</Text>
          ) : (
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={styles.authorName}>登录</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.operate}>
          <TouchableOpacity>
            <Image source={require('../../images/about/note.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../images/about/subscribe.png')} style={styles.operateImg} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../images/about/wallet.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.utilWrap}>
          <TouchableOpacity style={styles.util}>
            <View style={styles.toolWrap}>
              <Image
                source={require('../../images/about/tool.png')}
                style={[
                  styles.commonImg,
                  {
                    marginLeft: 20
                  }
                ]}
              />
              <Text style={styles.utilText}>工具</Text>
            </View>

            <View style={styles.infoAndArrow}>
              <Image
                source={require('../../images/about/rightArrow.png')}
                style={[
                  styles.commonImg,
                  {
                    marginRight: 20
                  }
                ]}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.util}>
            <View style={styles.toolWrap}>
              <Image
                source={require('../../images/about/message.png')}
                style={[
                  styles.commonImg,
                  {
                    marginLeft: 20
                  }
                ]}
              />
              <Text style={styles.utilText}>消息</Text>
            </View>
            <View style={styles.infoAndArrow}>
              {user ? (<View style={styles.info}>
                <Text style={styles.infoText}>1</Text>
              </View>) : ''}
              <Image
                source={require('../../images/about/rightArrow.png')}
                style={[
                  styles.commonImg,
                  {
                    marginRight: 20
                  }
                ]}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.util}>
            <View style={styles.toolWrap}>
              <Image
                source={require('../../images/about/collect.png')}
                style={[
                  styles.commonImg,
                  {
                    marginLeft: 20
                  }
                ]}
              />
              <Text style={styles.utilText}>收藏</Text>
            </View>
            <Image
              source={require('../../images/about/rightArrow.png')}
              style={[
                styles.commonImg,
                {
                  marginRight: 20
                }
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.util}>
            <View style={styles.toolWrap}>
              <Image
                source={require('../../images/about/about.png')}
                style={[
                  styles.commonImg,
                  {
                    marginLeft: 20
                  }
                ]}
              />
              <Text style={styles.utilText}>关于我们</Text>
            </View>
            <Image
              source={require('../../images/about/rightArrow.png')}
              style={[
                styles.commonImg,
                {
                  marginRight: 20
                }
              ]}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f8f8f8',
    position: 'relative'
  },
  authorWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  authorImgShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowRadius: 10,
    shadowOpacity: 0.2,
    elevation: 1
  },
  authorImg: {
    // width: 100,
    // height: 100,
    borderRadius: 50,
    justifyContent: 'center'
  },
  authorName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  operate: {
    flexDirection: 'row',
    position: 'relative',
    height: 67,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 17,
    marginTop: 10
  },
  operateImg: {
    marginLeft: 14
  },
  utilWrap: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 8,
    width: '100%'
  },
  util: {
    height: 68,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3'
  },
  toolWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  // commonImg: {
  //   width: 32,
  //   height: 32
  // },
  utilText: {
    marginLeft: 15,
    fontSize: 15,
    color: '#a5a8a9'
  },
  infoAndArrow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    borderRadius: 12,
    marginRight: 20
  },
  infoText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    marginTop: 5
  }
})
export default connect(mapStateToProps)(AboutScreen)
