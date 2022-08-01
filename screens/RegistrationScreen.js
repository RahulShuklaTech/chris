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

const RegistrationScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [passwordInputValue, setPasswordInputValue] = React.useState('');

  return (
    <ScreenContainer hasTopSafeArea={false}>
      <ImageBackground
        style={styles.ImageBackgroundUx}
        source={{
          uri: 'https://ztxhuiezsnrwnupwzimc.supabase.co/storage/v1/object/sign/app/images/sign-in-background.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcHAvaW1hZ2VzL3NpZ24taW4tYmFja2dyb3VuZC5wbmciLCJpYXQiOjE2NTg1MTYxNDYsImV4cCI6MTk3Mzg3NjE0Nn0.PXhT0tOZzXQywIj6t0vw4UIZDHbNZlGlSxDqcDclyMw&t=2022-07-22T18%3A55%3A46.008Z',
        }}
        resizeMode={'cover'}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.KeyboardAwareScrollViewEuContent}
        >
          <View>
            <Text style={[styles.TextUS, { color: theme.colors.strong }]}>
              {'Welcome!'}
            </Text>

            <Text style={[styles.TexteP, { color: theme.colors.strong }]}>
              {'Create an account to get started'}
            </Text>
          </View>

          <View style={styles.ViewEX}>
            <Text style={[styles.Text_6o, { color: theme.colors.error }]}>
              {null}
            </Text>
            <TextInput
              onChangeText={newNameInputValue => {
                try {
                  setNameInputValue(newNameInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputLT,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={nameInputValue}
              placeholder={'Name'}
              autoCapitalize={'words'}
            />
            <Spacer top={12} right={8} bottom={12} left={8} />
            <TextInput
              onChangeText={newEmailInputValue => {
                try {
                  setEmailInputValue(newEmailInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputtQ,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={emailInputValue}
              placeholder={'Email'}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
            />
            <Spacer top={12} right={8} bottom={8} left={8} />
            <TextInput
              onChangeText={newPasswordInputValue => {
                try {
                  setPasswordInputValue(newPasswordInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.TextInputO7,
                {
                  borderColor: theme.colors.divider,
                  backgroundColor: theme.colors.background,
                },
              ]}
              value={passwordInputValue}
              placeholder={'Password'}
              secureTextEntry={true}
              autoCapitalize={'none'}
              textContentType={'password'}
            />
            <Spacer top={24} right={8} bottom={24} left={8} />
            <ButtonSolid
              onPress={async () => {
                try {
                  const signupResponseJson = await AuthApi.signupPOST(
                    Constants,
                    {
                      signupEmail: emailInputValue,
                      signupPassword: passwordInputValue,
                    }
                  );
                  const message = signupResponseJson.msg;
                  setGlobalVariableValue({
                    key: 'ERROR_MESSAGE',
                    value: message,
                  });
                  if (message) {
                    return;
                  }
                  navigation.navigate('AuthNavigator', {
                    screen: 'LoginScreen',
                  });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={[
                styles.ButtonSolidWw,
                { backgroundColor: theme.colors.primary },
              ]}
              title={'Sign up'}
            />
            <Spacer top={16} right={8} bottom={16} left={8} />
            <View style={styles.ViewtI}>
              <Text
                style={[
                  styles.TexthB,
                  {
                    color: theme.colors.strong,
                    textDecorationColor: theme.colors.strong,
                  },
                ]}
              >
                {'Have an account?'}
              </Text>
              <Spacer top={8} right={2} bottom={8} left={2} />
              <Link
                onPress={() => {
                  try {
                    navigation.navigate('LoginScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.Link_5K,
                  {
                    color: theme.colors.primary,
                    textDecorationColor: theme.colors.secondary,
                  },
                ]}
                title={'Sign in.'}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  TextUS: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: '600',
  },
  TexteP: {
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: '400',
    marginTop: 4,
  },
  Text_6o: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  TextInputLT: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  TextInputtQ: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  TextInputO7: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
  },
  ButtonSolidWw: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  TexthB: {
    marginRight: 2,
  },
  Link_5K: {
    textDecorationLine: 'underline',
    fontFamily: 'System',
    fontWeight: '600',
  },
  ViewtI: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ViewEX: {
    paddingLeft: 36,
    paddingRight: 36,
    marginTop: 24,
  },
  KeyboardAwareScrollViewEuContent: {
    justifyContent: 'center',
    flex: 1,
  },
  ImageBackgroundUx: {
    height: '100%',
  },
});

export default withTheme(RegistrationScreen);
