import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10
  },
  backgroundImage: {
    width: '100%',
    height: width * 0.9,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 10
  },
  boxBottom: {
    // backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    opacity: 0.9
  }
})

export default styles
