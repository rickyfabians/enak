import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10
  },
  backgroundImage: {
    width: width * 0.4,
    height: width * 0.3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 10
  },
  backgroundImageGrid: {
    width: width * 0.45,
    height: width * 0.4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold'
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
