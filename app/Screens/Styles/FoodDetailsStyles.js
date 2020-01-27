import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 10
  },
  image: {
    width,
    height: height * 0.7
  },
  boxBottom: {
    minHeight: height * 0.4,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
})

export default styles
