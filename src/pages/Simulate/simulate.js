import React from 'react'
import { StatusBar, Text, View, Platform, StyleSheet, Image, TouchableOpacity } from 'react-native'

/*
  状态栏配置
  https://reactnavigation.org/docs/status-bar.html
*/
class SimulateScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      randNum: 4
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        randNum: Math.floor(Math.random() * 10)
      })
    }, 300)
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content')
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#1f2c37')
    })
  }

  componentWillUnmount () {
    this._navListener.remove()
  }

  render () {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.center,
            {
              marginBottom: 30,
              marginTop: 30,
              alignItems: 'flex-end'
            }
          ]}
        >
          <View style={{
            height: 50,
            justifyContent: 'flex-end'
          }}>
            <Text style={{ fontFamily: 'PingFangSC-Semibold', color: '#FF4A4A', fontSize: 14 }}>$
              57.</Text>
          </View>
          <Text style={{ fontFamily: 'PingFangSC-Semibold', height: 44, color: '#FF4A4A', fontSize: 36 }}>5937{this.state.randNum}</Text>
        </View>
        <View style={{
          alignItems: 'center',
          marginBottom: 30,
          marginTop: -16
        }}>
          <Text style={{ fontFamily: 'PingFangSC-Semibold', color: '#41B69C', fontSize: 16 }}>-0.14 (1.40%)</Text>
        </View>
        <View
          style={[
            styles.center,
            {
              marginLeft: 16,
              marginRight: 16,
              marginBottom: 30
            }
          ]}
        >
          <Image
            source={require('../../images/simulate/showPrice.png')}
            style={{ width: '100%', height: 165 }}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              marginLeft: 38,
              marginRight: 38,
              marginBottom: 30
            }
          ]}
        >
          <Image
            source={require('../../images/simulate/Group.png')}
            style={{ width: 298, height: 45 }}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              marginTop: 50,
              marginBottom: 20
            }
          ]}
        >
          <TouchableOpacity style={[styles.button, {
            backgroundColor: '#00D7B8',
          }]}>
            <View
              style={[
                styles.center,
                {
                  alignItems: 'flex-end'
                }
              ]}
            >
              <View style={{
                justifyContent: 'flex-end'
              }}>
                <Text style={{ fontFamily: 'PingFangSC-Semibold', color: '#fff', fontSize: 14 }}>
                  <Text style={{ fontFamily: 'PingFangSC-Semibold', fontSize: 24 }}>买入 </Text>
                  $ 57.</Text>
              </View>
              <Text style={{ fontFamily: 'PingFangSC-Semibold', height: 34, color: '#fff', fontSize: 24 }}> 5937{this.state.randNum}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.center,
            {
              marginBottom: 20
            }
          ]}
        >
          <TouchableOpacity style={[styles.button, {
            borderColor: '#00D7B8',
            borderWidth: 2
          }]}>
            <View
              style={[
                styles.center,
                {
                  alignItems: 'flex-end'
                }
              ]}
            >
              <View style={{
                justifyContent: 'flex-end'
              }}>
                <Text style={{ fontFamily: 'PingFangSC-Semibold', color: '#fff', fontSize: 14 }}>
                  <Text style={{ fontFamily: 'PingFangSC-Semibold', fontSize: 24 }}>卖出 </Text>
                  $ 57.</Text>
              </View>
              <Text style={{ fontFamily: 'PingFangSC-Semibold', height: 34, color: '#fff', fontSize: 24 }}> 5937{this.state.randNum}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(31, 44, 55, 1.000)'
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 3
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
export default SimulateScreen
