import React from 'react';
import * as AuthApi from '../apis/AuthApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import {
  ButtonSolid,
  Link,
  ScreenContainer,
  Spacer,
  withTheme,
} from '@draftbit/ui';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={false} scrollable={false}>
      <ImageBackground
        style={styles.ImageBackground_3R}
        source={{
          uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-background.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tYmFja2dyb3VuZC5wbmciLCJpYXQiOjE2NTg1MTYxNDYsImV4cCI6MTk3Mzg3NjE0Nn0.PXhT0tOZzXQywIj6t0vw4UIZDHbNZlGlSxDqcDclyMw&t=2022-07-22T18%3A55%3A46.008Z',
        }}
        resizeMode={'cover'}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollViewlJContent}
        >
          <View style={styles.View_5E}>
            <Text style={[styles.TextwQ, { color: theme.colors.medium }]}>
              {'Welcome Back!'}
            </Text>

            <Text style={styles.TextBw}>
              {'Sign in to your account to continue'}
            </Text>
          </View>

          <View style={styles.ViewZq}>
            <Text style={[styles.Textow, { color: theme.colors.error }]}>
              {null}
            </Text>
            <TextInput
              onChangeText={newEmailInputValue => {
                try {
                  setEmailInputValue(newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInput_4Y,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={emailInputValue}
              placeholder={'Email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              autoCapitalize={'none'}
            />
            <Spacer top={12} right={8} bottom={12} left={8} />
            <TextInput
              onChangeText={newPasswordInputValue => {
                try {
                  setPasswordInputValue(newPasswordInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputV8,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={passwordInputValue}
              placeholder={'Password'}
              secureTextEntry={true}
            />
            <Spacer top={24} right={8} bottom={24} left={8} />
            <ButtonSolid
              onPress={async () => {
                try {
                  const loginResponseJson = await AuthApi.loginPOST(Constants, {
                    loginEmail: emailInputValue,
                    loginPassword: passwordInputValue,
                  });
                  const accessToken = loginResponseJson['access_token'];
                  const message = loginResponseJson['error_description'];
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  });
                  if (!accessToken) {
                    return;
                  }
                  setGlobalVariableValue({
                    key: 'AUTHORIZATION_HEADER',
                    value: 'Bearer ' + accessToken,
                  });
                  const user_id = loginResponseJson['user']['id'];
                  setGlobalVariableValue({
                    key: 'USER_ID',
                    value: user_id,
                  });
                  navigation.navigate('BottomTabNavigator', {
                    screen: 'MainNavigator',
                    params: { screen: 'MainhomeScreen' },
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonSolidRP,
                { backgroundColor: theme.colors.primary },
              ]}
              title={'Sign in'}
            />
            <Spacer top={16} right={8} bottom={16} left={8} />
            <View style={styles.Viewwm}>
              <Text>{'New User?'}</Text>
              <Spacer top={8} right={2} bottom={8} left={2} />
              <Link
                onPress={() => {
                  try {
                    navigation.navigate('RegistrationScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.Linkz1,
                  {
                    color: theme.colors.primary,
                    textDecorationColor: theme.colors.secondary,
                  },
                ]}
                title={'Sign up!'}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextwQ: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TextBw: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 4,
  },
  View_5E: {
    alignItems: 'center',
  },
  Textow: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInput_4Y: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '400',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  TextInputV8: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '400',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  ButtonSolidRP: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  Linkz1: {
    fontFamily: 'System',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  Viewwm: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'center',
  },
  ViewZq: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 24,
  },
  KeyboardAwareScrollViewlJContent: {
    justifyContent: 'center',
    flex: 1,
  },
  ImageBackground_3R: {
    height: '100%',
  },
});

export default withTheme(LoginScreen);
