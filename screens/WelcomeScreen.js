import React from 'react';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonOutline,
  ButtonSolid,
  ScreenContainer,
  Swiper,
  SwiperItem,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (Constants['AUTHORIZATION_HEADER'] === '-') {
        return;
      }
      if (Constants['USER_ID'] === '-') {
        return;
      }
      if (Constants['USER_ID'] === '') {
        return;
      }
      if (Constants['AUTHORIZATION_HEADER'] === '') {
        return;
      }
      navigation.navigate('BottomTabNavigator', { screen: 'ChathomeScreen' });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <ImageBackground
        style={styles.ImageBackgroundUg}
        source={{
          uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-background.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tYmFja2dyb3VuZC5wbmciLCJpYXQiOjE2NTg1MTYxNDYsImV4cCI6MTk3Mzg3NjE0Nn0.PXhT0tOZzXQywIj6t0vw4UIZDHbNZlGlSxDqcDclyMw&t=2022-07-22T18%3A55%3A46.008Z',
        }}
        resizeMode={'cover'}
      >
        <View style={styles.Viewbc}>
          <Text style={[styles.Text_68, { color: theme.colors.primary }]}>
            {'Welcome'}
          </Text>

          <Text
            style={[
              styles.TextLg,
              {
                color: theme.colors.primary,
                textDecorationColor: theme.colors.secondary,
              },
            ]}
          >
            {'Lets get started.'}
          </Text>
        </View>

        <Swiper
          style={styles.Swiper_7g}
          dotColor={theme.colors.light}
          dotActiveColor={theme.colors.secondary}
          dotsTouchable={true}
          loop={true}
        >
          <SwiperItem>
            <ImageBackground
              style={styles.ImageBackgroundLn}
              resizeMode={'cover'}
              source={{
                uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tMS5wbmciLCJpYXQiOjE2NTg1MTcxMDgsImV4cCI6MTk3Mzg3NzEwOH0.iuGNB6hUlH8aGUwJ4LnIbF59Ke71YI0IgUfKRoDt0eA&t=2022-07-22T19%3A11%3A47.772Z',
              }}
            />
          </SwiperItem>

          <SwiperItem>
            <ImageBackground
              style={styles.ImageBackground_5b}
              resizeMode={'cover'}
              source={{
                uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tMi5wbmciLCJpYXQiOjE2NTg1MTcyMDksImV4cCI6MTk3Mzg3NzIwOX0.Q4_BidMoAiCDDXSSjMc716cU0XKi5SQgl227T6lWcs4&t=2022-07-22T19%3A13%3A28.574Z',
              }}
            />
          </SwiperItem>

          <SwiperItem>
            <ImageBackground
              style={styles.ImageBackgroundfk}
              resizeMode={'cover'}
              source={{
                uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tMy5wbmciLCJpYXQiOjE2NTg1MTcyNDAsImV4cCI6MTk3Mzg3NzI0MH0.Hs_Zhz_CHoHptv8Jen_1cWzEemaFh_vdFxKcgNC781w&t=2022-07-22T19%3A13%3A59.976Z',
              }}
            />
          </SwiperItem>

          <SwiperItem>
            <ImageBackground
              style={styles.ImageBackground_1a}
              resizeMode={'cover'}
              source={{
                uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tNC5wbmciLCJpYXQiOjE2NTg1MTcyNTYsImV4cCI6MTk3Mzg3NzI1Nn0.DX3MTn_X1pg62W3K39c1NHxVwG9gK2XOD9hwGwSYmAo&t=2022-07-22T19%3A14%3A15.208Z',
              }}
            />
          </SwiperItem>
        </Swiper>

        <View>
          <ButtonSolid
            onPress={() => {
              try {
                navigation.navigate('RegistrationScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonSoliddM,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              },
            ]}
            title={'Sign Up'}
          />
          <ButtonOutline
            onPress={() => {
              try {
                navigation.navigate('LoginScreen');
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.ButtonOutlinesz,
              {
                borderColor: theme.colors.lightInverse,
                color: theme.colors.primary,
                textDecorationColor: theme.colors.secondary,
              },
            ]}
            title={'Log In'}
          />
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text_68: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '700',
    marginBottom: 8,
  },
  TextLg: {
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  Viewbc: {
    paddingTop: 20,
  },
  ImageBackgroundLn: {
    height: '100%',
  },
  ImageBackground_5b: {
    height: '100%',
  },
  ImageBackgroundfk: {
    height: '100%',
  },
  ImageBackground_1a: {
    height: '100%',
  },
  Swiper_7g: {
    height: '60%',
  },
  ButtonSoliddM: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ButtonOutlinesz: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    borderWidth: 1,
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
  ImageBackgroundUg: {
    paddingLeft: 16,
    paddingRight: 16,
    height: '100%',
    justifyContent: 'space-evenly',
  },
});

export default withTheme(WelcomeScreen);
