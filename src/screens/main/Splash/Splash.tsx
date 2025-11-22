import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '@/navigation/types'
import { SCREEN } from '@/navigation/screenNames'
import { IMAGES } from '@/assets/images'
import { WrapperContainer } from '@/components'
import { styles } from './styles'

type SplashNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Splash'>

const Splash = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(SCREEN.TODO_LIST)
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <WrapperContainer style={styles.container}>

      <Image
        source={IMAGES.splashImage}
        style={styles.image}
        resizeMode="contain" />

    </WrapperContainer>
  )
}

export default Splash;
